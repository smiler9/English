import {
  BuildItem,
  GrammarContent,
  Lesson,
  ListeningItem,
  QuizQuestion,
  Unit,
  VocabWord,
} from '../types/curriculum';
import { Scenario } from '../engine/conversationEngine';

interface TopicWord {
  en: string;
  ko: string;
}

interface Topic {
  icon: string;
  titleKo: string;
  titleEn: string;
  context: string;
  contextKo: string;
  mainNoun: string;
  mainKo: string;
  actionBase: string;
  actionPast: string;
  actionParticiple: string;
  resultKo: string;
  words: TopicWord[];
}

interface LevelPattern {
  levelId: number;
  unitSuffixKo: string;
  vocabTitle: string;
  grammarTitle: string;
  buildTitle: string;
  listeningTitle: string;
  speakingTitle: string;
  conversationTitle: string;
  grammarPoint: string;
  explanation: string;
  tips: string[];
  words: TopicWord[];
  positive: (topic: Topic) => string;
  question: (topic: Topic) => string;
  negative: (topic: Topic) => string;
  extra: (topic: Topic) => string;
  positiveKo: (topic: Topic) => string;
  questionKo: (topic: Topic) => string;
  negativeKo: (topic: Topic) => string;
  extraKo: (topic: Topic) => string;
}

const lessonId = (unitId: string, order: number) => `${unitId}-${order}`;

