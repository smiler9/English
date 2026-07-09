/**
 * 회화 엔진 (교체 가능한 추상화)
 * ────────────────────────────────────────────────────────
 * 핵심 설계: 화면(ConversationScreen)은 "ConversationEngine 인터페이스"만 안다.
 * 지금은 ScenarioEngine(정해진 시나리오)로 동작하고,
 * 나중에 로컬 LLM을 붙일 때는 LlmEngine을 만들어 factory에서 교체하면 끝이다.
 * → 화면 코드는 한 줄도 바뀌지 않는다.
 *
 * [로컬 LLM 붙이는 법]
 *  방법 A. 온디바이스 : 폰 안에서 소형 모델 실행(llama.cpp / MLC). 도메인·인터넷 불필요.
 *  방법 B. 자체 호스팅: 내 PC에서 Ollama 실행 → Cloudflare Tunnel + 도메인으로 노출.
 *          앱은 https://api.내도메인.com 으로 요청. (iOS는 HTTPS 필수라 도메인이 필요)
 *  아래 LlmConversationEngine 스텁이 방법 B의 연결 지점을 보여준다.
 */

export interface ConversationContext {
  scenarioId: string;
  situation: string;
  level: number;
}

export interface ChatTurn {
  role: 'bot' | 'user';
  text: string;
}

export interface EngineReply {
  /** 상대(AI)의 영어 발화 */
  text: string;
  /** 한글 번역 (초급 도움용) */
  translation?: string;
  /** 사용자가 눌러서 답할 수 있는 추천 문장 (초급은 프리토킹 대신 이걸로 시작) */
  suggestions?: string[];
  /** 방금 사용자가 한 말에 대한 교정 (약점 복습의 재료) */
  correction?: { original: string; corrected: string; note: string };
  /** 시나리오 종료 여부 */
  done?: boolean;
}

export interface ConversationEngine {
  readonly name: string;
  start(ctx: ConversationContext): Promise<EngineReply>;
  reply(
    ctx: ConversationContext,
    history: ChatTurn[],
    userText: string
  ): Promise<EngineReply>;
}

// ─────────────────────────────────────────────────────────
// 1) 시나리오 엔진 (지금 사용) — 정해진 대본을 순서대로 진행
// ─────────────────────────────────────────────────────────

export interface ScenarioStep {
  bot: string;
  botKo: string;
  /** 사용자에게 제시할 추천 답변 (첫 번째가 모범 답안) */
  suggestions: string[];
}

export interface Scenario {
  id: string;
  steps: ScenarioStep[];
  /** 마지막 마무리 인사 */
  closing: { bot: string; botKo: string };
}

export class ScenarioEngine implements ConversationEngine {
  readonly name = 'scenario';
  constructor(private scenarios: Record<string, Scenario>) {}

  private getScenario(ctx: ConversationContext): Scenario {
    const s = this.scenarios[ctx.scenarioId];
    if (!s) throw new Error(`Unknown scenario: ${ctx.scenarioId}`);
    return s;
  }

  async start(ctx: ConversationContext): Promise<EngineReply> {
    const s = this.getScenario(ctx);
    const first = s.steps[0];
    return {
      text: first.bot,
      translation: first.botKo,
      suggestions: first.suggestions,
    };
  }

  async reply(
    ctx: ConversationContext,
    history: ChatTurn[],
    userText: string
  ): Promise<EngineReply> {
    const s = this.getScenario(ctx);
    // 지금까지 사용자가 몇 번 말했는지로 진행 단계를 센다.
    const userTurns = history.filter((h) => h.role === 'user').length + 1;

    const correction = simpleCorrection(userText);

    // 다음 봇 대사 = 다음 스텝
    const next = s.steps[userTurns];
    if (!next) {
      return {
        text: s.closing.bot,
        translation: s.closing.botKo,
        correction,
        done: true,
      };
    }
    return {
      text: next.bot,
      translation: next.botKo,
      suggestions: next.suggestions,
      correction,
    };
  }
}

