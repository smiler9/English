# English Training 📚

20단계 영어 학습 앱 (React Native / Expo). 왕초보(A1) → 원어민(C2)까지 CEFR 기준 20등급.

## 실행

```bash
cd english-training
npm start          # QR 코드가 뜨면 폰의 Expo Go 앱으로 스캔
# 또는
npm run ios        # iOS 시뮬레이터 (Mac + Xcode 필요)
npm run android    # Android 에뮬레이터
```

## Oracle VM에 웹앱 배포

웹앱은 정적 파일로 export해서 Oracle VM의 Caddy로 서비스합니다.

로컬에서 빌드:

```bash
npm run export:web
```

Oracle VM 최초 설정:

```bash
SSH_TARGET=ubuntu@오라클_PUBLIC_IP npm run setup:oracle
```

로컬에서 Oracle VM으로 업로드:

```bash
SSH_TARGET=ubuntu@오라클_PUBLIC_IP npm run deploy:oracle
```

서버 로그인/API 배포:

```bash
SSH_TARGET=ubuntu@오라클_PUBLIC_IP npm run deploy:oracle-api
```

Oracle Linux 이미지면 사용자가 보통 `opc`입니다. SSH 키 파일을 직접 지정해야 하면:

```bash
SSH_TARGET=opc@오라클_PUBLIC_IP SSH_KEY=~/.ssh/oracle.key npm run setup:oracle
SSH_TARGET=opc@오라클_PUBLIC_IP SSH_KEY=~/.ssh/oracle.key npm run deploy:oracle
```

Oracle 보안 목록/방화벽에서 TCP 80/443 포트를 열어야 브라우저에서 HTTP/HTTPS로 접속할 수 있습니다.

## 구조 (핵심 설계)

```
src/
├─ types/curriculum.ts      # 데이터 모델 — 레슨은 "코드"가 아니라 "데이터"
├─ api/server.ts            # 서버 로그인·진도 동기화 API 클라이언트
├─ auth/AuthContext.tsx     # 서버 계정 로그인·세션 관리
├─ data/
│  ├─ levels.ts             # 20단계 정의 (구조는 전부, CEFR 매핑)
│  ├─ level01/index.ts      # Level 1 실제 콘텐츠 (8유닛)
│  ├─ level02/index.ts      # Level 2 실제 콘텐츠 (9유닛)
│  ├─ level03/index.ts      # Level 3 실제 콘텐츠 (10유닛)
│  ├─ level04/index.ts      # Level 4 실제 콘텐츠 (11유닛)
│  ├─ level05/index.ts      # Level 5 실제 콘텐츠 (12유닛)
│  ├─ level06/index.ts      # Level 6 실제 콘텐츠 (13유닛)
│  ├─ level07/index.ts      # Level 7 실제 콘텐츠 (14유닛)
│  └─ scenarios.ts          # AI 회화 시나리오 대본
├─ engine/
│  ├─ conversationEngine.ts # 회화 엔진 (교체 가능) — 시나리오 ↔ 로컬 LLM
│  └─ dailyTrainingEngine.ts # 날짜·약점 기반 오늘의 훈련 생성
├─ progress/ProgressContext.tsx  # 사용자별 진도·XP·약점 저장 (AsyncStorage)
└─ screens/                 # Home → Level → Lesson / Conversation
server/
└─ english_training_api.py  # SQLite 기반 로그인·진도 API
```

### 왜 이렇게?
- **콘텐츠-코드 분리**: 새 레벨/유닛/레슨은 `data/`에 객체만 추가. 화면 코드는 안 바뀜 → 20단계로 커져도 안 무너짐.
- **20단계 구조는 미리, 콘텐츠는 순차**: `levels.ts`엔 20개 다 있고 `units`는 Level 1~7부터 채워짐.
- **레벨별 유닛 수 증가**: Level 1을 8유닛 기준으로 두고, 뒤 레벨은 레벨당 1개씩 늘리는 방향으로 확장.
- **매일 훈련은 자동 생성**: 정규 유닛은 고정하고, `dailyTrainingEngine`이 날짜·진도·약점 기반으로 단어/듣기/말하기/복습 세트를 매일 재조합.
- **진도 스키마 선확보**: 약점 기반 복습·승급 테스트의 기반.
- **서버 계정 동기화**: 이름+비밀번호 계정으로 로그인하고, 진도·XP·약점 복습 기록을 Oracle VM의 SQLite DB에 저장. 로컬 기록은 첫 서버 로그인 때 서버 기록과 병합.

## 로컬 LLM(AI 회화) 붙이는 법

지금은 정해진 시나리오로 대화. 나중에 로컬 LLM 교체는 `src/engine/conversationEngine.ts`
의 `getConversationEngine()` **한 줄만** 바꾸면 됩니다.

**방법 A — 온디바이스** (도메인 불필요): 폰에서 소형 모델 실행(llama.cpp/MLC). 오프라인 O, 품질 △
**방법 B — 자체 호스팅** (도메인 필요, 추천):
1. 내 PC에서 `ollama run qwen2.5:3b-instruct`
2. `cloudflared tunnel`로 `https://api.내도메인.com` 노출 (iOS는 HTTPS 필수 → 도메인 필요)
3. `getConversationEngine()`에서 `LlmConversationEngine`로 교체:
   ```ts
   engine = new LlmConversationEngine({
     endpoint: 'https://api.내도메인.com/v1/chat/completions',
     model: 'qwen2.5:3b-instruct',
   });
   ```

## 다음 할 일
- Level 7 콘텐츠 추가 (`data/level07`, 14유닛)
- 실제 음성 인식(STT)으로 말하기 채점 (`expo-speech`는 읽기만; STT는 별도)
- 약점(`weakItems`) 기반 자동 복습 화면