const TOPICS: Topic[] = [
  topic('🛫', '공항 체크인', 'airport check-in', 'airport check-in', '공항 체크인', 'flight', '항공편', 'book', 'booked', 'booked', '항공편을 준비했어요', [
    ['boarding pass', '탑승권'],
    ['gate', '탑승구'],
    ['luggage', '수하물'],
    ['passport', '여권'],
  ]),
  topic('🏨', '호텔 예약', 'hotel reservation', 'hotel reservation', '호텔 예약', 'room', '객실', 'reserve', 'reserved', 'reserved', '객실을 예약했어요', [
    ['front desk', '프런트'],
    ['reservation', '예약'],
    ['check-in', '체크인'],
    ['key card', '키 카드'],
  ]),
  topic('🍽️', '식당 이용', 'restaurant visit', 'restaurant visit', '식당 이용', 'table', '테이블', 'reserve', 'reserved', 'reserved', '테이블을 예약했어요', [
    ['menu', '메뉴'],
    ['server', '직원'],
    ['bill', '계산서'],
    ['special', '추천 메뉴'],
  ]),
  topic('🛍️', '쇼핑 비교', 'shopping choice', 'shopping choice', '쇼핑 선택', 'jacket', '재킷', 'choose', 'chose', 'chosen', '재킷을 골랐어요', [
    ['price', '가격'],
    ['size', '사이즈'],
    ['receipt', '영수증'],
    ['discount', '할인'],
  ]),
  topic('🗺️', '길 찾기', 'finding directions', 'finding directions', '길 찾기', 'route', '경로', 'follow', 'followed', 'followed', '경로를 따라갔어요', [
    ['corner', '모퉁이'],
    ['station', '역'],
    ['map', '지도'],
    ['crosswalk', '횡단보도'],
  ]),
  topic('🌉', '주말 여행', 'weekend trip', 'weekend trip', '주말 여행', 'trip', '여행', 'plan', 'planned', 'planned', '여행을 계획했어요', [
    ['itinerary', '일정표'],
    ['souvenir', '기념품'],
    ['view', '전망'],
    ['guide', '가이드'],
  ]),
  topic('💼', '업무 회의', 'work meeting', 'work meeting', '업무 회의', 'meeting', '회의', 'schedule', 'scheduled', 'scheduled', '회의를 잡았어요', [
    ['agenda', '안건'],
    ['deadline', '마감일'],
    ['update', '업데이트'],
    ['decision', '결정'],
  ]),
  topic('📧', '이메일 작성', 'email writing', 'email writing', '이메일 작성', 'email', '이메일', 'send', 'sent', 'sent', '이메일을 보냈어요', [
    ['subject line', '제목 줄'],
    ['attachment', '첨부 파일'],
    ['reply', '답장'],
    ['signature', '서명'],
  ]),
  topic('📊', '발표 준비', 'presentation prep', 'presentation preparation', '발표 준비', 'presentation', '발표', 'prepare', 'prepared', 'prepared', '발표를 준비했어요', [
    ['slide', '슬라이드'],
    ['audience', '청중'],
    ['chart', '차트'],
    ['summary', '요약'],
  ]),
  topic('🧑‍💼', '면접 준비', 'job interview', 'job interview', '면접', 'interview', '면접', 'practice', 'practiced', 'practiced', '면접을 연습했어요', [
    ['resume', '이력서'],
    ['strength', '강점'],
    ['experience', '경험'],
    ['question', '질문'],
  ]),
  topic('🤝', '협상 상황', 'negotiation', 'negotiation', '협상', 'proposal', '제안서', 'revise', 'revised', 'revised', '제안서를 수정했어요', [
    ['offer', '제안'],
    ['budget', '예산'],
    ['condition', '조건'],
    ['agreement', '합의'],
  ]),
  topic('🏠', '원격 근무', 'remote work', 'remote work', '원격 근무', 'task', '업무', 'finish', 'finished', 'finished', '업무를 끝냈어요', [
    ['workspace', '작업 공간'],
    ['video call', '화상 통화'],
    ['schedule', '일정'],
    ['focus', '집중'],
  ]),
  topic('🏥', '건강 관리', 'health care', 'health care', '건강 관리', 'appointment', '진료 예약', 'make', 'made', 'made', '진료 예약을 잡았어요', [
    ['symptom', '증상'],
    ['clinic', '병원'],
    ['medicine', '약'],
    ['recovery', '회복'],
  ]),
  topic('💻', '기술 문제', 'technology issue', 'technology issue', '기술 문제', 'app', '앱', 'update', 'updated', 'updated', '앱을 업데이트했어요', [
    ['device', '기기'],
    ['connection', '연결'],
    ['error message', '오류 메시지'],
    ['backup', '백업'],
  ]),
  topic('💳', '금융 생활', 'personal finance', 'personal finance', '금융 생활', 'budget', '예산', 'review', 'reviewed', 'reviewed', '예산을 검토했어요', [
    ['account', '계좌'],
    ['payment', '결제'],
    ['savings', '저축'],
    ['fee', '수수료'],
  ]),
  topic('🌱', '환경 이슈', 'environment issue', 'environmental issue', '환경 이슈', 'policy', '정책', 'support', 'supported', 'supported', '정책을 지지했어요', [
    ['recycling', '재활용'],
    ['pollution', '오염'],
    ['energy', '에너지'],
    ['climate', '기후'],
  ]),
  topic('🎓', '교육 계획', 'education plan', 'education plan', '교육 계획', 'course', '강좌', 'complete', 'completed', 'completed', '강좌를 완료했어요', [
    ['assignment', '과제'],
    ['feedback', '피드백'],
    ['lecture', '강의'],
    ['progress', '진도'],
  ]),
  topic('🎨', '취미 활동', 'hobby project', 'hobby project', '취미 활동', 'project', '프로젝트', 'start', 'started', 'started', '프로젝트를 시작했어요', [
    ['practice', '연습'],
    ['skill', '기술'],
    ['community', '커뮤니티'],
    ['routine', '루틴'],
  ]),
  topic('📰', '뉴스 이해', 'news discussion', 'news discussion', '뉴스 토론', 'article', '기사', 'read', 'read', 'read', '기사를 읽었어요', [
    ['headline', '제목'],
    ['source', '출처'],
    ['fact', '사실'],
    ['opinion', '의견'],
  ]),
  topic('🌏', '문화 차이', 'cultural difference', 'cultural difference', '문화 차이', 'custom', '관습', 'notice', 'noticed', 'noticed', '관습을 알아차렸어요', [
    ['tradition', '전통'],
    ['festival', '축제'],
    ['gesture', '몸짓'],
    ['value', '가치관'],
  ]),
  topic('🧾', '고객 서비스', 'customer service', 'customer service', '고객 서비스', 'request', '요청', 'handle', 'handled', 'handled', '요청을 처리했어요', [
    ['complaint', '불만'],
    ['refund', '환불'],
    ['support team', '지원팀'],
    ['case number', '접수 번호'],
  ]),
  topic('📌', '프로젝트 계획', 'project planning', 'project planning', '프로젝트 계획', 'milestone', '마일스톤', 'set', 'set', 'set', '마일스톤을 정했어요', [
    ['scope', '범위'],
    ['timeline', '일정표'],
    ['owner', '담당자'],
    ['risk', '위험'],
  ]),
  topic('🗣️', '팀 갈등', 'team conflict', 'team conflict', '팀 갈등', 'conflict', '갈등', 'resolve', 'resolved', 'resolved', '갈등을 해결했어요', [
    ['concern', '우려'],
    ['compromise', '타협'],
    ['respect', '존중'],
    ['solution', '해결책'],
  ]),
  topic('⭐', '제품 리뷰', 'product review', 'product review', '제품 리뷰', 'product', '제품', 'compare', 'compared', 'compared', '제품을 비교했어요', [
    ['feature', '기능'],
    ['quality', '품질'],
    ['rating', '평점'],
    ['recommendation', '추천'],
  ]),
  topic('🏙️', '지역 문제', 'community issue', 'community issue', '지역 문제', 'neighborhood', '동네', 'improve', 'improved', 'improved', '동네를 개선했어요', [
    ['traffic', '교통'],
    ['safety', '안전'],
    ['facility', '시설'],
    ['resident', '주민'],
  ]),
  topic('🚀', '커리어 목표', 'career goal', 'career goal', '커리어 목표', 'career goal', '커리어 목표', 'define', 'defined', 'defined', '커리어 목표를 정했어요', [
    ['portfolio', '포트폴리오'],
    ['mentor', '멘토'],
    ['network', '인맥'],
    ['opportunity', '기회'],
  ]),
  topic('📚', '학습 전략', 'study strategy', 'study strategy', '학습 전략', 'study plan', '학습 계획', 'adjust', 'adjusted', 'adjusted', '학습 계획을 조정했어요', [
    ['review', '복습'],
    ['weak point', '약점'],
    ['goal', '목표'],
    ['habit', '습관'],
  ]),
  topic('⚖️', '토론 주제', 'debate topic', 'debate topic', '토론 주제', 'argument', '논거', 'build', 'built', 'built', '논거를 만들었어요', [
    ['evidence', '근거'],
    ['counterpoint', '반론'],
    ['claim', '주장'],
    ['conclusion', '결론'],
  ]),
  topic('🧠', '고급 사고', 'advanced thinking', 'advanced thinking', '고급 사고', 'perspective', '관점', 'develop', 'developed', 'developed', '관점을 발전시켰어요', [
    ['nuance', '뉘앙스'],
    ['assumption', '가정'],
    ['implication', '함의'],
    ['tradeoff', '절충점'],
  ]),
];