/**
 * 아주 가벼운 규칙 기반 교정 (약점 복습 재료 생성용 데모).
 * 나중에 LLM으로 교체되면 훨씬 정교해진다.
 */
export function simpleCorrection(
  userText: string
): EngineReply['correction'] | undefined {
  const t = userText.trim();
  if (!t) return undefined;
  // 흔한 초급 실수: 문장 첫 글자 대문자, "i" → "I"
  const fixedI = t.replace(/\bi\b/g, 'I');
  const capitalized = fixedI.charAt(0).toUpperCase() + fixedI.slice(1);
  if (capitalized !== t) {
    return {
      original: t,
      corrected: capitalized,
      note: "문장 첫 글자와 'I'는 항상 대문자로 써요.",
    };
  }
  return undefined;
}

// ─────────────────────────────────────────────────────────
// 2) 로컬 LLM 엔진 (미래) — 지금은 스텁. 도메인 서버 붙일 자리.
// ─────────────────────────────────────────────────────────

export interface LlmConfig {
  /** 예: "https://api.내도메인.com/v1/chat/completions" (Ollama/vLLM OpenAI 호환 엔드포인트) */
  endpoint: string;
  model: string; // 예: "qwen2.5:3b-instruct"
  apiKey?: string;
}

export class LlmConversationEngine implements ConversationEngine {
  readonly name = 'llm';
  constructor(private config: LlmConfig) {}

  private systemPrompt(ctx: ConversationContext): string {
    return [
      `You are a friendly English tutor for a Korean learner at CEFR level for app-level ${ctx.level}.`,
      `Situation: ${ctx.situation}.`,
      `Keep replies short and simple. If the learner makes a mistake, gently correct it.`,
      `Reply in JSON: {"text":"...","translation":"...","suggestions":["...","..."],"correction":{"original":"","corrected":"","note":""}}`,
    ].join(' ');
  }

  private async call(messages: { role: string; content: string }[]) {
    // 도메인 서버(Ollama 등)로 요청. HTTPS 도메인이면 iOS에서도 그대로 동작.
    const res = await fetch(this.config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey
          ? { Authorization: `Bearer ${this.config.apiKey}` }
          : {}),
      },
      body: JSON.stringify({ model: this.config.model, messages }),
    });
    if (!res.ok) throw new Error(`LLM error ${res.status}`);
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? '{}';
    return JSON.parse(raw) as EngineReply;
  }

  async start(ctx: ConversationContext): Promise<EngineReply> {
    return this.call([
      { role: 'system', content: this.systemPrompt(ctx) },
      { role: 'user', content: 'Start the conversation.' },
    ]);
  }

  async reply(
    ctx: ConversationContext,
    history: ChatTurn[],
    userText: string
  ): Promise<EngineReply> {
    const msgs = [
      { role: 'system', content: this.systemPrompt(ctx) },
      ...history.map((h) => ({
        role: h.role === 'bot' ? 'assistant' : 'user',
        content: h.text,
      })),
      { role: 'user', content: userText },
    ];
    return this.call(msgs);
  }
}

// ─────────────────────────────────────────────────────────
// Factory — 여기 한 곳만 바꾸면 앱 전체 회화 방식이 바뀐다.
// ─────────────────────────────────────────────────────────

import { SCENARIOS } from '../data/scenarios';

let engine: ConversationEngine | null = null;

export function getConversationEngine(): ConversationEngine {
  if (engine) return engine;
  // 지금: 시나리오 엔진.
  engine = new ScenarioEngine(SCENARIOS);
  // 나중에 로컬 LLM(도메인 서버)로 교체하려면 위 한 줄을 아래로 바꾸면 끝:
  // engine = new LlmConversationEngine({
  //   endpoint: 'https://api.내도메인.com/v1/chat/completions',
  //   model: 'qwen2.5:3b-instruct',
  // });
  return engine;
}
