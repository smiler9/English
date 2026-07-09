/**
 * 커리큘럼 데이터 모델 (콘텐츠-코드 분리의 핵심)
 *
 * 원칙: 레슨/단어/문법은 "코드"가 아니라 "데이터"다.
 * 새 레벨/유닛/레슨을 추가하는 것은 이 타입을 만족하는 객체를 추가하는 것뿐이며,
 * 화면 코드는 절대 바뀌지 않는다. (그래서 20단계로 커져도 안 무너진다.)
 */

/** 국제 표준(CEFR)에 매핑해 난이도 기준을 고정한다. */
export type CEFR = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/** 20개 영어 등급 중 하나 */
export interface Level {
  id: number; // 1 ~ 20
  title: string; // 한글 등급명 (예: "완전 왕초보")
  subtitle: string; // 한 줄 목표 (예: "알파벳부터 기본 인사까지")
  cefr: CEFR;
  /** 이 레벨을 마치면 할 수 있는 것들 */
  cando: string[];
  /** 이 레벨까지의 누적 목표 단어 수 */
  targetVocab: number;
  color: string; // 레벨 카드 색
  /**
   * 실제 학습 콘텐츠(유닛). 아직 제작 전인 레벨은 undefined.
   * → 20단계 "구조"는 미리 있고, "콘텐츠"만 Level 1부터 채운다.
   */
  units?: Unit[];
}

/** 레벨 안의 유닛 (6~12개) */
export interface Unit {
  id: string; // "1-1"
  levelId: number;
  order: number;
  title: string; // "인사하기"
  icon: string; // 이모지
  description: string;
  lessons: Lesson[]; // 5~10개
}

/** 레슨 종류 = Codex가 말한 유닛 내부 학습 흐름 */
export type LessonType =
  | 'vocab' // 1. 핵심 단어
  | 'grammar' // 2. 핵심 문법
  | 'build' // 3. 문장 조립
  | 'listening' // 4. 듣기 문제
  | 'speaking' // 5. 따라 말하기
  | 'conversation' // 6. AI와 대화하기
  | 'review' // 7. 틀린 표현 복습
  | 'test'; // 8. 레벨/유닛 테스트

export interface Lesson {
  id: string; // "1-1-1"
  unitId: string;
  order: number;
  type: LessonType;
  title: string;
  xp: number; // 완료 시 획득 경험치
  content: LessonContent;
}

/** 레슨 타입별 콘텐츠 (판별 유니온) */
export type LessonContent =
  | VocabContent
  | GrammarContent
  | BuildContent
  | ListeningContent
  | SpeakingContent
  | ConversationContent
  | ReviewContent
  | TestContent;

export interface VocabContent {
  kind: 'vocab';
  words: VocabWord[];
}
export interface VocabWord {
  en: string;
  ko: string;
  ipa?: string; // 발음기호 (선택)
  example: string; // 예문 (영어)
  exampleKo: string; // 예문 (한글)
}

export interface GrammarContent {
  kind: 'grammar';
  point: string; // 핵심 규칙 한 줄
  explanation: string; // 한글 설명
  examples: { en: string; ko: string }[];
  tips?: string[];
}

/** 문장 조립: 흩어진 단어를 순서대로 배열 */
export interface BuildContent {
  kind: 'build';
  items: BuildItem[];
}
export interface BuildItem {
  ko: string; // 만들 문장의 뜻
  answer: string[]; // 정답 순서 (단어 배열)
  bank: string[]; // 제시되는 단어 은행 (섞인 상태)
}

/** 듣기: 문장을 듣고(TTS) 정답 고르기 */
export interface ListeningContent {
  kind: 'listening';
  items: ListeningItem[];
}
export interface ListeningItem {
  audioText: string; // TTS로 읽어줄 영어 문장
  question: string; // 한글 질문
  options: string[];
  answerIndex: number;
}

/** 따라 말하기: 문장을 보고 따라 발음 */
export interface SpeakingContent {
  kind: 'speaking';
  prompts: { en: string; ko: string; ipa?: string }[];
}

/**
 * AI 대화: 시나리오 ID만 참조한다.
 * 실제 대화 진행은 conversationEngine이 담당 → 나중에 로컬 LLM으로 교체 가능.
 */
export interface ConversationContent {
  kind: 'conversation';
  scenarioId: string;
  title: string;
  situation: string; // 상황 설명 (한글)
  goalTurns: number; // 목표 대화 턴 수
}

/** 복습: 앞서 배운 항목들을 퀴즈로 */
export interface ReviewContent {
  kind: 'review';
  questions: QuizQuestion[];
}

/** 유닛/레벨 테스트 */
export interface TestContent {
  kind: 'test';
  passScore: number; // 통과 기준 (%)
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  prompt: string; // 문제 (한글 또는 영어)
  options: string[];
  answerIndex: number;
  explanation?: string;
}