const LEVEL_PATTERNS: Record<number, LevelPattern> = {
  8: {
    levelId: 8,
    unitSuffixKo: '과거 경험',
    vocabTitle: '과거 경험 단어',
    grammarTitle: '과거형',
    buildTitle: '과거형 문장 조립',
    listeningTitle: '듣고 과거 경험 고르기',
    speakingTitle: '과거 경험 말하기',
    conversationTitle: 'AI와 과거 경험',
    grammarPoint: 'Past simple: I booked the flight yesterday.',
    explanation: '이미 끝난 일을 말할 때 동사의 과거형을 씁니다. 질문과 부정문에서는 did를 사용하고 동사는 원형으로 돌아갑니다.',
    tips: ['yesterday, last week, two days ago 같은 시간 표현과 자주 함께 씁니다.'],
    words: words([['yesterday', '어제'], ['last week', '지난주'], ['ago', '~전에'], ['did', '했다/했나요']]),
    positive: (t) => `I ${t.actionPast} the ${t.mainNoun} yesterday.`,
    question: (t) => `Did you ${t.actionBase} the ${t.mainNoun} yesterday?`,
    negative: (t) => `I did not ${t.actionBase} the ${t.mainNoun} yesterday.`,
    extra: (t) => `Last week, I ${t.actionPast} the ${t.mainNoun} carefully.`,
    positiveKo: (t) => `나는 어제 ${t.mainKo}을/를 ${t.resultKo}.`,
    questionKo: (t) => `어제 ${t.mainKo}을/를 처리했나요?`,
    negativeKo: (t) => `나는 어제 ${t.mainKo}을/를 처리하지 않았어요.`,
    extraKo: (t) => `지난주에 나는 ${t.mainKo}을/를 신중하게 처리했어요.`,
  },
  9: {
    levelId: 9,
    unitSuffixKo: '미래 계획',
    vocabTitle: '미래 계획 단어',
    grammarTitle: 'will과 be going to',
    buildTitle: '미래 계획 조립',
    listeningTitle: '듣고 계획 고르기',
    speakingTitle: '미래 계획 말하기',
    conversationTitle: 'AI와 계획 대화',
    grammarPoint: 'Future plans: I will reserve the room tomorrow.',
    explanation: '즉석 결정이나 미래 예측은 will, 이미 마음먹은 계획은 be going to로 말합니다.',
    tips: ['tomorrow, next week, soon 같은 미래 시간 표현과 함께 연습합니다.'],
    words: words([['tomorrow', '내일'], ['next week', '다음 주'], ['soon', '곧'], ['plan', '계획']]),
    positive: (t) => `I will ${t.actionBase} the ${t.mainNoun} tomorrow.`,
    question: (t) => `Are you going to ${t.actionBase} the ${t.mainNoun} tomorrow?`,
    negative: (t) => `I will not ${t.actionBase} the ${t.mainNoun} tomorrow.`,
    extra: (t) => `We are going to ${t.actionBase} the ${t.mainNoun} next week.`,
    positiveKo: (t) => `나는 내일 ${t.mainKo}을/를 처리할 거예요.`,
    questionKo: (t) => `내일 ${t.mainKo}을/를 처리할 계획인가요?`,
    negativeKo: (t) => `나는 내일 ${t.mainKo}을/를 처리하지 않을 거예요.`,
    extraKo: (t) => `우리는 다음 주에 ${t.mainKo}을/를 처리할 예정이에요.`,
  },
  10: {
    levelId: 10,
    unitSuffixKo: '비교하기',
    vocabTitle: '비교 표현',
    grammarTitle: '비교급과 최상급',
    buildTitle: '비교 문장 조립',
    listeningTitle: '듣고 비교 이해하기',
    speakingTitle: '비교해서 말하기',
    conversationTitle: 'AI와 비교 대화',
    grammarPoint: 'Comparatives: This route is better than the old option.',
    explanation: '두 대상을 비교할 때는 better than, cheaper than처럼 비교급을 씁니다. 여러 대상 중 최고는 the best처럼 말합니다.',
    tips: ['than 뒤에는 비교 대상이 옵니다. best 앞에는 보통 the를 붙입니다.'],
    words: words([['better', '더 나은'], ['worse', '더 나쁜'], ['cheaper', '더 저렴한'], ['the best', '가장 좋은']]),
    positive: (t) => `This ${t.mainNoun} is better than the old option.`,
    question: (t) => `Which ${t.mainNoun} is the best choice?`,
    negative: (t) => `The old option is not better than this ${t.mainNoun}.`,
    extra: (t) => `This ${t.mainNoun} is more useful for ${t.context}.`,
    positiveKo: (t) => `이 ${t.mainKo}은/는 예전 선택지보다 더 좋아요.`,
    questionKo: (t) => `어떤 ${t.mainKo}이/가 가장 좋은 선택인가요?`,
    negativeKo: (t) => `예전 선택지는 이 ${t.mainKo}보다 더 좋지 않아요.`,
    extraKo: (t) => `이 ${t.mainKo}은/는 ${t.contextKo}에 더 유용해요.`,
  },
  11: {
    levelId: 11,
    unitSuffixKo: '경험과 완료',
    vocabTitle: '경험 표현',
    grammarTitle: '현재완료',
    buildTitle: '현재완료 문장 조립',
    listeningTitle: '듣고 경험 고르기',
    speakingTitle: '경험 말하기',
    conversationTitle: 'AI와 경험 대화',
    grammarPoint: 'Present perfect: I have booked the flight already.',
    explanation: '과거 경험이나 지금까지의 완료를 말할 때 have p.p.를 씁니다. already, yet, ever와 자주 함께 씁니다.',
    tips: ['finished time이 중요하면 과거형, 지금과 연결되면 현재완료를 씁니다.'],
    words: words([['already', '이미'], ['yet', '아직'], ['ever', '한 번이라도'], ['recently', '최근에']]),
    positive: (t) => `I have ${t.actionParticiple} the ${t.mainNoun} already.`,
    question: (t) => `Have you ever ${t.actionParticiple} the ${t.mainNoun}?`,
    negative: (t) => `I have not ${t.actionParticiple} the ${t.mainNoun} yet.`,
    extra: (t) => `We have recently ${t.actionParticiple} the ${t.mainNoun}.`,
    positiveKo: (t) => `나는 이미 ${t.mainKo}을/를 처리했어요.`,
    questionKo: (t) => `${t.mainKo}을/를 처리해본 적이 있나요?`,
    negativeKo: (t) => `나는 아직 ${t.mainKo}을/를 처리하지 않았어요.`,
    extraKo: (t) => `우리는 최근에 ${t.mainKo}을/를 처리했어요.`,
  },
  12: {
    levelId: 12,
    unitSuffixKo: '설명 덧붙이기',
    vocabTitle: '설명 연결 단어',
    grammarTitle: '관계대명사',
    buildTitle: '관계절 문장 조립',
    listeningTitle: '듣고 설명 고르기',
    speakingTitle: '설명 덧붙이기',
    conversationTitle: 'AI와 설명 대화',
    grammarPoint: 'Relative clauses: This is the route that I followed yesterday.',
    explanation: '명사를 더 자세히 설명할 때 that, who, which를 사용합니다. 초반에는 that으로 사람과 사물을 모두 연결해도 됩니다.',
    tips: ['관계절은 앞의 명사를 뒤에서 설명하는 덩어리입니다.'],
    words: words([['that', '관계대명사 that'], ['which', '사물 설명'], ['who', '사람 설명'], ['detail', '세부 사항']]),
    positive: (t) => `This is the ${t.mainNoun} that I ${t.actionPast} yesterday.`,
    question: (t) => `Is this the ${t.mainNoun} that you need?`,
    negative: (t) => `This is not the ${t.mainNoun} that I wanted.`,
    extra: (t) => `I met a person who knows a lot about ${t.context}.`,
    positiveKo: (t) => `이것은 내가 어제 처리한 ${t.mainKo}이에요.`,
    questionKo: (t) => `이것이 당신에게 필요한 ${t.mainKo}인가요?`,
    negativeKo: (t) => `이것은 내가 원했던 ${t.mainKo}이 아니에요.`,
    extraKo: (t) => `나는 ${t.contextKo}에 대해 잘 아는 사람을 만났어요.`,
  },
  13: {
    levelId: 13,
    unitSuffixKo: '의견과 이유',
    vocabTitle: '의견 표현',
    grammarTitle: '의견과 because',
    buildTitle: '의견 문장 조립',
    listeningTitle: '듣고 이유 고르기',
    speakingTitle: '의견 말하기',
    conversationTitle: 'AI와 의견 대화',
    grammarPoint: 'Opinions: I think the budget is important because it saves time.',
    explanation: '의견은 I think, In my opinion으로 시작하고 because로 이유를 연결합니다.',
    tips: ['의견 하나와 이유 하나를 짝으로 말하면 대화가 길어집니다.'],
    words: words([['opinion', '의견'], ['reason', '이유'], ['because', '왜냐하면'], ['important', '중요한']]),
    positive: (t) => `I think the ${t.mainNoun} is important because it saves time.`,
    question: (t) => `Why do you think the ${t.mainNoun} is important?`,
    negative: (t) => `I do not think the ${t.mainNoun} is the main problem.`,
    extra: (t) => `In my opinion, ${t.context} needs a clear plan.`,
    positiveKo: (t) => `나는 ${t.mainKo}이/가 시간을 아껴주기 때문에 중요하다고 생각해요.`,
    questionKo: (t) => `왜 ${t.mainKo}이/가 중요하다고 생각하나요?`,
    negativeKo: (t) => `나는 ${t.mainKo}이/가 핵심 문제라고 생각하지 않아요.`,
    extraKo: (t) => `내 의견으로는 ${t.contextKo}에는 명확한 계획이 필요해요.`,
  },
  14: {
    levelId: 14,
    unitSuffixKo: '가정 상황',
    vocabTitle: '가정 표현',
    grammarTitle: '조건문 기초',
    buildTitle: '조건문 조립',
    listeningTitle: '듣고 조건 고르기',
    speakingTitle: '가정 말하기',
    conversationTitle: 'AI와 가정 대화',
    grammarPoint: 'Conditionals: If I have time, I will review the budget.',
    explanation: '실제로 가능한 조건은 If + 현재, will + 동사원형으로 말합니다. 상상에 가까운 조건은 would를 사용합니다.',
    tips: ['if절과 결과절을 분리해서 생각하면 문장이 쉬워집니다.'],
    words: words([['if', '만약'], ['unless', '~하지 않는다면'], ['would', '~할 텐데'], ['possible', '가능한']]),
    positive: (t) => `If I have time, I will ${t.actionBase} the ${t.mainNoun}.`,
    question: (t) => `What will you do if the ${t.mainNoun} changes?`,
    negative: (t) => `If the ${t.mainNoun} is not ready, I will wait.`,
    extra: (t) => `If I were you, I would check the ${t.mainNoun} again.`,
    positiveKo: (t) => `시간이 있으면 나는 ${t.mainKo}을/를 처리할 거예요.`,
    questionKo: (t) => `${t.mainKo}이/가 바뀌면 무엇을 할 건가요?`,
    negativeKo: (t) => `${t.mainKo}이/가 준비되지 않으면 나는 기다릴 거예요.`,
    extraKo: (t) => `내가 당신이라면 ${t.mainKo}을/를 다시 확인할 거예요.`,
  },
  15: {
    levelId: 15,
    unitSuffixKo: '수동태와 분사',
    vocabTitle: '수동 표현',
    grammarTitle: '수동태',
    buildTitle: '수동태 문장 조립',
    listeningTitle: '듣고 수동 의미 고르기',
    speakingTitle: '수동태 말하기',
    conversationTitle: 'AI와 수동태 대화',
    grammarPoint: 'Passive voice: The email was sent yesterday.',
    explanation: '행동을 한 사람보다 대상이나 결과가 중요할 때 be p.p. 형태의 수동태를 씁니다.',
    tips: ['by someone은 행위자를 꼭 말해야 할 때만 붙입니다.'],
    words: words([['sent', '보내진'], ['prepared', '준비된'], ['reviewed', '검토된'], ['completed', '완료된']]),
    positive: (t) => `The ${t.mainNoun} was ${t.actionParticiple} yesterday.`,
    question: (t) => `Was the ${t.mainNoun} ${t.actionParticiple} yesterday?`,
    negative: (t) => `The ${t.mainNoun} was not ${t.actionParticiple} on time.`,
    extra: (t) => `The ${t.mainNoun} has been ${t.actionParticiple} by the team.`,
    positiveKo: (t) => `${t.mainKo}은/는 어제 처리되었어요.`,
    questionKo: (t) => `${t.mainKo}은/는 어제 처리되었나요?`,
    negativeKo: (t) => `${t.mainKo}은/는 제시간에 처리되지 않았어요.`,
    extraKo: (t) => `${t.mainKo}은/는 팀에 의해 처리되었어요.`,
  },
  16: {
    levelId: 16,
    unitSuffixKo: '구동사와 관용표현',
    vocabTitle: '구동사 표현',
    grammarTitle: '구동사 활용',
    buildTitle: '구동사 문장 조립',
    listeningTitle: '듣고 구동사 이해하기',
    speakingTitle: '구동사 말하기',
    conversationTitle: 'AI와 구동사 대화',
    grammarPoint: 'Phrasal verbs: I need to follow up on the request.',
    explanation: '구동사는 동사와 전치사/부사가 만나 새 의미를 만드는 표현입니다. 통째로 익히는 것이 가장 빠릅니다.',
    tips: ['follow up on, figure out, bring up처럼 덩어리로 반복하세요.'],
    words: words([['follow up on', '후속 조치하다'], ['figure out', '알아내다'], ['bring up', '꺼내다'], ['look into', '살펴보다']]),
    positive: (t) => `I need to follow up on the ${t.mainNoun}.`,
    question: (t) => `Can you look into the ${t.mainNoun}?`,
    negative: (t) => `I have not figured out the ${t.mainNoun} yet.`,
    extra: (t) => `Let us bring up the ${t.mainNoun} in the meeting.`,
    positiveKo: (t) => `나는 ${t.mainKo}에 대해 후속 조치를 해야 해요.`,
    questionKo: (t) => `${t.mainKo}을/를 살펴봐 줄 수 있나요?`,
    negativeKo: (t) => `나는 아직 ${t.mainKo}을/를 알아내지 못했어요.`,
    extraKo: (t) => `회의에서 ${t.mainKo}을/를 꺼내봅시다.`,
  },
  17: {
    levelId: 17,
    unitSuffixKo: '토론 전개',
    vocabTitle: '토론 연결어',
    grammarTitle: '논리 전개',
    buildTitle: '논리 문장 조립',
    listeningTitle: '듣고 논리 흐름 고르기',
    speakingTitle: '논리적으로 말하기',
    conversationTitle: 'AI와 토론 전개',
    grammarPoint: 'Discussion flow: First, we should compare the options.',
    explanation: '토론에서는 순서, 근거, 반론, 결론을 연결해야 합니다. first, however, therefore를 활용합니다.',
    tips: ['주장 하나, 근거 하나, 반론 하나, 결론 하나를 기본 구조로 잡으세요.'],
    words: words([['first', '먼저'], ['however', '하지만'], ['therefore', '그러므로'], ['evidence', '근거']]),
    positive: (t) => `First, we should compare the options for the ${t.mainNoun}.`,
    question: (t) => `What evidence supports the ${t.mainNoun}?`,
    negative: (t) => `However, the ${t.mainNoun} may create a new risk.`,
    extra: (t) => `Therefore, we need a clear conclusion about the ${t.mainNoun}.`,
    positiveKo: (t) => `먼저 ${t.mainKo}에 대한 선택지를 비교해야 해요.`,
    questionKo: (t) => `어떤 근거가 ${t.mainKo}을/를 뒷받침하나요?`,
    negativeKo: (t) => `하지만 ${t.mainKo}은/는 새로운 위험을 만들 수 있어요.`,
    extraKo: (t) => `그러므로 ${t.mainKo}에 대한 명확한 결론이 필요해요.`,
  },
  18: {
    levelId: 18,
    unitSuffixKo: '비즈니스 커뮤니케이션',
    vocabTitle: '비즈니스 표현',
    grammarTitle: '격식 있는 업무 표현',
    buildTitle: '업무 문장 조립',
    listeningTitle: '듣고 업무 의도 고르기',
    speakingTitle: '비즈니스 말하기',
    conversationTitle: 'AI와 비즈니스 대화',
    grammarPoint: 'Business English: I will send an update about the project.',
    explanation: '업무 상황에서는 목적, 요청, 일정, 후속 조치를 분명하고 공손하게 말해야 합니다.',
    tips: ['I would like to, could you, please confirm 같은 완곡한 표현을 사용합니다.'],
    words: words([['update', '업데이트'], ['follow-up', '후속 조치'], ['confirm', '확인하다'], ['proposal', '제안서']]),
    positive: (t) => `I will send an update about the ${t.mainNoun}.`,
    question: (t) => `Could you confirm the ${t.mainNoun} by Friday?`,
    negative: (t) => `We cannot approve the ${t.mainNoun} without more details.`,
    extra: (t) => `I would like to discuss the ${t.mainNoun} in our next meeting.`,
    positiveKo: (t) => `나는 ${t.mainKo}에 대한 업데이트를 보낼 거예요.`,
    questionKo: (t) => `금요일까지 ${t.mainKo}을/를 확인해주실 수 있나요?`,
    negativeKo: (t) => `더 많은 세부 사항 없이는 ${t.mainKo}을/를 승인할 수 없어요.`,
    extraKo: (t) => `다음 회의에서 ${t.mainKo}에 대해 논의하고 싶어요.`,
  },
  19: {
    levelId: 19,
    unitSuffixKo: '면접과 협상',
    vocabTitle: '면접·협상 표현',
    grammarTitle: '설득과 협상',
    buildTitle: '설득 문장 조립',
    listeningTitle: '듣고 협상 의도 고르기',
    speakingTitle: '면접·협상 말하기',
    conversationTitle: 'AI와 면접·협상',
    grammarPoint: 'Persuasion: I can explain my experience with the project.',
    explanation: '면접과 협상에서는 경험, 가치, 조건, 대안을 구체적으로 설명해야 합니다.',
    tips: ['성과는 구체적으로, 조건은 부드럽게, 대안은 명확하게 말합니다.'],
    words: words([['experience', '경험'], ['value', '가치'], ['condition', '조건'], ['alternative', '대안']]),
    positive: (t) => `I can explain my experience with the ${t.mainNoun}.`,
    question: (t) => `What value can you bring to the ${t.mainNoun}?`,
    negative: (t) => `I cannot accept the ${t.mainNoun} without a better condition.`,
    extra: (t) => `A practical alternative would be to revise the ${t.mainNoun}.`,
    positiveKo: (t) => `나는 ${t.mainKo}과 관련된 내 경험을 설명할 수 있어요.`,
    questionKo: (t) => `${t.mainKo}에 어떤 가치를 가져올 수 있나요?`,
    negativeKo: (t) => `더 나은 조건 없이는 ${t.mainKo}을/를 받아들일 수 없어요.`,
    extraKo: (t) => `현실적인 대안은 ${t.mainKo}을/를 수정하는 것입니다.`,
  },
  20: {
    levelId: 20,
    unitSuffixKo: '고급 프리토킹',
    vocabTitle: '고급 토론 표현',
    grammarTitle: '고급 담화 구성',
    buildTitle: '고급 문장 조립',
    listeningTitle: '듣고 뉘앙스 고르기',
    speakingTitle: '고급 토론 말하기',
    conversationTitle: 'AI와 고급 토론',
    grammarPoint: 'Advanced discourse: The issue raises a complex question about responsibility.',
    explanation: '고급 대화에서는 관점, 전제, 함의, 절충점을 다루며 균형 있게 의견을 전개해야 합니다.',
    tips: ['확신이 약한 표현, 반론 인정, 조건부 결론을 함께 연습합니다.'],
    words: words([['perspective', '관점'], ['assumption', '가정'], ['implication', '함의'], ['tradeoff', '절충점']]),
    positive: (t) => `The ${t.mainNoun} raises a complex question about ${t.context}.`,
    question: (t) => `What assumption shapes your view of the ${t.mainNoun}?`,
    negative: (t) => `I would not reduce the ${t.mainNoun} to a simple choice.`,
    extra: (t) => `The real tradeoff is between speed and fairness in ${t.context}.`,
    positiveKo: (t) => `${t.mainKo}은/는 ${t.contextKo}에 대한 복잡한 질문을 제기해요.`,
    questionKo: (t) => `어떤 가정이 ${t.mainKo}에 대한 관점을 형성하나요?`,
    negativeKo: (t) => `나는 ${t.mainKo}을/를 단순한 선택으로 축소하지 않을 거예요.`,
    extraKo: (t) => `진짜 절충점은 ${t.contextKo}에서 속도와 공정성 사이에 있어요.`,
  },
};

