import {
  BuildItem,
  GrammarContent,
  Lesson,
  ListeningItem,
  QuizQuestion,
  Unit,
  VocabWord,
} from '../../types/curriculum';

/**
 * Level 7 (생활 회화 완성 / CEFR A2) 실제 학습 콘텐츠.
 * can/could/should/need to를 중심으로 능력, 허락, 부탁, 조언, 문제 해결을 다룬다.
 */

const lessonId = (unitId: string, order: number) => `${unitId}-${order}`;

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
  prompts: { en: string; ko: string; ipa?: string }[]
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
  scenarioId: string,
  situation: string,
  goalTurns = 5
): Lesson {
  return {
    id: lessonId(unitId, order),
    unitId,
    order,
    type: 'conversation',
    title,
    xp: 30,
    content: { kind: 'conversation', scenarioId, title, situation, goalTurns },
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

interface UnitSpec {
  id: string;
  order: number;
  title: string;
  icon: string;
  description: string;
  vocabTitle: string;
  words: VocabWord[];
  grammarTitle: string;
  grammar: Omit<GrammarContent, 'kind'>;
  buildTitle: string;
  builds: BuildItem[];
  listeningTitle: string;
  listeningItems: ListeningItem[];
  speakingTitle: string;
  prompts: { en: string; ko: string; ipa?: string }[];
  conversationTitle: string;
  scenarioId: string;
  situation: string;
  reviewQuestions: QuizQuestion[];
  goalTurns?: number;
}

function unit(spec: UnitSpec): Unit {
  return {
    id: spec.id,
    levelId: 7,
    order: spec.order,
    title: spec.title,
    icon: spec.icon,
    description: spec.description,
    lessons: [
      vocab(spec.id, 1, spec.vocabTitle, spec.words),
      grammar(spec.id, 2, spec.grammarTitle, spec.grammar),
      build(spec.id, 3, spec.buildTitle, spec.builds),
      listening(spec.id, 4, spec.listeningTitle, spec.listeningItems),
      speaking(spec.id, 5, spec.speakingTitle, spec.prompts),
      conversation(
        spec.id,
        6,
        spec.conversationTitle,
        spec.scenarioId,
        spec.situation,
        spec.goalTurns
      ),
      review(spec.id, 7, '유닛 복습', spec.reviewQuestions),
    ],
  };
}

const unitSpecs: UnitSpec[] = [
  {
    id: '7-1',
    order: 1,
    title: '할 수 있는 일',
    icon: '💪',
    description: 'can으로 능력과 가능 여부를 말하기',
    vocabTitle: '능력 표현',
    words: [
      { en: 'can', ko: '할 수 있다', ipa: '/kæn/', example: 'I can speak English.', exampleKo: '나는 영어를 말할 수 있어요.' },
      { en: 'cannot', ko: '할 수 없다', ipa: '/ˈkænɑːt/', example: 'I cannot swim well.', exampleKo: '나는 수영을 잘 못해요.' },
      { en: 'speak', ko: '말하다', ipa: '/spiːk/', example: 'Can you speak slowly?', exampleKo: '천천히 말할 수 있나요?' },
      { en: 'swim', ko: '수영하다', ipa: '/swɪm/', example: 'She can swim fast.', exampleKo: '그녀는 빠르게 수영할 수 있어요.' },
      { en: 'drive', ko: '운전하다', ipa: '/draɪv/', example: 'Can you drive?', exampleKo: '운전할 수 있나요?' },
      { en: 'cook', ko: '요리하다', ipa: '/kʊk/', example: 'He can cook dinner.', exampleKo: '그는 저녁을 요리할 수 있어요.' },
      { en: 'play', ko: '연주하다/놀다', ipa: '/pleɪ/', example: 'I can play the piano.', exampleKo: '나는 피아노를 칠 수 있어요.' },
      { en: 'use', ko: '사용하다', ipa: '/juːz/', example: 'I can use this app.', exampleKo: '나는 이 앱을 사용할 수 있어요.' },
    ],
    grammarTitle: 'can + 동사원형',
    grammar: {
      point: 'I can speak English. / Can you drive?',
      explanation:
        '능력이나 가능한 일을 말할 때 can 뒤에는 동사원형을 씁니다. 질문은 Can you...?로 시작합니다.',
      examples: [
        { en: 'I can speak English.', ko: '나는 영어를 말할 수 있어요.' },
        { en: 'I cannot swim well.', ko: '나는 수영을 잘 못해요.' },
        { en: 'Can you drive?', ko: '운전할 수 있나요?' },
        { en: 'She can cook dinner.', ko: '그녀는 저녁을 요리할 수 있어요.' },
      ],
      tips: ['can 뒤에는 speaks, to speak가 아니라 speak를 씁니다.'],
    },
    buildTitle: 'can 문장 조립',
    builds: [
      { ko: '나는 영어를 말할 수 있어요.', answer: ['I', 'can', 'speak', 'English'], bank: ['English', 'speak', 'can', 'I'] },
      { ko: '나는 수영을 잘 못해요.', answer: ['I', 'cannot', 'swim', 'well'], bank: ['well', 'swim', 'cannot', 'I'] },
      { ko: '운전할 수 있나요?', answer: ['Can', 'you', 'drive'], bank: ['drive', 'you', 'Can'] },
      { ko: '그녀는 저녁을 요리할 수 있어요.', answer: ['She', 'can', 'cook', 'dinner'], bank: ['dinner', 'cook', 'can', 'She'] },
    ],
    listeningTitle: '듣고 능력 고르기',
    listeningItems: [
      { audioText: 'I can speak English.', question: '무엇을 할 수 있나요?', options: ['영어 말하기', '운전하기', '수영하기'], answerIndex: 0 },
      { audioText: 'I cannot swim well.', question: '무엇을 잘 못하나요?', options: ['수영', '요리', '연주'], answerIndex: 0 },
      { audioText: 'Can you drive?', question: '무엇을 할 수 있는지 묻나요?', options: ['운전', '수영', '사용'], answerIndex: 0 },
    ],
    speakingTitle: '능력 말하기',
    prompts: [
      { en: 'I can speak English.', ko: '나는 영어를 말할 수 있어요.' },
      { en: 'I cannot swim well.', ko: '나는 수영을 잘 못해요.' },
      { en: 'Can you drive?', ko: '운전할 수 있나요?' },
      { en: 'She can cook dinner.', ko: '그녀는 저녁을 요리할 수 있어요.' },
    ],
    conversationTitle: 'AI와 능력 대화',
    scenarioId: 'can-abilities',
    situation: 'AI와 내가 할 수 있는 일과 아직 어려운 일을 말해요.',
    reviewQuestions: [
      { prompt: 'can 뒤에 오는 동사 형태는?', options: ['동사원형', 'to 동사', '-ing'], answerIndex: 0 },
      { prompt: '"나는 운전할 수 있어요"는?', options: ['I can drive', 'I can drives', 'I can to drive'], answerIndex: 0 },
      { prompt: '"할 수 없다"는?', options: ['cannot', 'should', 'could'], answerIndex: 0 },
    ],
  },
  {
    id: '7-2',
    order: 2,
    title: '허락 구하기',
    icon: '🙋',
    description: 'Can I...?로 허락을 묻고 답하기',
    vocabTitle: '허락 표현',
    words: [
      { en: 'permission', ko: '허락', ipa: '/pərˈmɪʃən/', example: 'I need permission.', exampleKo: '허락이 필요해요.' },
      { en: 'allowed', ko: '허용된', ipa: '/əˈlaʊd/', example: 'Phones are allowed here.', exampleKo: '여기서는 휴대폰이 허용돼요.' },
      { en: 'borrow', ko: '빌리다', ipa: '/ˈbɑːroʊ/', example: 'Can I borrow your pen?', exampleKo: '펜을 빌릴 수 있을까요?' },
      { en: 'open', ko: '열다', ipa: '/ˈoʊpən/', example: 'Can I open the window?', exampleKo: '창문을 열어도 될까요?' },
      { en: 'close', ko: '닫다', ipa: '/kloʊz/', example: 'Can I close the door?', exampleKo: '문을 닫아도 될까요?' },
      { en: 'leave', ko: '떠나다/나가다', ipa: '/liːv/', example: 'Can I leave early?', exampleKo: '일찍 나가도 될까요?' },
      { en: 'enter', ko: '들어가다', ipa: '/ˈentər/', example: 'Can I enter now?', exampleKo: '지금 들어가도 될까요?' },
      { en: 'seat', ko: '자리', ipa: '/siːt/', example: 'Can I sit in this seat?', exampleKo: '이 자리에 앉아도 될까요?' },
    ],
    grammarTitle: 'Can I...? 허락 질문',
    grammar: {
      point: 'Can I borrow your pen? / Yes, you can.',
      explanation:
        '내가 어떤 행동을 해도 되는지 물을 때 Can I...?를 씁니다. 허락하면 Yes, you can, 거절하면 Sorry, you cannot로 답합니다.',
      examples: [
        { en: 'Can I borrow your pen?', ko: '펜을 빌릴 수 있을까요?' },
        { en: 'Can I open the window?', ko: '창문을 열어도 될까요?' },
        { en: 'Yes, you can.', ko: '네, 그래도 돼요.' },
        { en: 'Sorry, you cannot enter now.', ko: '죄송하지만 지금은 들어갈 수 없어요.' },
      ],
    },
    buildTitle: '허락 질문 조립',
    builds: [
      { ko: '펜을 빌릴 수 있을까요?', answer: ['Can', 'I', 'borrow', 'your', 'pen'], bank: ['pen', 'your', 'borrow', 'I', 'Can'] },
      { ko: '창문을 열어도 될까요?', answer: ['Can', 'I', 'open', 'the', 'window'], bank: ['window', 'the', 'open', 'I', 'Can'] },
      { ko: '일찍 나가도 될까요?', answer: ['Can', 'I', 'leave', 'early'], bank: ['early', 'leave', 'I', 'Can'] },
      { ko: '네, 그래도 돼요.', answer: ['Yes', 'you', 'can'], bank: ['can', 'you', 'Yes'] },
    ],
    listeningTitle: '듣고 허락 상황 고르기',
    listeningItems: [
      { audioText: 'Can I borrow your pen?', question: '무엇을 빌리려 하나요?', options: ['펜', '휴대폰', '자리'], answerIndex: 0 },
      { audioText: 'Can I open the window?', question: '무엇을 하려 하나요?', options: ['창문 열기', '문 닫기', '일찍 나가기'], answerIndex: 0 },
      { audioText: 'Sorry, you cannot enter now.', question: '지금 할 수 없는 것은?', options: ['들어가기', '앉기', '빌리기'], answerIndex: 0 },
    ],
    speakingTitle: '허락 묻기',
    prompts: [
      { en: 'Can I borrow your pen?', ko: '펜을 빌릴 수 있을까요?' },
      { en: 'Can I open the window?', ko: '창문을 열어도 될까요?' },
      { en: 'Can I leave early?', ko: '일찍 나가도 될까요?' },
      { en: 'Yes, you can.', ko: '네, 그래도 돼요.' },
    ],
    conversationTitle: 'AI와 허락 구하기',
    scenarioId: 'ask-permission',
    situation: '교실, 사무실, 공공장소에서 허락을 묻고 답해요.',
    reviewQuestions: [
      { prompt: '내가 해도 되는지 묻는 표현은?', options: ['Can I...?', 'Can you...?', 'Should I...?'], answerIndex: 0 },
      { prompt: '"창문을 열어도 될까요?"는?', options: ['Can I open the window?', 'Can I close the window?', 'Can you open window?'], answerIndex: 0 },
      { prompt: '"네, 그래도 돼요"는?', options: ['Yes, you can', 'Yes, I can', 'No, you should'], answerIndex: 0 },
    ],
  },
  {
    id: '7-3',
    order: 3,
    title: '공손하게 부탁하기',
    icon: '🤝',
    description: 'Can you / Could you로 도움 요청하기',
    vocabTitle: '부탁 동사',
    words: [
      { en: 'help', ko: '돕다', ipa: '/help/', example: 'Could you help me?', exampleKo: '저를 도와주실 수 있나요?' },
      { en: 'pass', ko: '건네주다', ipa: '/pæs/', example: 'Can you pass the salt?', exampleKo: '소금을 건네줄 수 있나요?' },
      { en: 'wait', ko: '기다리다', ipa: '/weɪt/', example: 'Could you wait a minute?', exampleKo: '잠깐 기다려주실 수 있나요?' },
      { en: 'repeat', ko: '반복하다', ipa: '/rɪˈpiːt/', example: 'Could you repeat that?', exampleKo: '다시 말씀해주실 수 있나요?' },
      { en: 'carry', ko: '나르다/들다', ipa: '/ˈkæri/', example: 'Can you carry this bag?', exampleKo: '이 가방을 들어줄 수 있나요?' },
      { en: 'show', ko: '보여주다', ipa: '/ʃoʊ/', example: 'Can you show me the way?', exampleKo: '길을 보여주실 수 있나요?' },
      { en: 'call', ko: '전화하다', ipa: '/kɔːl/', example: 'Could you call me later?', exampleKo: '나중에 전화해주실 수 있나요?' },
      { en: 'message', ko: '메시지를 보내다', ipa: '/ˈmesɪdʒ/', example: 'Can you message me?', exampleKo: '메시지 보내줄 수 있나요?' },
    ],
    grammarTitle: 'Can you / Could you',
    grammar: {
      point: 'Can you help me? / Could you repeat that?',
      explanation:
        '상대에게 부탁할 때 Can you...?를 씁니다. Could you...?는 더 공손하게 들립니다.',
      examples: [
        { en: 'Can you help me?', ko: '도와줄 수 있나요?' },
        { en: 'Could you repeat that?', ko: '다시 말씀해주실 수 있나요?' },
        { en: 'Could you wait a minute?', ko: '잠깐 기다려주실 수 있나요?' },
        { en: 'Can you show me the way?', ko: '길을 알려주실 수 있나요?' },
      ],
      tips: ['부탁 뒤에 please를 붙이면 더 부드럽습니다.'],
    },
    buildTitle: '부탁 문장 조립',
    builds: [
      { ko: '저를 도와주실 수 있나요?', answer: ['Could', 'you', 'help', 'me'], bank: ['me', 'help', 'you', 'Could'] },
      { ko: '다시 말씀해주실 수 있나요?', answer: ['Could', 'you', 'repeat', 'that'], bank: ['that', 'repeat', 'you', 'Could'] },
      { ko: '잠깐 기다려주실 수 있나요?', answer: ['Could', 'you', 'wait', 'a', 'minute'], bank: ['minute', 'a', 'wait', 'you', 'Could'] },
      { ko: '길을 알려주실 수 있나요?', answer: ['Can', 'you', 'show', 'me', 'the', 'way'], bank: ['way', 'the', 'me', 'show', 'you', 'Can'] },
    ],
    listeningTitle: '듣고 부탁 내용 고르기',
    listeningItems: [
      { audioText: 'Could you help me?', question: '무엇을 부탁하나요?', options: ['도움', '전화', '결제'], answerIndex: 0 },
      { audioText: 'Could you repeat that?', question: '무엇을 부탁하나요?', options: ['다시 말하기', '기다리기', '앉기'], answerIndex: 0 },
      { audioText: 'Can you show me the way?', question: '무엇을 알려달라고 하나요?', options: ['길', '가격', '시간'], answerIndex: 0 },
    ],
    speakingTitle: '공손한 부탁 말하기',
    prompts: [
      { en: 'Could you help me?', ko: '저를 도와주실 수 있나요?' },
      { en: 'Could you repeat that?', ko: '다시 말씀해주실 수 있나요?' },
      { en: 'Could you wait a minute?', ko: '잠깐 기다려주실 수 있나요?' },
      { en: 'Can you show me the way?', ko: '길을 알려주실 수 있나요?' },
    ],
    conversationTitle: 'AI와 부탁하기',
    scenarioId: 'polite-requests-a2',
    situation: 'AI에게 반복, 기다림, 도움, 길 안내를 공손하게 부탁해요.',
    reviewQuestions: [
      { prompt: '더 공손한 부탁 표현은?', options: ['Could you help me?', 'You help me', 'Can I help me?'], answerIndex: 0 },
      { prompt: '"다시 말씀해주실 수 있나요?"는?', options: ['Could you repeat that?', 'Could you wait that?', 'Can you borrow that?'], answerIndex: 0 },
      { prompt: '"잠깐"은?', options: ['a minute', 'a window', 'a reason'], answerIndex: 0 },
    ],
  },
  {
    id: '7-4',
    order: 4,
    title: '도움 제안하기',
    icon: '👐',
    description: 'Can I help? / I can help로 먼저 도와주기',
    vocabTitle: '도움 제안 표현',
    words: [
      { en: 'offer', ko: '제안하다', ipa: '/ˈɔːfər/', example: 'I want to offer help.', exampleKo: '도움을 제안하고 싶어요.' },
      { en: 'bring', ko: '가져오다', ipa: '/brɪŋ/', example: 'I can bring water.', exampleKo: '물을 가져올 수 있어요.' },
      { en: 'fix', ko: '고치다', ipa: '/fɪks/', example: 'I can fix it.', exampleKo: '제가 고칠 수 있어요.' },
      { en: 'choose', ko: '고르다', ipa: '/tʃuːz/', example: 'I can choose a place.', exampleKo: '제가 장소를 고를 수 있어요.' },
      { en: 'ready', ko: '준비된', ipa: '/ˈredi/', example: 'I am ready to help.', exampleKo: '도울 준비가 됐어요.' },
      { en: 'problem', ko: '문제', ipa: '/ˈprɑːbləm/', example: 'What is the problem?', exampleKo: '문제가 무엇인가요?' },
      { en: 'anything', ko: '무엇이든', ipa: '/ˈeniθɪŋ/', example: 'Do you need anything?', exampleKo: '필요한 것이 있나요?' },
      { en: 'support', ko: '지원하다', ipa: '/səˈpɔːrt/', example: 'I can support the team.', exampleKo: '팀을 도울 수 있어요.' },
    ],
    grammarTitle: '도움 제안하기',
    grammar: {
      point: 'Can I help you? / I can bring water.',
      explanation:
        '먼저 도움을 제안할 때는 Can I help you?를 씁니다. 내가 할 수 있는 구체적인 도움은 I can + 동사로 말합니다.',
      examples: [
        { en: 'Can I help you?', ko: '도와드릴까요?' },
        { en: 'I can bring water.', ko: '물을 가져올 수 있어요.' },
        { en: 'I can fix it.', ko: '제가 고칠 수 있어요.' },
        { en: 'Do you need anything?', ko: '필요한 것이 있나요?' },
      ],
    },
    buildTitle: '도움 제안 조립',
    builds: [
      { ko: '도와드릴까요?', answer: ['Can', 'I', 'help', 'you'], bank: ['you', 'help', 'I', 'Can'] },
      { ko: '물을 가져올 수 있어요.', answer: ['I', 'can', 'bring', 'water'], bank: ['water', 'bring', 'can', 'I'] },
      { ko: '제가 고칠 수 있어요.', answer: ['I', 'can', 'fix', 'it'], bank: ['it', 'fix', 'can', 'I'] },
      { ko: '필요한 것이 있나요?', answer: ['Do', 'you', 'need', 'anything'], bank: ['anything', 'need', 'you', 'Do'] },
    ],
    listeningTitle: '듣고 도움 제안 이해하기',
    listeningItems: [
      { audioText: 'Can I help you?', question: '무엇을 제안하나요?', options: ['도움', '거절', '결제'], answerIndex: 0 },
      { audioText: 'I can bring water.', question: '무엇을 가져올 수 있나요?', options: ['물', '표', '가방'], answerIndex: 0 },
      { audioText: 'I can fix it.', question: '무엇을 할 수 있나요?', options: ['고치기', '빌리기', '기다리기'], answerIndex: 0 },
    ],
    speakingTitle: '도움 제안 말하기',
    prompts: [
      { en: 'Can I help you?', ko: '도와드릴까요?' },
      { en: 'I can bring water.', ko: '물을 가져올 수 있어요.' },
      { en: 'I can fix it.', ko: '제가 고칠 수 있어요.' },
      { en: 'Do you need anything?', ko: '필요한 것이 있나요?' },
    ],
    conversationTitle: 'AI와 도움 제안',
    scenarioId: 'offer-help-a2',
    situation: 'AI가 어려워하는 상황에서 먼저 도움을 제안해요.',
    reviewQuestions: [
      { prompt: '"도와드릴까요?"는?', options: ['Can I help you?', 'Can you help I?', 'Should I helped?'], answerIndex: 0 },
      { prompt: '"제가 고칠 수 있어요"는?', options: ['I can fix it', 'I can fixed it', 'I should fixing it'], answerIndex: 0 },
      { prompt: '"필요한 것이 있나요?"는?', options: ['Do you need anything?', 'Can you anything?', 'Are you anything?'], answerIndex: 0 },
    ],
  },
  {
    id: '7-5',
    order: 5,
    title: '조언하기',
    icon: '💡',
    description: 'should로 가벼운 조언 말하기',
    vocabTitle: '조언 단어',
    words: [
      { en: 'should', ko: '~해야 한다', ipa: '/ʃʊd/', example: 'You should rest.', exampleKo: '쉬는 게 좋아요.' },
      { en: 'advice', ko: '조언', ipa: '/ədˈvaɪs/', example: 'I need advice.', exampleKo: '조언이 필요해요.' },
      { en: 'healthy', ko: '건강한', ipa: '/ˈhelθi/', example: 'You should eat healthy food.', exampleKo: '건강한 음식을 먹는 게 좋아요.' },
      { en: 'rest', ko: '쉬다', ipa: '/rest/', example: 'You should rest today.', exampleKo: '오늘은 쉬는 게 좋아요.' },
      { en: 'water', ko: '물', ipa: '/ˈwɔːtər/', example: 'You should drink water.', exampleKo: '물을 마시는 게 좋아요.' },
      { en: 'exercise', ko: '운동하다', ipa: '/ˈeksərsaɪz/', example: 'You should exercise more.', exampleKo: '운동을 더 하는 게 좋아요.' },
      { en: 'sleep', ko: '잠자다', ipa: '/sliːp/', example: 'You should sleep early.', exampleKo: '일찍 자는 게 좋아요.' },
      { en: 'doctor', ko: '의사', ipa: '/ˈdɑːktər/', example: 'You should see a doctor.', exampleKo: '의사를 보는 게 좋아요.' },
    ],
    grammarTitle: 'should + 동사원형',
    grammar: {
      point: 'You should rest. / You should not worry.',
      explanation:
        '상대에게 조언할 때 should를 씁니다. should 뒤에도 동사원형이 오며, 하지 말라는 조언은 should not을 씁니다.',
      examples: [
        { en: 'You should rest today.', ko: '오늘은 쉬는 게 좋아요.' },
        { en: 'You should drink water.', ko: '물을 마시는 게 좋아요.' },
        { en: 'You should sleep early.', ko: '일찍 자는 게 좋아요.' },
        { en: 'You should see a doctor.', ko: '의사를 보는 게 좋아요.' },
      ],
    },
    buildTitle: '조언 문장 조립',
    builds: [
      { ko: '오늘은 쉬는 게 좋아요.', answer: ['You', 'should', 'rest', 'today'], bank: ['today', 'rest', 'should', 'You'] },
      { ko: '물을 마시는 게 좋아요.', answer: ['You', 'should', 'drink', 'water'], bank: ['water', 'drink', 'should', 'You'] },
      { ko: '일찍 자는 게 좋아요.', answer: ['You', 'should', 'sleep', 'early'], bank: ['early', 'sleep', 'should', 'You'] },
      { ko: '의사를 보는 게 좋아요.', answer: ['You', 'should', 'see', 'a', 'doctor'], bank: ['doctor', 'a', 'see', 'should', 'You'] },
    ],
    listeningTitle: '듣고 조언 고르기',
    listeningItems: [
      { audioText: 'You should rest today.', question: '무엇을 하라고 조언하나요?', options: ['쉬기', '운동하기', '전화하기'], answerIndex: 0 },
      { audioText: 'You should drink water.', question: '무엇을 마시라고 하나요?', options: ['물', '커피', '주스'], answerIndex: 0 },
      { audioText: 'You should see a doctor.', question: '누구를 보라고 하나요?', options: ['의사', '친구', '선생님'], answerIndex: 0 },
    ],
    speakingTitle: '조언 말하기',
    prompts: [
      { en: 'You should rest today.', ko: '오늘은 쉬는 게 좋아요.' },
      { en: 'You should drink water.', ko: '물을 마시는 게 좋아요.' },
      { en: 'You should sleep early.', ko: '일찍 자는 게 좋아요.' },
      { en: 'You should see a doctor.', ko: '의사를 보는 게 좋아요.' },
    ],
    conversationTitle: 'AI와 조언하기',
    scenarioId: 'give-advice',
    situation: 'AI의 문제를 듣고 should로 짧은 조언을 해요.',
    reviewQuestions: [
      { prompt: 'should 뒤에 오는 동사 형태는?', options: ['동사원형', 'to 동사', '-ed'], answerIndex: 0 },
      { prompt: '"쉬는 게 좋아요"는?', options: ['You should rest', 'You should rests', 'You should to rest'], answerIndex: 0 },
      { prompt: '"조언"은?', options: ['advice', 'permission', 'platform'], answerIndex: 0 },
    ],
  },
  {
    id: '7-6',
    order: 6,
    title: '하지 말라고 말하기',
    icon: '⚠️',
    description: 'should not으로 주의와 금지 조언하기',
    vocabTitle: '주의 표현',
    words: [
      { en: 'rule', ko: '규칙', ipa: '/ruːl/', example: 'You should follow the rules.', exampleKo: '규칙을 따르는 게 좋아요.' },
      { en: 'quiet', ko: '조용한', ipa: '/ˈkwaɪət/', example: 'You should be quiet here.', exampleKo: '여기서는 조용히 해야 해요.' },
      { en: 'smoke', ko: '담배를 피우다', ipa: '/smoʊk/', example: 'You should not smoke here.', exampleKo: '여기서 담배를 피우면 안 돼요.' },
      { en: 'park', ko: '주차하다', ipa: '/pɑːrk/', example: 'You should not park here.', exampleKo: '여기 주차하면 안 돼요.' },
      { en: 'touch', ko: '만지다', ipa: '/tʌtʃ/', example: 'You should not touch it.', exampleKo: '그것을 만지면 안 돼요.' },
      { en: 'late', ko: '늦은', ipa: '/leɪt/', example: 'You should not be late.', exampleKo: '늦으면 안 돼요.' },
      { en: 'safe', ko: '안전한', ipa: '/seɪf/', example: 'Stay safe.', exampleKo: '안전하게 있어요.' },
      { en: 'careful', ko: '조심하는', ipa: '/ˈkerfəl/', example: 'You should be careful.', exampleKo: '조심하는 게 좋아요.' },
    ],
    grammarTitle: 'should not',
    grammar: {
      point: 'You should not touch it. / You should be careful.',
      explanation:
        "하지 말라는 조언은 should not을 씁니다. 줄여서 should not을 shouldn't로도 말하지만, 앱에서는 처음에 should not으로 익힙니다.",
      examples: [
        { en: 'You should not smoke here.', ko: '여기서 담배를 피우면 안 돼요.' },
        { en: 'You should not park here.', ko: '여기 주차하면 안 돼요.' },
        { en: 'You should not touch it.', ko: '그것을 만지면 안 돼요.' },
        { en: 'You should be careful.', ko: '조심하는 게 좋아요.' },
      ],
    },
    buildTitle: '주의 문장 조립',
    builds: [
      { ko: '여기서 담배를 피우면 안 돼요.', answer: ['You', 'should', 'not', 'smoke', 'here'], bank: ['here', 'smoke', 'not', 'should', 'You'] },
      { ko: '여기 주차하면 안 돼요.', answer: ['You', 'should', 'not', 'park', 'here'], bank: ['here', 'park', 'not', 'should', 'You'] },
      { ko: '그것을 만지면 안 돼요.', answer: ['You', 'should', 'not', 'touch', 'it'], bank: ['it', 'touch', 'not', 'should', 'You'] },
      { ko: '조심하는 게 좋아요.', answer: ['You', 'should', 'be', 'careful'], bank: ['careful', 'be', 'should', 'You'] },
    ],
    listeningTitle: '듣고 주의 사항 고르기',
    listeningItems: [
      { audioText: 'You should not smoke here.', question: '무엇을 하면 안 되나요?', options: ['흡연', '주차', '대화'], answerIndex: 0 },
      { audioText: 'You should not touch it.', question: '무엇을 하면 안 되나요?', options: ['만지기', '기다리기', '열기'], answerIndex: 0 },
      { audioText: 'You should be careful.', question: '무엇을 하라고 하나요?', options: ['조심하기', '앉기', '전화하기'], answerIndex: 0 },
    ],
    speakingTitle: '주의 표현 말하기',
    prompts: [
      { en: 'You should not smoke here.', ko: '여기서 담배를 피우면 안 돼요.' },
      { en: 'You should not park here.', ko: '여기 주차하면 안 돼요.' },
      { en: 'You should not touch it.', ko: '그것을 만지면 안 돼요.' },
      { en: 'You should be careful.', ko: '조심하는 게 좋아요.' },
    ],
    conversationTitle: 'AI와 주의 주기',
    scenarioId: 'safety-rules',
    situation: '공공장소에서 규칙과 주의 사항을 부드럽게 말해요.',
    reviewQuestions: [
      { prompt: '"하면 안 돼요" 조언은?', options: ['should not', 'can not to', 'should to not'], answerIndex: 0 },
      { prompt: '"조심하는 게 좋아요"는?', options: ['You should be careful', 'You should careful', 'You can careful'], answerIndex: 0 },
      { prompt: '"규칙"은?', options: ['rule', 'reason', 'rest'], answerIndex: 0 },
    ],
  },
  {
    id: '7-7',
    order: 7,
    title: '해야 할 일',
    icon: '✅',
    description: 'need to로 필요한 행동 말하기',
    vocabTitle: '필요와 준비',
    words: [
      { en: 'need', ko: '필요하다', ipa: '/niːd/', example: 'I need to prepare.', exampleKo: '준비해야 해요.' },
      { en: 'must', ko: '반드시 해야 한다', ipa: '/mʌst/', example: 'You must bring your ID.', exampleKo: '신분증을 꼭 가져와야 해요.' },
      { en: 'deadline', ko: '마감일', ipa: '/ˈdedlaɪn/', example: 'The deadline is Friday.', exampleKo: '마감일은 금요일이에요.' },
      { en: 'form', ko: '양식/서류', ipa: '/fɔːrm/', example: 'I need to fill out this form.', exampleKo: '이 양식을 작성해야 해요.' },
      { en: 'ID', ko: '신분증', ipa: '/ˌaɪ ˈdiː/', example: 'Please bring your ID.', exampleKo: '신분증을 가져오세요.' },
      { en: 'prepare', ko: '준비하다', ipa: '/prɪˈper/', example: 'I need to prepare for class.', exampleKo: '수업을 준비해야 해요.' },
      { en: 'pay', ko: '지불하다', ipa: '/peɪ/', example: 'I need to pay today.', exampleKo: '오늘 지불해야 해요.' },
      { en: 'submit', ko: '제출하다', ipa: '/səbˈmɪt/', example: 'I need to submit the form.', exampleKo: '서류를 제출해야 해요.' },
    ],
    grammarTitle: 'need to / must',
    grammar: {
      point: 'I need to prepare. / You must bring your ID.',
      explanation:
        '필요한 행동은 need to로 말합니다. 반드시 해야 하는 강한 규칙은 must를 쓸 수 있어요.',
      examples: [
        { en: 'I need to prepare.', ko: '준비해야 해요.' },
        { en: 'I need to fill out this form.', ko: '이 양식을 작성해야 해요.' },
        { en: 'You must bring your ID.', ko: '신분증을 꼭 가져와야 해요.' },
        { en: 'I need to submit the form.', ko: '서류를 제출해야 해요.' },
      ],
    },
    buildTitle: '필요 문장 조립',
    builds: [
      { ko: '준비해야 해요.', answer: ['I', 'need', 'to', 'prepare'], bank: ['prepare', 'to', 'need', 'I'] },
      { ko: '이 양식을 작성해야 해요.', answer: ['I', 'need', 'to', 'fill', 'out', 'this', 'form'], bank: ['form', 'this', 'out', 'fill', 'to', 'need', 'I'] },
      { ko: '신분증을 꼭 가져와야 해요.', answer: ['You', 'must', 'bring', 'your', 'ID'], bank: ['ID', 'your', 'bring', 'must', 'You'] },
      { ko: '서류를 제출해야 해요.', answer: ['I', 'need', 'to', 'submit', 'the', 'form'], bank: ['form', 'the', 'submit', 'to', 'need', 'I'] },
    ],
    listeningTitle: '듣고 해야 할 일 고르기',
    listeningItems: [
      { audioText: 'I need to prepare.', question: '무엇을 해야 하나요?', options: ['준비', '휴식', '전화'], answerIndex: 0 },
      { audioText: 'You must bring your ID.', question: '무엇을 꼭 가져와야 하나요?', options: ['신분증', '물', '펜'], answerIndex: 0 },
      { audioText: 'I need to submit the form.', question: '무엇을 제출해야 하나요?', options: ['서류', '표', '가방'], answerIndex: 0 },
    ],
    speakingTitle: '필요 표현 말하기',
    prompts: [
      { en: 'I need to prepare.', ko: '준비해야 해요.' },
      { en: 'I need to fill out this form.', ko: '이 양식을 작성해야 해요.' },
      { en: 'You must bring your ID.', ko: '신분증을 꼭 가져와야 해요.' },
      { en: 'I need to submit the form.', ko: '서류를 제출해야 해요.' },
    ],
    conversationTitle: 'AI와 해야 할 일 정리',
    scenarioId: 'necessity-plans',
    situation: '마감일, 서류, 준비물을 확인하며 해야 할 일을 정리해요.',
    reviewQuestions: [
      { prompt: '"준비해야 해요"는?', options: ['I need to prepare', 'I need prepare', 'I should to prepare'], answerIndex: 0 },
      { prompt: '"반드시 해야 한다"는?', options: ['must', 'maybe', 'allowed'], answerIndex: 0 },
      { prompt: '"서류를 제출하다"는?', options: ['submit the form', 'borrow the form', 'touch the form'], answerIndex: 0 },
    ],
  },
  {
    id: '7-8',
    order: 8,
    title: '아플 때 말하기',
    icon: '🤒',
    description: '증상을 말하고 should로 건강 조언하기',
    vocabTitle: '증상 단어',
    words: [
      { en: 'headache', ko: '두통', ipa: '/ˈhedeɪk/', example: 'I have a headache.', exampleKo: '두통이 있어요.' },
      { en: 'stomachache', ko: '복통', ipa: '/ˈstʌməkeɪk/', example: 'I have a stomachache.', exampleKo: '배가 아파요.' },
      { en: 'fever', ko: '열', ipa: '/ˈfiːvər/', example: 'I have a fever.', exampleKo: '열이 있어요.' },
      { en: 'cough', ko: '기침', ipa: '/kɔːf/', example: 'I have a cough.', exampleKo: '기침이 나요.' },
      { en: 'medicine', ko: '약', ipa: '/ˈmedɪsən/', example: 'You should take medicine.', exampleKo: '약을 먹는 게 좋아요.' },
      { en: 'clinic', ko: '병원/클리닉', ipa: '/ˈklɪnɪk/', example: 'You should go to a clinic.', exampleKo: '병원에 가는 게 좋아요.' },
      { en: 'appointment', ko: '예약', ipa: '/əˈpɔɪntmənt/', example: 'I need a doctor appointment.', exampleKo: '진료 예약이 필요해요.' },
      { en: 'feel', ko: '느끼다', ipa: '/fiːl/', example: 'I feel sick.', exampleKo: '몸이 아파요.' },
    ],
    grammarTitle: 'I have + 증상',
    grammar: {
      point: 'I have a headache. / You should go to a clinic.',
      explanation:
        '증상은 I have a headache처럼 have로 말합니다. 조언은 You should rest, You should see a doctor처럼 연결합니다.',
      examples: [
        { en: 'I have a headache.', ko: '두통이 있어요.' },
        { en: 'I have a fever.', ko: '열이 있어요.' },
        { en: 'You should take medicine.', ko: '약을 먹는 게 좋아요.' },
        { en: 'You should go to a clinic.', ko: '병원에 가는 게 좋아요.' },
      ],
    },
    buildTitle: '증상 문장 조립',
    builds: [
      { ko: '두통이 있어요.', answer: ['I', 'have', 'a', 'headache'], bank: ['headache', 'a', 'have', 'I'] },
      { ko: '열이 있어요.', answer: ['I', 'have', 'a', 'fever'], bank: ['fever', 'a', 'have', 'I'] },
      { ko: '약을 먹는 게 좋아요.', answer: ['You', 'should', 'take', 'medicine'], bank: ['medicine', 'take', 'should', 'You'] },
      { ko: '병원에 가는 게 좋아요.', answer: ['You', 'should', 'go', 'to', 'a', 'clinic'], bank: ['clinic', 'a', 'to', 'go', 'should', 'You'] },
    ],
    listeningTitle: '듣고 증상 고르기',
    listeningItems: [
      { audioText: 'I have a headache.', question: '어디가 아픈가요?', options: ['머리', '배', '목'], answerIndex: 0 },
      { audioText: 'I have a fever.', question: '무슨 증상이 있나요?', options: ['열', '기침', '복통'], answerIndex: 0 },
      { audioText: 'You should go to a clinic.', question: '어디에 가라고 하나요?', options: ['병원', '학교', '역'], answerIndex: 0 },
    ],
    speakingTitle: '증상과 조언 말하기',
    prompts: [
      { en: 'I have a headache.', ko: '두통이 있어요.' },
      { en: 'I have a fever.', ko: '열이 있어요.' },
      { en: 'You should take medicine.', ko: '약을 먹는 게 좋아요.' },
      { en: 'You should go to a clinic.', ko: '병원에 가는 게 좋아요.' },
    ],
    conversationTitle: 'AI와 건강 조언',
    scenarioId: 'health-advice',
    situation: 'AI의 증상을 듣고 쉬기, 약 먹기, 병원 가기를 조언해요.',
    reviewQuestions: [
      { prompt: '"두통이 있어요"는?', options: ['I have a headache', 'I am headache', 'I can headache'], answerIndex: 0 },
      { prompt: '"약"은?', options: ['medicine', 'permission', 'message'], answerIndex: 0 },
      { prompt: '"병원에 가는 게 좋아요"는?', options: ['You should go to a clinic', 'You can clinic', 'You should to clinic'], answerIndex: 0 },
    ],
  },
  {
    id: '7-9',
    order: 9,
    title: '공공장소 규칙',
    icon: '🏛️',
    description: 'allowed / not allowed로 규칙 말하기',
    vocabTitle: '장소 규칙 단어',
    words: [
      { en: 'library', ko: '도서관', ipa: '/ˈlaɪbreri/', example: 'You should be quiet in the library.', exampleKo: '도서관에서는 조용히 해야 해요.' },
      { en: 'museum', ko: '박물관', ipa: '/mjuˈziːəm/', example: 'Photos are not allowed in the museum.', exampleKo: '박물관에서는 사진이 허용되지 않아요.' },
      { en: 'sign', ko: '표지판', ipa: '/saɪn/', example: 'Please read the sign.', exampleKo: '표지판을 읽어주세요.' },
      { en: 'line', ko: '줄', ipa: '/laɪn/', example: 'You should wait in line.', exampleKo: '줄을 서서 기다려야 해요.' },
      { en: 'permitted', ko: '허용된', ipa: '/pərˈmɪtɪd/', example: 'Food is not permitted here.', exampleKo: '여기서는 음식이 허용되지 않아요.' },
      { en: 'prohibited', ko: '금지된', ipa: '/proʊˈhɪbɪtɪd/', example: 'Smoking is prohibited.', exampleKo: '흡연은 금지되어 있어요.' },
      { en: 'entrance', ko: '입구', ipa: '/ˈentrəns/', example: 'The entrance is over there.', exampleKo: '입구는 저쪽에 있어요.' },
      { en: 'exit', ko: '출구', ipa: '/ˈeksɪt/', example: 'Where is the exit?', exampleKo: '출구가 어디인가요?' },
    ],
    grammarTitle: 'allowed / not allowed',
    grammar: {
      point: 'Photos are not allowed. / You should wait in line.',
      explanation:
        '규칙은 be allowed, be not allowed로 말할 수 있습니다. 직접 조언할 때는 You should를 씁니다.',
      examples: [
        { en: 'Photos are not allowed here.', ko: '여기서는 사진이 허용되지 않아요.' },
        { en: 'Food is not permitted here.', ko: '여기서는 음식이 허용되지 않아요.' },
        { en: 'You should wait in line.', ko: '줄을 서서 기다려야 해요.' },
        { en: 'Smoking is prohibited.', ko: '흡연은 금지되어 있어요.' },
      ],
    },
    buildTitle: '규칙 문장 조립',
    builds: [
      { ko: '여기서는 사진이 허용되지 않아요.', answer: ['Photos', 'are', 'not', 'allowed', 'here'], bank: ['here', 'allowed', 'not', 'are', 'Photos'] },
      { ko: '줄을 서서 기다려야 해요.', answer: ['You', 'should', 'wait', 'in', 'line'], bank: ['line', 'in', 'wait', 'should', 'You'] },
      { ko: '흡연은 금지되어 있어요.', answer: ['Smoking', 'is', 'prohibited'], bank: ['prohibited', 'is', 'Smoking'] },
      { ko: '출구가 어디인가요?', answer: ['Where', 'is', 'the', 'exit'], bank: ['exit', 'the', 'is', 'Where'] },
    ],
    listeningTitle: '듣고 공공장소 규칙 고르기',
    listeningItems: [
      { audioText: 'Photos are not allowed here.', question: '무엇이 허용되지 않나요?', options: ['사진', '입장', '대기'], answerIndex: 0 },
      { audioText: 'You should wait in line.', question: '어떻게 기다려야 하나요?', options: ['줄 서서', '밖에서', '앉아서'], answerIndex: 0 },
      { audioText: 'Smoking is prohibited.', question: '무엇이 금지되어 있나요?', options: ['흡연', '음식', '사진'], answerIndex: 0 },
    ],
    speakingTitle: '규칙 말하기',
    prompts: [
      { en: 'Photos are not allowed here.', ko: '여기서는 사진이 허용되지 않아요.' },
      { en: 'Food is not permitted here.', ko: '여기서는 음식이 허용되지 않아요.' },
      { en: 'You should wait in line.', ko: '줄을 서서 기다려야 해요.' },
      { en: 'Smoking is prohibited.', ko: '흡연은 금지되어 있어요.' },
    ],
    conversationTitle: 'AI와 공공장소 규칙',
    scenarioId: 'public-rules-a2',
    situation: '도서관, 박물관, 공공장소에서 가능한 일과 금지된 일을 설명해요.',
    reviewQuestions: [
      { prompt: '"허용되지 않아요"는?', options: ['not allowed', 'not can', 'not should to'], answerIndex: 0 },
      { prompt: '"줄을 서서 기다리다"는?', options: ['wait in line', 'wait on line', 'wait at line'], answerIndex: 0 },
      { prompt: '"금지된"은?', options: ['prohibited', 'flexible', 'available'], answerIndex: 0 },
    ],
  },
  {
    id: '7-10',
    order: 10,
    title: '전화와 메시지 부탁',
    icon: '📱',
    description: '연락, 와이파이, 충전 요청하기',
    vocabTitle: '연락과 기기 단어',
    words: [
      { en: 'phone', ko: '전화/휴대폰', ipa: '/foʊn/', example: 'Can I use your phone?', exampleKo: '휴대폰을 사용해도 될까요?' },
      { en: 'battery', ko: '배터리', ipa: '/ˈbætəri/', example: 'My battery is low.', exampleKo: '배터리가 부족해요.' },
      { en: 'charger', ko: '충전기', ipa: '/ˈtʃɑːrdʒər/', example: 'Can I borrow your charger?', exampleKo: '충전기를 빌릴 수 있을까요?' },
      { en: 'Wi-Fi', ko: '와이파이', ipa: '/ˈwaɪ faɪ/', example: 'What is the Wi-Fi password?', exampleKo: '와이파이 비밀번호가 뭐예요?' },
      { en: 'password', ko: '비밀번호', ipa: '/ˈpæswɜːrd/', example: 'I need the password.', exampleKo: '비밀번호가 필요해요.' },
      { en: 'email', ko: '이메일', ipa: '/ˈiːmeɪl/', example: 'Could you email me the file?', exampleKo: '파일을 이메일로 보내주실 수 있나요?' },
      { en: 'send', ko: '보내다', ipa: '/send/', example: 'Can you send me a message?', exampleKo: '메시지를 보내줄 수 있나요?' },
      { en: 'receive', ko: '받다', ipa: '/rɪˈsiːv/', example: 'I did not receive it.', exampleKo: '그것을 받지 못했어요.' },
    ],
    grammarTitle: '연락 부탁하기',
    grammar: {
      point: 'Can I borrow your charger? / Could you email me the file?',
      explanation:
        '기기를 빌릴 때는 Can I borrow...?를 쓰고, 상대에게 보내달라고 할 때는 Could you send/email me...?를 씁니다.',
      examples: [
        { en: 'Can I use your phone?', ko: '휴대폰을 사용해도 될까요?' },
        { en: 'Can I borrow your charger?', ko: '충전기를 빌릴 수 있을까요?' },
        { en: 'Could you email me the file?', ko: '파일을 이메일로 보내주실 수 있나요?' },
        { en: 'Can you send me a message?', ko: '메시지를 보내줄 수 있나요?' },
      ],
    },
    buildTitle: '연락 부탁 조립',
    builds: [
      { ko: '휴대폰을 사용해도 될까요?', answer: ['Can', 'I', 'use', 'your', 'phone'], bank: ['phone', 'your', 'use', 'I', 'Can'] },
      { ko: '충전기를 빌릴 수 있을까요?', answer: ['Can', 'I', 'borrow', 'your', 'charger'], bank: ['charger', 'your', 'borrow', 'I', 'Can'] },
      { ko: '파일을 이메일로 보내주실 수 있나요?', answer: ['Could', 'you', 'email', 'me', 'the', 'file'], bank: ['file', 'the', 'me', 'email', 'you', 'Could'] },
      { ko: '메시지를 보내줄 수 있나요?', answer: ['Can', 'you', 'send', 'me', 'a', 'message'], bank: ['message', 'a', 'me', 'send', 'you', 'Can'] },
    ],
    listeningTitle: '듣고 연락 부탁 이해하기',
    listeningItems: [
      { audioText: 'My battery is low.', question: '무엇이 부족한가요?', options: ['배터리', '와이파이', '파일'], answerIndex: 0 },
      { audioText: 'Can I borrow your charger?', question: '무엇을 빌리려 하나요?', options: ['충전기', '휴대폰', '비밀번호'], answerIndex: 0 },
      { audioText: 'Could you email me the file?', question: '무엇을 부탁하나요?', options: ['파일 이메일 보내기', '충전기 빌리기', '전화 걸기'], answerIndex: 0 },
    ],
    speakingTitle: '전화와 메시지 말하기',
    prompts: [
      { en: 'Can I use your phone?', ko: '휴대폰을 사용해도 될까요?' },
      { en: 'Can I borrow your charger?', ko: '충전기를 빌릴 수 있을까요?' },
      { en: 'Could you email me the file?', ko: '파일을 이메일로 보내주실 수 있나요?' },
      { en: 'Can you send me a message?', ko: '메시지를 보내줄 수 있나요?' },
    ],
    conversationTitle: 'AI와 연락 부탁',
    scenarioId: 'phone-message-requests',
    situation: '배터리, 충전기, 와이파이, 이메일 상황에서 필요한 것을 부탁해요.',
    reviewQuestions: [
      { prompt: '"충전기"는?', options: ['charger', 'battery', 'password'], answerIndex: 0 },
      { prompt: '"배터리가 부족해요"는?', options: ['My battery is low', 'My battery is tall', 'My charger is low'], answerIndex: 0 },
      { prompt: '"파일을 이메일로 보내주실 수 있나요?"는?', options: ['Could you email me the file?', 'Could you borrow me the file?', 'Can I file the email?'], answerIndex: 0 },
    ],
  },
  {
    id: '7-11',
    order: 11,
    title: '기기 문제 해결',
    icon: '🛠️',
    description: '문제를 설명하고 해결 방법을 제안하기',
    vocabTitle: '기기 문제 단어',
    words: [
      { en: 'broken', ko: '고장 난', ipa: '/ˈbroʊkən/', example: 'My phone is broken.', exampleKo: '휴대폰이 고장 났어요.' },
      { en: 'screen', ko: '화면', ipa: '/skriːn/', example: 'The screen is black.', exampleKo: '화면이 검어요.' },
      { en: 'restart', ko: '다시 시작하다', ipa: '/ˌriːˈstɑːrt/', example: 'You should restart it.', exampleKo: '다시 시작하는 게 좋아요.' },
      { en: 'update', ko: '업데이트하다', ipa: '/ˌʌpˈdeɪt/', example: 'You should update the app.', exampleKo: '앱을 업데이트하는 게 좋아요.' },
      { en: 'connection', ko: '연결', ipa: '/kəˈnekʃən/', example: 'The connection is slow.', exampleKo: '연결이 느려요.' },
      { en: 'error', ko: '오류', ipa: '/ˈerər/', example: 'I see an error message.', exampleKo: '오류 메시지가 보여요.' },
      { en: 'click', ko: '클릭하다', ipa: '/klɪk/', example: 'Click this button.', exampleKo: '이 버튼을 클릭하세요.' },
      { en: 'try again', ko: '다시 시도하다', ipa: '/traɪ əˈɡen/', example: 'You should try again.', exampleKo: '다시 시도하는 게 좋아요.' },
    ],
    grammarTitle: '문제 + 해결책',
    grammar: {
      point: 'My phone is broken. / You should restart it.',
      explanation:
        '기기 문제는 My phone is broken, The connection is slow처럼 말하고, 해결책은 You should restart it처럼 제안합니다.',
      examples: [
        { en: 'My phone is broken.', ko: '휴대폰이 고장 났어요.' },
        { en: 'The connection is slow.', ko: '연결이 느려요.' },
        { en: 'You should restart it.', ko: '다시 시작하는 게 좋아요.' },
        { en: 'You should update the app.', ko: '앱을 업데이트하는 게 좋아요.' },
      ],
    },
    buildTitle: '기기 문제 문장 조립',
    builds: [
      { ko: '휴대폰이 고장 났어요.', answer: ['My', 'phone', 'is', 'broken'], bank: ['broken', 'is', 'phone', 'My'] },
      { ko: '연결이 느려요.', answer: ['The', 'connection', 'is', 'slow'], bank: ['slow', 'is', 'connection', 'The'] },
      { ko: '다시 시작하는 게 좋아요.', answer: ['You', 'should', 'restart', 'it'], bank: ['it', 'restart', 'should', 'You'] },
      { ko: '앱을 업데이트하는 게 좋아요.', answer: ['You', 'should', 'update', 'the', 'app'], bank: ['app', 'the', 'update', 'should', 'You'] },
    ],
    listeningTitle: '듣고 문제 해결 고르기',
    listeningItems: [
      { audioText: 'My phone is broken.', question: '무엇이 고장 났나요?', options: ['휴대폰', '충전기', '와이파이'], answerIndex: 0 },
      { audioText: 'The connection is slow.', question: '무엇이 느린가요?', options: ['연결', '화면', '배터리'], answerIndex: 0 },
      { audioText: 'You should restart it.', question: '무엇을 하라고 하나요?', options: ['다시 시작', '대기', '구매'], answerIndex: 0 },
    ],
    speakingTitle: '문제 해결 말하기',
    prompts: [
      { en: 'My phone is broken.', ko: '휴대폰이 고장 났어요.' },
      { en: 'The connection is slow.', ko: '연결이 느려요.' },
      { en: 'You should restart it.', ko: '다시 시작하는 게 좋아요.' },
      { en: 'You should update the app.', ko: '앱을 업데이트하는 게 좋아요.' },
    ],
    conversationTitle: 'AI와 기기 문제 해결',
    scenarioId: 'tech-problems',
    situation: '휴대폰, 앱, 연결 문제를 설명하고 해결책을 제안해요.',
    reviewQuestions: [
      { prompt: '"고장 난"은?', options: ['broken', 'allowed', 'healthy'], answerIndex: 0 },
      { prompt: '"연결이 느려요"는?', options: ['The connection is slow', 'The connection is broken', 'The screen is slow'], answerIndex: 0 },
      { prompt: '"다시 시작하는 게 좋아요"는?', options: ['You should restart it', 'You should rest it', 'You can restart to it'], answerIndex: 0 },
    ],
  },
  {
    id: '7-12',
    order: 12,
    title: '여행 도움 요청',
    icon: '🧳',
    description: '공항과 호텔에서 도움을 요청하기',
    vocabTitle: '여행 도움 단어',
    words: [
      { en: 'baggage', ko: '수하물', ipa: '/ˈbæɡɪdʒ/', example: 'Can you help me with my baggage?', exampleKo: '수하물 좀 도와주실 수 있나요?' },
      { en: 'reservation', ko: '예약', ipa: '/ˌrezərˈveɪʃən/', example: 'I have a reservation.', exampleKo: '예약이 있어요.' },
      { en: 'check in', ko: '체크인하다', ipa: '/tʃek ɪn/', example: 'Can I check in now?', exampleKo: '지금 체크인할 수 있나요?' },
      { en: 'gate', ko: '탑승구', ipa: '/ɡeɪt/', example: 'Where is gate five?', exampleKo: '5번 탑승구가 어디인가요?' },
      { en: 'delay', ko: '지연', ipa: '/dɪˈleɪ/', example: 'The flight is delayed.', exampleKo: '비행기가 지연됐어요.' },
      { en: 'passport', ko: '여권', ipa: '/ˈpæspɔːrt/', example: 'You must show your passport.', exampleKo: '여권을 보여줘야 해요.' },
      { en: 'information', ko: '정보', ipa: '/ˌɪnfərˈmeɪʃən/', example: 'I need information.', exampleKo: '정보가 필요해요.' },
      { en: 'counter', ko: '창구', ipa: '/ˈkaʊntər/', example: 'Please go to the counter.', exampleKo: '창구로 가주세요.' },
    ],
    grammarTitle: '여행 중 도움 요청',
    grammar: {
      point: 'Can you help me with my baggage? / Can I check in now?',
      explanation:
        '여행 중 도움을 받을 때 Can you help me with...?를 씁니다. 내가 가능한 행동을 묻는 것은 Can I...?로 말합니다.',
      examples: [
        { en: 'Can you help me with my baggage?', ko: '수하물 좀 도와주실 수 있나요?' },
        { en: 'I have a reservation.', ko: '예약이 있어요.' },
        { en: 'Can I check in now?', ko: '지금 체크인할 수 있나요?' },
        { en: 'You must show your passport.', ko: '여권을 보여줘야 해요.' },
      ],
    },
    buildTitle: '여행 도움 문장 조립',
    builds: [
      { ko: '수하물 좀 도와주실 수 있나요?', answer: ['Can', 'you', 'help', 'me', 'with', 'my', 'baggage'], bank: ['baggage', 'my', 'with', 'me', 'help', 'you', 'Can'] },
      { ko: '예약이 있어요.', answer: ['I', 'have', 'a', 'reservation'], bank: ['reservation', 'a', 'have', 'I'] },
      { ko: '지금 체크인할 수 있나요?', answer: ['Can', 'I', 'check', 'in', 'now'], bank: ['now', 'in', 'check', 'I', 'Can'] },
      { ko: '여권을 보여줘야 해요.', answer: ['You', 'must', 'show', 'your', 'passport'], bank: ['passport', 'your', 'show', 'must', 'You'] },
    ],
    listeningTitle: '듣고 여행 상황 고르기',
    listeningItems: [
      { audioText: 'Can you help me with my baggage?', question: '무엇을 도와달라고 하나요?', options: ['수하물', '비밀번호', '서류'], answerIndex: 0 },
      { audioText: 'I have a reservation.', question: '무엇이 있나요?', options: ['예약', '문제', '마감일'], answerIndex: 0 },
      { audioText: 'The flight is delayed.', question: '무슨 상황인가요?', options: ['비행기 지연', '체크인 완료', '수하물 분실'], answerIndex: 0 },
    ],
    speakingTitle: '여행 도움 말하기',
    prompts: [
      { en: 'Can you help me with my baggage?', ko: '수하물 좀 도와주실 수 있나요?' },
      { en: 'I have a reservation.', ko: '예약이 있어요.' },
      { en: 'Can I check in now?', ko: '지금 체크인할 수 있나요?' },
      { en: 'You must show your passport.', ko: '여권을 보여줘야 해요.' },
    ],
    conversationTitle: 'AI와 여행 도움 요청',
    scenarioId: 'travel-help-can',
    situation: '공항이나 호텔에서 체크인, 수하물, 예약 도움을 요청해요.',
    reviewQuestions: [
      { prompt: '"수하물"은?', options: ['baggage', 'battery', 'deadline'], answerIndex: 0 },
      { prompt: '"예약이 있어요"는?', options: ['I have a reservation', 'I am a reservation', 'I can reservation'], answerIndex: 0 },
      { prompt: '"지금 체크인할 수 있나요?"는?', options: ['Can I check in now?', 'Can you check me now?', 'Should I check now in?'], answerIndex: 0 },
    ],
  },
  {
    id: '7-13',
    order: 13,
    title: '문제 해결 회화',
    icon: '🧭',
    description: 'What should I do?로 선택지와 해결책 묻기',
    vocabTitle: '선택과 해결 단어',
    words: [
      { en: 'solution', ko: '해결책', ipa: '/səˈluːʃən/', example: 'We need a solution.', exampleKo: '해결책이 필요해요.' },
      { en: 'option', ko: '선택지', ipa: '/ˈɑːpʃən/', example: 'What are my options?', exampleKo: '선택지가 무엇인가요?' },
      { en: 'choose', ko: '고르다', ipa: '/tʃuːz/', example: 'You should choose option one.', exampleKo: '1번 선택지를 고르는 게 좋아요.' },
      { en: 'recommend', ko: '추천하다', ipa: '/ˌrekəˈmend/', example: 'What do you recommend?', exampleKo: '무엇을 추천하나요?' },
      { en: 'decide', ko: '결정하다', ipa: '/dɪˈsaɪd/', example: 'I cannot decide.', exampleKo: '결정할 수 없어요.' },
      { en: 'try', ko: '시도하다', ipa: '/traɪ/', example: 'You should try this.', exampleKo: '이것을 시도해보는 게 좋아요.' },
      { en: 'better', ko: '더 나은', ipa: '/ˈbetər/', example: 'This option is better.', exampleKo: '이 선택지가 더 나아요.' },
      { en: 'possible', ko: '가능한', ipa: '/ˈpɑːsəbəl/', example: 'Is that possible?', exampleKo: '그게 가능한가요?' },
    ],
    grammarTitle: 'What should I do?',
    grammar: {
      point: 'What should I do? / You should try this.',
      explanation:
        '어떻게 해야 할지 물을 때 What should I do?를 씁니다. 선택지를 묻거나 추천을 받을 때도 A2 회화에서 자주 씁니다.',
      examples: [
        { en: 'What should I do?', ko: '어떻게 해야 하나요?' },
        { en: 'What are my options?', ko: '선택지가 무엇인가요?' },
        { en: 'What do you recommend?', ko: '무엇을 추천하나요?' },
        { en: 'You should try this.', ko: '이것을 시도해보는 게 좋아요.' },
      ],
    },
    buildTitle: '해결 질문 조립',
    builds: [
      { ko: '어떻게 해야 하나요?', answer: ['What', 'should', 'I', 'do'], bank: ['do', 'I', 'should', 'What'] },
      { ko: '선택지가 무엇인가요?', answer: ['What', 'are', 'my', 'options'], bank: ['options', 'my', 'are', 'What'] },
      { ko: '무엇을 추천하나요?', answer: ['What', 'do', 'you', 'recommend'], bank: ['recommend', 'you', 'do', 'What'] },
      { ko: '이것을 시도해보는 게 좋아요.', answer: ['You', 'should', 'try', 'this'], bank: ['this', 'try', 'should', 'You'] },
    ],
    listeningTitle: '듣고 해결 표현 고르기',
    listeningItems: [
      { audioText: 'What should I do?', question: '무엇을 묻나요?', options: ['어떻게 해야 하는지', '어디에 있는지', '몇 시인지'], answerIndex: 0 },
      { audioText: 'What are my options?', question: '무엇을 묻나요?', options: ['선택지', '가격', '날씨'], answerIndex: 0 },
      { audioText: 'You should try this.', question: '무엇을 하라고 하나요?', options: ['시도하기', '기다리기', '취소하기'], answerIndex: 0 },
    ],
    speakingTitle: '문제 해결 말하기',
    prompts: [
      { en: 'What should I do?', ko: '어떻게 해야 하나요?' },
      { en: 'What are my options?', ko: '선택지가 무엇인가요?' },
      { en: 'What do you recommend?', ko: '무엇을 추천하나요?' },
      { en: 'You should try this.', ko: '이것을 시도해보는 게 좋아요.' },
    ],
    conversationTitle: 'AI와 문제 해결',
    scenarioId: 'problem-solving-a2',
    situation: '문제가 생겼을 때 선택지를 묻고 추천을 받아 해결책을 정해요.',
    goalTurns: 6,
    reviewQuestions: [
      { prompt: '"어떻게 해야 하나요?"는?', options: ['What should I do?', 'What can I doing?', 'What should I to do?'], answerIndex: 0 },
      { prompt: '"선택지"는?', options: ['option', 'solution', 'permission'], answerIndex: 0 },
      { prompt: '"무엇을 추천하나요?"는?', options: ['What do you recommend?', 'What you recommend?', 'What can recommend?'], answerIndex: 0 },
    ],
  },
];

export const LEVEL_7_UNITS: Unit[] = [
  ...unitSpecs.map(unit),
  {
    id: '7-14',
    levelId: 7,
    order: 14,
    title: '복습 + 승급 테스트',
    icon: '🏁',
    description: 'Level 7 can·could·should·need to 종합 복습',
    lessons: [
      review('7-14', 1, 'Level 7 종합 복습', [
        { prompt: 'I ___ speak English.', options: ['can', 'should', 'need'], answerIndex: 0 },
        { prompt: 'Can I ___ your pen?', options: ['borrow', 'borrows', 'to borrow'], answerIndex: 0 },
        { prompt: 'Could you ___ that?', options: ['repeat', 'repeats', 'to repeat'], answerIndex: 0 },
        { prompt: 'You ___ rest today.', options: ['should', 'can to', 'should to'], answerIndex: 0 },
        { prompt: 'You should ___ smoke here.', options: ['not', 'no', 'do not'], answerIndex: 0 },
        { prompt: 'I need ___ prepare.', options: ['to', 'for', 'at'], answerIndex: 0 },
        { prompt: '"어떻게 해야 하나요?"는?', options: ['What should I do?', 'What can I do should?', 'What should I to do?'], answerIndex: 0 },
        { prompt: '"충전기를 빌릴 수 있을까요?"는?', options: ['Can I borrow your charger?', 'Can I lend your charger?', 'Could I charging?'], answerIndex: 0 },
        { prompt: '"여기서는 사진이 허용되지 않아요"는?', options: ['Photos are not allowed here', 'Photos cannot allowed here', 'Photos should not allowed here'], answerIndex: 0 },
        { prompt: '"수하물 좀 도와주실 수 있나요?"는?', options: ['Can you help me with my baggage?', 'Can I help your baggage?', 'Should you baggage me?'], answerIndex: 0 },
      ]),
      conversation('7-14', 2, 'AI 종합 회화', 'level7-review-test', '능력, 허락, 부탁, 조언, 문제 해결을 섞어 생활 회화를 진행해요.', 7),
      {
        id: '7-14-3',
        unitId: '7-14',
        order: 3,
        type: 'test',
        title: 'Level 7 승급 테스트',
        xp: 120,
        content: {
          kind: 'test',
          passScore: 70,
          questions: [
            { prompt: 'I can ___ English.', options: ['speak', 'speaks', 'to speak'], answerIndex: 0 },
            { prompt: 'Can you ___?', options: ['drive', 'drives', 'driving'], answerIndex: 0 },
            { prompt: 'I ___ swim well.', options: ['cannot', 'should not to', 'need not to'], answerIndex: 0 },
            { prompt: 'Can I ___ the window?', options: ['open', 'opens', 'to open'], answerIndex: 0 },
            { prompt: 'Yes, you ___.', options: ['can', 'should', 'need'], answerIndex: 0 },
            { prompt: 'Could you ___ me?', options: ['help', 'helps', 'to help'], answerIndex: 0 },
            { prompt: 'Could you ___ that?', options: ['repeat', 'borrow', 'allow'], answerIndex: 0 },
            { prompt: 'Can I ___ you?', options: ['help', 'helps', 'to help'], answerIndex: 0 },
            { prompt: 'You should ___ water.', options: ['drink', 'drinks', 'to drink'], answerIndex: 0 },
            { prompt: 'You should ___ a doctor.', options: ['see', 'sees', 'to see'], answerIndex: 0 },
            { prompt: 'You should not ___ here.', options: ['smoke', 'smokes', 'to smoke'], answerIndex: 0 },
            { prompt: 'I need ___ submit the form.', options: ['to', 'for', 'at'], answerIndex: 0 },
            { prompt: 'You must ___ your ID.', options: ['bring', 'brings', 'to bring'], answerIndex: 0 },
            { prompt: 'I have ___ headache.', options: ['a', 'an', 'the only'], answerIndex: 0 },
            { prompt: 'Photos are not ___ here.', options: ['allowed', 'allow', 'allowing'], answerIndex: 0 },
            { prompt: 'My battery is ___.', options: ['low', 'allowed', 'prohibited'], answerIndex: 0 },
            { prompt: 'You should ___ the app.', options: ['update', 'updates', 'to update'], answerIndex: 0 },
            { prompt: 'What should I ___?', options: ['do', 'does', 'to do'], answerIndex: 0 },
          ],
        },
      },
    ],
  },
];