export function makeGeneratedLevelUnits(levelId: number): Unit[] {
  const pattern = getPattern(levelId);
  const unitCount = levelId + 7;
  const units: Unit[] = [];

  for (let order = 1; order < unitCount; order += 1) {
    units.push(makeUnit(pattern, getTopic(levelId, order), order));
  }

  units.push(makeFinalUnit(pattern, unitCount));
  return units;
}

export function makeGeneratedScenarios(): Record<string, Scenario> {
  const scenarios: Record<string, Scenario> = {};

  for (let levelId = 8; levelId <= 20; levelId += 1) {
    const pattern = getPattern(levelId);
    const unitCount = levelId + 7;

    for (let order = 1; order < unitCount; order += 1) {
      const topic = getTopic(levelId, order);
      const id = scenarioId(levelId, order);
      scenarios[id] = makeScenario(id, pattern, topic);
    }

    const finalId = finalScenarioId(levelId);
    scenarios[finalId] = makeFinalScenario(finalId, pattern);
  }

  return scenarios;
}

function makeUnit(pattern: LevelPattern, topic: Topic, order: number): Unit {
  const unitId = `${pattern.levelId}-${order}`;
  return {
    id: unitId,
    levelId: pattern.levelId,
    order,
    title: `${topic.titleKo} ${pattern.unitSuffixKo}`,
    icon: topic.icon,
    description: `${topic.contextKo} 상황에서 ${pattern.grammarTitle}을 활용해 말하기`,
    lessons: [
      vocab(unitId, 1, pattern.vocabTitle, makeVocabWords(pattern, topic)),
      grammar(unitId, 2, pattern.grammarTitle, makeGrammar(pattern, topic)),
      build(unitId, 3, pattern.buildTitle, makeBuildItems(pattern, topic)),
      listening(unitId, 4, pattern.listeningTitle, makeListeningItems(pattern, topic)),
      speaking(unitId, 5, pattern.speakingTitle, makeSpeakingPrompts(pattern, topic)),
      conversation(
        unitId,
        6,
        pattern.conversationTitle,
        scenarioId(pattern.levelId, order),
        `${topic.contextKo} 상황에서 ${pattern.grammarTitle}을 사용해 AI와 대화해요.`,
        pattern.levelId >= 17 ? 6 : 5
      ),
      review(unitId, 7, '유닛 복습', makeReviewQuestions(pattern, topic)),
    ],
  };
}

function makeFinalUnit(pattern: LevelPattern, order: number): Unit {
  const unitId = `${pattern.levelId}-${order}`;
  return {
    id: unitId,
    levelId: pattern.levelId,
    order,
    title: '복습 + 승급 테스트',
    icon: '🏁',
    description: `Level ${pattern.levelId} ${pattern.grammarTitle} 종합 복습`,
    lessons: [
      review(unitId, 1, `Level ${pattern.levelId} 종합 복습`, makeFinalReviewQuestions(pattern)),
      conversation(
        unitId,
        2,
        'AI 종합 회화',
        finalScenarioId(pattern.levelId),
        `Level ${pattern.levelId}의 핵심 문법과 상황을 섞어 종합 회화를 진행해요.`,
        7
      ),
      {
        id: lessonId(unitId, 3),
        unitId,
        order: 3,
        type: 'test',
        title: `Level ${pattern.levelId} 승급 테스트`,
        xp: 120 + pattern.levelId * 5,
        content: {
          kind: 'test',
          passScore: 70,
          questions: makeFinalTestQuestions(pattern),
        },
      },
    ],
  };
}

function vocab(unitId: string, order: number, title: string, words: VocabWord[]): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'vocab',
    title,
    xp: 10,
    content: { kind: 'vocab', words },
  };
}

function grammar(
  unitId: string,
  order: number,
  title: string,
  content: Omit<GrammarContent, 'kind'>
): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'grammar',
    title,
    xp: 15,
    content: { kind: 'grammar', ...content },
  };
}

function build(unitId: string, order: number, title: string, items: BuildItem[]): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'build',
    title,
    xp: 15,
    content: { kind: 'build', items },
  };
}

function listening(unitId: string, order: number, title: string, items: ListeningItem[]): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'listening',
    title,
    xp: 15,
    content: { kind: 'listening', items },
  };
}

function speaking(
  unitId: string,
  order: number,
  title: string,
  prompts: { en: string; ko: string }[]
): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'speaking',
    title,
    xp: 15,
    content: { kind: 'speaking', prompts },
  };
}

function conversation(
  unitId: string,
  order: number,
  title: string,
  scenarioIdValue: string,
  situation: string,
  goalTurns: number
): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'conversation',
    title,
    xp: 30,
    content: { kind: 'conversation', scenarioId: scenarioIdValue, title, situation, goalTurns },
  };
}

function review(unitId: string, order: number, title: string, questions: QuizQuestion[]): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'review',
    title,
    xp: 20,
    content: { kind: 'review', questions },
  };
}

function makeVocabWords(pattern: LevelPattern, topic: Topic): VocabWord[] {
  const candidates = uniqueWords([...topic.words, ...pattern.words, ...fallbackWords()]);
  return candidates.slice(0, 8).map((word) => ({
    en: word.en,
    ko: word.ko,
    example: `The ${word.en} is important in ${topic.context}.`,
    exampleKo: `${topic.contextKo}에서 ${word.ko}는 중요해요.`,
  }));
}

function makeGrammar(pattern: LevelPattern, topic: Topic): Omit<GrammarContent, 'kind'> {
  return {
    point: pattern.grammarPoint,
    explanation: pattern.explanation,
    examples: [
      { en: pattern.positive(topic), ko: pattern.positiveKo(topic) },
      { en: pattern.question(topic), ko: pattern.questionKo(topic) },
      { en: pattern.negative(topic), ko: pattern.negativeKo(topic) },
      { en: pattern.extra(topic), ko: pattern.extraKo(topic) },
    ],
    tips: pattern.tips,
  };
}

function makeBuildItems(pattern: LevelPattern, topic: Topic): BuildItem[] {
  return [
    buildItem(pattern.positive(topic), pattern.positiveKo(topic)),
    buildItem(pattern.question(topic), pattern.questionKo(topic)),
    buildItem(pattern.negative(topic), pattern.negativeKo(topic)),
    buildItem(pattern.extra(topic), pattern.extraKo(topic)),
  ];
}

function makeListeningItems(pattern: LevelPattern, topic: Topic): ListeningItem[] {
  return [
    {
      audioText: pattern.positive(topic),
      question: `${topic.contextKo}에서 무엇을 말하나요?`,
      options: [pattern.positiveKo(topic), pattern.negativeKo(topic), pattern.extraKo(topic)],
      answerIndex: 0,
    },
    {
      audioText: pattern.question(topic),
      question: '무엇을 묻고 있나요?',
      options: [pattern.questionKo(topic), pattern.positiveKo(topic), pattern.negativeKo(topic)],
      answerIndex: 0,
    },
    {
      audioText: pattern.extra(topic),
      question: '추가 문장의 의미는?',
      options: [pattern.extraKo(topic), pattern.questionKo(topic), pattern.negativeKo(topic)],
      answerIndex: 0,
    },
  ];
}

function makeSpeakingPrompts(pattern: LevelPattern, topic: Topic) {
  return [
    { en: pattern.positive(topic), ko: pattern.positiveKo(topic) },
    { en: pattern.question(topic), ko: pattern.questionKo(topic) },
    { en: pattern.negative(topic), ko: pattern.negativeKo(topic) },
    { en: pattern.extra(topic), ko: pattern.extraKo(topic) },
  ];
}

function makeReviewQuestions(pattern: LevelPattern, topic: Topic): QuizQuestion[] {
  return [
    {
      prompt: `${pattern.grammarTitle}의 핵심 예문은?`,
      options: [pattern.positive(topic), pattern.negative(topic), `The ${topic.mainNoun} is blue.`],
      answerIndex: 0,
    },
    {
      prompt: `${topic.mainKo} 관련 질문은?`,
      options: [pattern.question(topic), pattern.positive(topic), pattern.extra(topic)],
      answerIndex: 0,
    },
    {
      prompt: `${topic.contextKo}에서 쓸 수 있는 추가 문장은?`,
      options: [pattern.extra(topic), pattern.negative(topic), pattern.question(topic)],
      answerIndex: 0,
    },
  ];
}

function makeFinalReviewQuestions(pattern: LevelPattern): QuizQuestion[] {
  return topicsForFinal(pattern.levelId).slice(0, 10).map((topic, index) => ({
    prompt: `Level ${pattern.levelId} 복습 ${index + 1}`,
    options: [pattern.positive(topic), pattern.question(topic), pattern.negative(topic)],
    answerIndex: 0,
  }));
}

function makeFinalTestQuestions(pattern: LevelPattern): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  topicsForFinal(pattern.levelId).forEach((topic, index) => {
    const sentence = index % 2 === 0 ? pattern.positive(topic) : pattern.question(topic);
    const tokens = splitSentence(sentence);
    const answer = tokens[Math.min(2, tokens.length - 1)];
    questions.push({
      prompt: `Choose the correct word: ${sentence.replace(answer, '___')}`,
      options: [answer, 'wrong', 'maybe'],
      answerIndex: 0,
    });
  });
  return questions.slice(0, 18);
}

function makeScenario(id: string, pattern: LevelPattern, topic: Topic): Scenario {
  return {
    id,
    steps: [
      {
        bot: `Let us talk about ${topic.context}.`,
        botKo: `${topic.contextKo}에 대해 이야기해요.`,
        suggestions: [pattern.positive(topic), pattern.extra(topic), pattern.negative(topic)],
      },
      {
        bot: `Ask me a question about the ${topic.mainNoun}.`,
        botKo: `${topic.mainKo}에 대해 질문해보세요.`,
        suggestions: [pattern.question(topic), `What do you think about the ${topic.mainNoun}?`, `Can you explain the ${topic.mainNoun}?`],
      },
      {
        bot: `Give me one clear detail about ${topic.context}.`,
        botKo: `${topic.contextKo}에 대해 분명한 세부 사항 하나를 말해보세요.`,
        suggestions: [pattern.extra(topic), `The ${topic.mainNoun} needs more detail.`, `This detail is important.`],
      },
      {
        bot: `Now say the opposite or a limitation.`,
        botKo: `이제 반대 의미나 한계를 말해보세요.`,
        suggestions: [pattern.negative(topic), `There is one problem with the ${topic.mainNoun}.`, `It is not the best option.`],
      },
      {
        bot: `Last one. Summarize your idea.`,
        botKo: `마지막이에요. 생각을 요약해보세요.`,
        suggestions: [`My main point is about the ${topic.mainNoun}.`, `I think this is useful for ${topic.context}.`, `That is my summary.`],
      },
    ],
    closing: {
      bot: `Excellent. You handled a ${topic.context} conversation.`,
      botKo: `훌륭해요. ${topic.contextKo} 대화를 해냈어요.`,
    },
  };
}

function makeFinalScenario(id: string, pattern: LevelPattern): Scenario {
  const topics = topicsForFinal(pattern.levelId);
  return {
    id,
    steps: topics.slice(0, 7).map((topic, index) => ({
      bot: `Level ${pattern.levelId} review ${index + 1}: respond about ${topic.context}.`,
      botKo: `Level ${pattern.levelId} 복습 ${index + 1}: ${topic.contextKo}에 대해 답해보세요.`,
      suggestions: [pattern.positive(topic), pattern.question(topic), pattern.extra(topic)],
    })),
    closing: {
      bot: `Excellent. You finished the Level ${pattern.levelId} conversation test.`,
      botKo: `훌륭해요. Level ${pattern.levelId} 회화 테스트를 마쳤어요.`,
    },
  };
}

function buildItem(sentence: string, ko: string): BuildItem {
  const answer = splitSentence(sentence);
  return { ko, answer, bank: [...answer].reverse() };
}

function splitSentence(sentence: string) {
  return sentence
    .replace(/[?.!,]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function scenarioId(levelId: number, order: number) {
  return `level${levelId}-unit${order}-generated`;
}

function finalScenarioId(levelId: number) {
  return `level${levelId}-review-test`;
}

function getPattern(levelId: number) {
  const pattern = LEVEL_PATTERNS[levelId];
  if (!pattern) throw new Error(`Missing generated level pattern: ${levelId}`);
  return pattern;
}

function getTopic(levelId: number, order: number) {
  return TOPICS[(levelId * 5 + order - 1) % TOPICS.length];
}

function topicsForFinal(levelId: number) {
  return Array.from({ length: 18 }, (_, index) => getTopic(levelId, index + 1));
}

function topic(
  icon: string,
  titleKo: string,
  titleEn: string,
  context: string,
  contextKo: string,
  mainNoun: string,
  mainKo: string,
  actionBase: string,
  actionPast: string,
  actionParticiple: string,
  resultKo: string,
  rawWords: [string, string][]
): Topic {
  return {
    icon,
    titleKo,
    titleEn,
    context,
    contextKo,
    mainNoun,
    mainKo,
    actionBase,
    actionPast,
    actionParticiple,
    resultKo,
    words: words(rawWords),
  };
}

function words(items: [string, string][]): TopicWord[] {
  return items.map(([en, ko]) => ({ en, ko }));
}

function uniqueWords(items: TopicWord[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.en.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function fallbackWords(): TopicWord[] {
  return words([
    ['context', '맥락'],
    ['detail', '세부 사항'],
    ['choice', '선택'],
    ['result', '결과'],
    ['process', '과정'],
    ['goal', '목표'],
  ]);
}
