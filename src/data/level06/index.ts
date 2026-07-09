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
 * Level 6 (생활 회화 / CEFR A2) 실제 학습 콘텐츠.
 * 시간, 요일, 빈도, 일정, 약속 조율을 생활 회화로 연결한다.
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

export const LEVEL_6_UNITS: Unit[] = [
  {
    id: '6-1',
    levelId: 6,
    order: 1,
    title: '요일 말하기',
    icon: '🗓️',
    description: '요일과 주말 표현으로 일정을 말하기',
    lessons: [
      vocab('6-1', 1, '요일 단어', [
        { en: 'Monday', ko: '월요일', ipa: '/ˈmʌndeɪ/', example: 'I work on Monday.', exampleKo: '나는 월요일에 일해요.' },
        { en: 'Tuesday', ko: '화요일', ipa: '/ˈtuːzdeɪ/', example: 'I study on Tuesday.', exampleKo: '나는 화요일에 공부해요.' },
        { en: 'Wednesday', ko: '수요일', ipa: '/ˈwenzdeɪ/', example: 'I am free on Wednesday.', exampleKo: '나는 수요일에 시간이 돼요.' },
        { en: 'Thursday', ko: '목요일', ipa: '/ˈθɜːrzdeɪ/', example: 'I have a class on Thursday.', exampleKo: '나는 목요일에 수업이 있어요.' },
        { en: 'Friday', ko: '금요일', ipa: '/ˈfraɪdeɪ/', example: 'Let us meet on Friday.', exampleKo: '금요일에 만나요.' },
        { en: 'Saturday', ko: '토요일', ipa: '/ˈsætərdeɪ/', example: 'I rest on Saturday.', exampleKo: '나는 토요일에 쉬어요.' },
        { en: 'Sunday', ko: '일요일', ipa: '/ˈsʌndeɪ/', example: 'I visit my parents on Sunday.', exampleKo: '나는 일요일에 부모님을 방문해요.' },
        { en: 'weekend', ko: '주말', ipa: '/ˈwiːkend/', example: 'I am busy on the weekend.', exampleKo: '나는 주말에 바빠요.' },
      ]),
      grammar('6-1', 2, 'on + 요일', {
        point: 'on Monday / on the weekend',
        explanation:
          '요일 앞에는 on을 씁니다. 주말은 on the weekend 또는 on weekends로 말할 수 있어요.',
        examples: [
          { en: 'I work on Monday.', ko: '나는 월요일에 일해요.' },
          { en: 'I am free on Wednesday.', ko: '나는 수요일에 시간이 돼요.' },
          { en: 'Let us meet on Friday.', ko: '금요일에 만나요.' },
          { en: 'I rest on the weekend.', ko: '나는 주말에 쉬어요.' },
        ],
        tips: ['요일 이름은 항상 첫 글자를 대문자로 씁니다.'],
      }),
      build('6-1', 3, '요일 문장 조립', [
        { ko: '나는 월요일에 일해요.', answer: ['I', 'work', 'on', 'Monday'], bank: ['Monday', 'on', 'work', 'I'] },
        { ko: '나는 수요일에 시간이 돼요.', answer: ['I', 'am', 'free', 'on', 'Wednesday'], bank: ['Wednesday', 'on', 'free', 'am', 'I'] },
        { ko: '금요일에 만나요.', answer: ['Let', 'us', 'meet', 'on', 'Friday'], bank: ['Friday', 'on', 'meet', 'us', 'Let'] },
        { ko: '나는 주말에 쉬어요.', answer: ['I', 'rest', 'on', 'the', 'weekend'], bank: ['weekend', 'the', 'on', 'rest', 'I'] },
      ]),
      listening('6-1', 4, '듣고 요일 고르기', [
        { audioText: 'I work on Monday.', question: '언제 일하나요?', options: ['월요일', '수요일', '금요일'], answerIndex: 0 },
        { audioText: 'Let us meet on Friday.', question: '언제 만나나요?', options: ['금요일', '토요일', '일요일'], answerIndex: 0 },
        { audioText: 'I rest on the weekend.', question: '언제 쉬나요?', options: ['주말', '월요일', '목요일'], answerIndex: 0 },
      ]),
      speaking('6-1', 5, '요일 일정 말하기', [
        { en: 'I work on Monday.', ko: '나는 월요일에 일해요.' },
        { en: 'I am free on Wednesday.', ko: '나는 수요일에 시간이 돼요.' },
        { en: 'Let us meet on Friday.', ko: '금요일에 만나요.' },
        { en: 'I rest on the weekend.', ko: '나는 주말에 쉬어요.' },
      ]),
      conversation('6-1', 6, 'AI와 요일 일정', 'schedule-days', 'AI와 요일별 일정을 말하고 언제 시간이 되는지 확인해요.'),
      review('6-1', 7, '유닛 복습', [
        { prompt: '요일 앞에 쓰는 전치사는?', options: ['on', 'at', 'in'], answerIndex: 0 },
        { prompt: '"금요일에 만나요"는?', options: ['Let us meet on Friday', 'Let us meet at Friday', 'Let us meet in Friday'], answerIndex: 0 },
        { prompt: '"주말"은?', options: ['weekend', 'weekday', 'Wednesday'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-2',
    levelId: 6,
    order: 2,
    title: '시각 말하기',
    icon: '🕒',
    description: 'at seven thirty, around noon 처럼 시각 말하기',
    lessons: [
      vocab('6-2', 1, '시각 표현', [
        { en: 'o clock', ko: '정각', ipa: '/əˈklɑːk/', example: 'It is seven o clock.', exampleKo: '7시 정각이에요.' },
        { en: 'thirty', ko: '30분', ipa: '/ˈθɜːrti/', example: 'It is seven thirty.', exampleKo: '7시 30분이에요.' },
        { en: 'quarter', ko: '15분/4분의 1', ipa: '/ˈkwɔːrtər/', example: 'It is a quarter past seven.', exampleKo: '7시 15분이에요.' },
        { en: 'noon', ko: '정오', ipa: '/nuːn/', example: 'Let us meet at noon.', exampleKo: '정오에 만나요.' },
        { en: 'midnight', ko: '자정', ipa: '/ˈmɪdnaɪt/', example: 'I sleep before midnight.', exampleKo: '나는 자정 전에 자요.' },
        { en: 'around', ko: '쯤/약', ipa: '/əˈraʊnd/', example: 'I am free around six.', exampleKo: '나는 6시쯤 시간이 돼요.' },
        { en: 'half past', ko: '30분 지난', ipa: '/hæf pæst/', example: 'It is half past eight.', exampleKo: '8시 30분이에요.' },
        { en: 'sharp', ko: '정각에', ipa: '/ʃɑːrp/', example: 'Please come at nine sharp.', exampleKo: '9시 정각에 와주세요.' },
      ]),
      grammar('6-2', 2, 'at + 시각', {
        point: 'at seven / at noon / around six',
        explanation:
          '구체적인 시각 앞에는 at을 씁니다. 정확하지 않은 시간은 around를 붙여 말할 수 있어요.',
        examples: [
          { en: 'I wake up at seven.', ko: '나는 7시에 일어나요.' },
          { en: 'Let us meet at noon.', ko: '정오에 만나요.' },
          { en: 'I am free around six.', ko: '나는 6시쯤 시간이 돼요.' },
          { en: 'Please come at nine sharp.', ko: '9시 정각에 와주세요.' },
        ],
      }),
      build('6-2', 3, '시각 문장 조립', [
        { ko: '7시 30분이에요.', answer: ['It', 'is', 'seven', 'thirty'], bank: ['thirty', 'seven', 'is', 'It'] },
        { ko: '정오에 만나요.', answer: ['Let', 'us', 'meet', 'at', 'noon'], bank: ['noon', 'at', 'meet', 'us', 'Let'] },
        { ko: '나는 6시쯤 시간이 돼요.', answer: ['I', 'am', 'free', 'around', 'six'], bank: ['six', 'around', 'free', 'am', 'I'] },
        { ko: '9시 정각에 와주세요.', answer: ['Please', 'come', 'at', 'nine', 'sharp'], bank: ['sharp', 'nine', 'at', 'come', 'Please'] },
      ]),
      listening('6-2', 4, '듣고 시각 고르기', [
        { audioText: 'It is seven thirty.', question: '몇 시인가요?', options: ['7시 30분', '7시 정각', '8시 30분'], answerIndex: 0 },
        { audioText: 'Let us meet at noon.', question: '언제 만나나요?', options: ['정오', '자정', '6시'], answerIndex: 0 },
        { audioText: 'I am free around six.', question: '언제쯤 시간이 되나요?', options: ['6시쯤', '9시 정각', '정오'], answerIndex: 0 },
      ]),
      speaking('6-2', 5, '시각 따라 말하기', [
        { en: 'It is seven thirty.', ko: '7시 30분이에요.' },
        { en: 'Let us meet at noon.', ko: '정오에 만나요.' },
        { en: 'I am free around six.', ko: '나는 6시쯤 시간이 돼요.' },
        { en: 'Please come at nine sharp.', ko: '9시 정각에 와주세요.' },
      ]),
      conversation('6-2', 6, 'AI와 시간 확인', 'telling-time', 'AI와 현재 시각, 만날 시간, 정확한 시간을 확인해요.'),
      review('6-2', 7, '유닛 복습', [
        { prompt: '구체적인 시각 앞에는?', options: ['at', 'on', 'in'], answerIndex: 0 },
        { prompt: '"6시쯤"은?', options: ['around six', 'sharp six', 'noon six'], answerIndex: 0 },
        { prompt: '"정오"는?', options: ['noon', 'midnight', 'quarter'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-3',
    levelId: 6,
    order: 3,
    title: '하루 일정',
    icon: '📋',
    description: '하루 일정을 시간 순서대로 말하기',
    lessons: [
      vocab('6-3', 1, '일정 단어', [
        { en: 'schedule', ko: '일정', ipa: '/ˈskedʒuːl/', example: 'My schedule is full.', exampleKo: '내 일정이 꽉 찼어요.' },
        { en: 'class', ko: '수업', ipa: '/klæs/', example: 'I have class at ten.', exampleKo: '나는 10시에 수업이 있어요.' },
        { en: 'meeting', ko: '회의/모임', ipa: '/ˈmiːtɪŋ/', example: 'I have a meeting at two.', exampleKo: '나는 2시에 회의가 있어요.' },
        { en: 'appointment', ko: '예약/약속', ipa: '/əˈpɔɪntmənt/', example: 'I have an appointment today.', exampleKo: '나는 오늘 예약이 있어요.' },
        { en: 'break', ko: '휴식', ipa: '/breɪk/', example: 'I take a break at three.', exampleKo: '나는 3시에 쉬어요.' },
        { en: 'lunch break', ko: '점심시간', ipa: '/lʌntʃ breɪk/', example: 'My lunch break is at noon.', exampleKo: '내 점심시간은 정오예요.' },
        { en: 'finish', ko: '끝내다', ipa: '/ˈfɪnɪʃ/', example: 'I finish work at six.', exampleKo: '나는 6시에 일을 끝내요.' },
        { en: 'full', ko: '가득 찬', ipa: '/fʊl/', example: 'My day is full.', exampleKo: '내 하루 일정이 꽉 찼어요.' },
      ]),
      grammar('6-3', 2, 'have + 일정', {
        point: 'I have class at ten. / My schedule is full.',
        explanation:
          '수업, 회의, 예약 같은 일정은 have를 써서 말합니다. 일정이 많을 때는 My schedule is full이라고 표현합니다.',
        examples: [
          { en: 'I have class at ten.', ko: '나는 10시에 수업이 있어요.' },
          { en: 'I have a meeting at two.', ko: '나는 2시에 회의가 있어요.' },
          { en: 'My lunch break is at noon.', ko: '내 점심시간은 정오예요.' },
          { en: 'I finish work at six.', ko: '나는 6시에 일을 끝내요.' },
        ],
      }),
      build('6-3', 3, '일정 문장 조립', [
        { ko: '나는 10시에 수업이 있어요.', answer: ['I', 'have', 'class', 'at', 'ten'], bank: ['ten', 'at', 'class', 'have', 'I'] },
        { ko: '나는 2시에 회의가 있어요.', answer: ['I', 'have', 'a', 'meeting', 'at', 'two'], bank: ['two', 'at', 'meeting', 'a', 'have', 'I'] },
        { ko: '내 점심시간은 정오예요.', answer: ['My', 'lunch', 'break', 'is', 'at', 'noon'], bank: ['noon', 'at', 'is', 'break', 'lunch', 'My'] },
        { ko: '내 일정이 꽉 찼어요.', answer: ['My', 'schedule', 'is', 'full'], bank: ['full', 'is', 'schedule', 'My'] },
      ]),
      listening('6-3', 4, '듣고 일정 이해하기', [
        { audioText: 'I have class at ten.', question: '몇 시에 수업이 있나요?', options: ['10시', '2시', '정오'], answerIndex: 0 },
        { audioText: 'I have a meeting at two.', question: '몇 시에 회의가 있나요?', options: ['2시', '6시', '10시'], answerIndex: 0 },
        { audioText: 'My schedule is full.', question: '일정은 어떤가요?', options: ['꽉 참', '비어 있음', '취소됨'], answerIndex: 0 },
      ]),
      speaking('6-3', 5, '하루 일정 말하기', [
        { en: 'I have class at ten.', ko: '나는 10시에 수업이 있어요.' },
        { en: 'I have a meeting at two.', ko: '나는 2시에 회의가 있어요.' },
        { en: 'My lunch break is at noon.', ko: '내 점심시간은 정오예요.' },
        { en: 'I finish work at six.', ko: '나는 6시에 일을 끝내요.' },
      ]),
      conversation('6-3', 6, 'AI와 하루 일정', 'daily-schedule-a2', 'AI에게 오늘 일정과 가능한 시간을 순서대로 설명해요.'),
      review('6-3', 7, '유닛 복습', [
        { prompt: '"나는 회의가 있어요"는?', options: ['I have a meeting', 'I am a meeting', 'I do a meeting'], answerIndex: 0 },
        { prompt: '"일정"은?', options: ['schedule', 'station', 'receipt'], answerIndex: 0 },
        { prompt: '"내 일정이 꽉 찼어요"는?', options: ['My schedule is full', 'My schedule is free', 'My schedule is late'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-4',
    levelId: 6,
    order: 4,
    title: '얼마나 자주?',
    icon: '🔁',
    description: 'once/twice a week 와 빈도 질문 익히기',
    lessons: [
      vocab('6-4', 1, '빈도 표현', [
        { en: 'once', ko: '한 번', ipa: '/wʌns/', example: 'I exercise once a week.', exampleKo: '나는 일주일에 한 번 운동해요.' },
        { en: 'twice', ko: '두 번', ipa: '/twaɪs/', example: 'I call her twice a week.', exampleKo: '나는 일주일에 두 번 그녀에게 전화해요.' },
        { en: 'three times', ko: '세 번', ipa: '/θriː taɪmz/', example: 'I study three times a week.', exampleKo: '나는 일주일에 세 번 공부해요.' },
        { en: 'a week', ko: '일주일에', ipa: '/ə wiːk/', example: 'I go there once a week.', exampleKo: '나는 일주일에 한 번 거기에 가요.' },
        { en: 'a month', ko: '한 달에', ipa: '/ə mʌnθ/', example: 'I visit once a month.', exampleKo: '나는 한 달에 한 번 방문해요.' },
        { en: 'rarely', ko: '거의 ~않는', ipa: '/ˈrerli/', example: 'I rarely eat fast food.', exampleKo: '나는 패스트푸드를 거의 먹지 않아요.' },
        { en: 'almost always', ko: '거의 항상', ipa: '/ˈɔːlmoʊst ˈɔːlweɪz/', example: 'I almost always eat breakfast.', exampleKo: '나는 거의 항상 아침을 먹어요.' },
        { en: 'how often', ko: '얼마나 자주', ipa: '/haʊ ˈɔːfən/', example: 'How often do you exercise?', exampleKo: '얼마나 자주 운동하나요?' },
      ]),
      grammar('6-4', 2, 'How often 질문', {
        point: 'How often do you exercise? / Once a week.',
        explanation:
          '얼마나 자주 하는지 물을 때는 How often do you...?를 씁니다. 대답은 once a week, twice a month처럼 말할 수 있어요.',
        examples: [
          { en: 'How often do you exercise?', ko: '얼마나 자주 운동하나요?' },
          { en: 'I exercise once a week.', ko: '나는 일주일에 한 번 운동해요.' },
          { en: 'I study three times a week.', ko: '나는 일주일에 세 번 공부해요.' },
          { en: 'I rarely eat fast food.', ko: '나는 패스트푸드를 거의 먹지 않아요.' },
        ],
      }),
      build('6-4', 3, '빈도 문장 조립', [
        { ko: '얼마나 자주 운동하나요?', answer: ['How', 'often', 'do', 'you', 'exercise'], bank: ['exercise', 'you', 'do', 'often', 'How'] },
        { ko: '나는 일주일에 한 번 운동해요.', answer: ['I', 'exercise', 'once', 'a', 'week'], bank: ['week', 'a', 'once', 'exercise', 'I'] },
        { ko: '나는 일주일에 세 번 공부해요.', answer: ['I', 'study', 'three', 'times', 'a', 'week'], bank: ['week', 'a', 'times', 'three', 'study', 'I'] },
        { ko: '나는 패스트푸드를 거의 먹지 않아요.', answer: ['I', 'rarely', 'eat', 'fast', 'food'], bank: ['food', 'fast', 'eat', 'rarely', 'I'] },
      ]),
      listening('6-4', 4, '듣고 빈도 고르기', [
        { audioText: 'I exercise once a week.', question: '얼마나 자주 운동하나요?', options: ['일주일에 한 번', '한 달에 한 번', '매일'], answerIndex: 0 },
        { audioText: 'I study three times a week.', question: '얼마나 자주 공부하나요?', options: ['일주일에 세 번', '일주일에 두 번', '거의 안 함'], answerIndex: 0 },
        { audioText: 'I rarely eat fast food.', question: '패스트푸드를 얼마나 자주 먹나요?', options: ['거의 안 먹음', '매일', '항상'], answerIndex: 0 },
      ]),
      speaking('6-4', 5, '빈도 말하기', [
        { en: 'How often do you exercise?', ko: '얼마나 자주 운동하나요?' },
        { en: 'I exercise once a week.', ko: '나는 일주일에 한 번 운동해요.' },
        { en: 'I study three times a week.', ko: '나는 일주일에 세 번 공부해요.' },
        { en: 'I rarely eat fast food.', ko: '나는 패스트푸드를 거의 먹지 않아요.' },
      ]),
      conversation('6-4', 6, 'AI와 빈도 대화', 'frequency-a2', 'AI와 운동, 공부, 외식 빈도를 묻고 답해요.'),
      review('6-4', 7, '유닛 복습', [
        { prompt: '"얼마나 자주"는?', options: ['how often', 'how much', 'what time'], answerIndex: 0 },
        { prompt: '"일주일에 두 번"은?', options: ['twice a week', 'two week', 'second a week'], answerIndex: 0 },
        { prompt: '"거의 ~않는"은?', options: ['rarely', 'always', 'usually'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-5',
    levelId: 6,
    order: 5,
    title: '시간 전치사',
    icon: '🧩',
    description: 'at / on / in 을 시간 표현에 맞게 쓰기',
    lessons: [
      vocab('6-5', 1, '시간 덩어리', [
        { en: 'morning', ko: '아침', ipa: '/ˈmɔːrnɪŋ/', example: 'I study in the morning.', exampleKo: '나는 아침에 공부해요.' },
        { en: 'afternoon', ko: '오후', ipa: '/ˌæftərˈnuːn/', example: 'I work in the afternoon.', exampleKo: '나는 오후에 일해요.' },
        { en: 'evening', ko: '저녁', ipa: '/ˈiːvnɪŋ/', example: 'I walk in the evening.', exampleKo: '나는 저녁에 걸어요.' },
        { en: 'night', ko: '밤', ipa: '/naɪt/', example: 'I read at night.', exampleKo: '나는 밤에 책을 읽어요.' },
        { en: 'weekday', ko: '평일', ipa: '/ˈwiːkdeɪ/', example: 'I work on weekdays.', exampleKo: '나는 평일에 일해요.' },
        { en: 'month', ko: '달/월', ipa: '/mʌnθ/', example: 'My birthday is in May.', exampleKo: '내 생일은 5월이에요.' },
        { en: 'year', ko: '해/년', ipa: '/jɪr/', example: 'I started in 2026.', exampleKo: '나는 2026년에 시작했어요.' },
        { en: 'date', ko: '날짜', ipa: '/deɪt/', example: 'What is the date?', exampleKo: '날짜가 어떻게 되나요?' },
      ]),
      grammar('6-5', 2, 'at/on/in 시간', {
        point: 'at 7, on Monday, in the morning',
        explanation:
          '시각은 at, 요일/날짜는 on, 긴 시간대나 월/연도는 in을 씁니다. at night는 예외처럼 자주 쓰는 덩어리로 외우면 좋습니다.',
        examples: [
          { en: 'I wake up at seven.', ko: '나는 7시에 일어나요.' },
          { en: 'I work on Monday.', ko: '나는 월요일에 일해요.' },
          { en: 'I study in the morning.', ko: '나는 아침에 공부해요.' },
          { en: 'I read at night.', ko: '나는 밤에 책을 읽어요.' },
        ],
        tips: ['at/on/in은 뜻보다 함께 쓰는 시간 덩어리로 익히는 것이 빠릅니다.'],
      }),
      build('6-5', 3, '전치사 문장 조립', [
        { ko: '나는 7시에 일어나요.', answer: ['I', 'wake', 'up', 'at', 'seven'], bank: ['seven', 'at', 'up', 'wake', 'I'] },
        { ko: '나는 월요일에 일해요.', answer: ['I', 'work', 'on', 'Monday'], bank: ['Monday', 'on', 'work', 'I'] },
        { ko: '나는 아침에 공부해요.', answer: ['I', 'study', 'in', 'the', 'morning'], bank: ['morning', 'the', 'in', 'study', 'I'] },
        { ko: '나는 밤에 책을 읽어요.', answer: ['I', 'read', 'at', 'night'], bank: ['night', 'at', 'read', 'I'] },
      ]),
      listening('6-5', 4, '듣고 전치사 고르기', [
        { audioText: 'I wake up at seven.', question: '시각 앞 전치사는?', options: ['at', 'on', 'in'], answerIndex: 0 },
        { audioText: 'I work on Monday.', question: '요일 앞 전치사는?', options: ['on', 'at', 'in'], answerIndex: 0 },
        { audioText: 'I study in the morning.', question: '아침 앞 전치사는?', options: ['in', 'on', 'to'], answerIndex: 0 },
      ]),
      speaking('6-5', 5, '시간 전치사 따라 말하기', [
        { en: 'I wake up at seven.', ko: '나는 7시에 일어나요.' },
        { en: 'I work on Monday.', ko: '나는 월요일에 일해요.' },
        { en: 'I study in the morning.', ko: '나는 아침에 공부해요.' },
        { en: 'I read at night.', ko: '나는 밤에 책을 읽어요.' },
      ]),
      conversation('6-5', 6, 'AI와 시간 전치사', 'time-prepositions', 'AI와 시각, 요일, 시간대를 섞어 일정을 말해요.'),
      review('6-5', 7, '유닛 복습', [
        { prompt: '시각 앞에는?', options: ['at', 'on', 'in'], answerIndex: 0 },
        { prompt: '요일 앞에는?', options: ['on', 'at', 'in'], answerIndex: 0 },
        { prompt: 'in the ___', options: ['morning', 'Monday', 'seven'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-6',
    levelId: 6,
    order: 6,
    title: '초대하기',
    icon: '🎟️',
    description: 'Would you like to / Do you want to 로 제안하기',
    lessons: [
      vocab('6-6', 1, '초대와 제안 단어', [
        { en: 'invite', ko: '초대하다', ipa: '/ɪnˈvaɪt/', example: 'I want to invite you.', exampleKo: '당신을 초대하고 싶어요.' },
        { en: 'join', ko: '함께하다', ipa: '/dʒɔɪn/', example: 'Would you like to join us?', exampleKo: '우리와 함께할래요?' },
        { en: 'movie', ko: '영화', ipa: '/ˈmuːvi/', example: 'Do you want to see a movie?', exampleKo: '영화 보러 갈래요?' },
        { en: 'dinner', ko: '저녁 식사', ipa: '/ˈdɪnər/', example: 'Would you like to have dinner?', exampleKo: '저녁 먹을래요?' },
        { en: 'party', ko: '파티', ipa: '/ˈpɑːrti/', example: 'I have a party on Friday.', exampleKo: '나는 금요일에 파티가 있어요.' },
        { en: 'plan', ko: '계획', ipa: '/plæn/', example: 'Do you have plans?', exampleKo: '계획이 있나요?' },
        { en: 'together', ko: '함께', ipa: '/təˈɡeðər/', example: 'Let us study together.', exampleKo: '함께 공부해요.' },
        { en: 'tonight', ko: '오늘 밤', ipa: '/təˈnaɪt/', example: 'Are you free tonight?', exampleKo: '오늘 밤 시간 되나요?' },
      ]),
      grammar('6-6', 2, 'Would you like to', {
        point: 'Would you like to join us? / Do you want to see a movie?',
        explanation:
          '상대를 초대하거나 제안할 때 Would you like to가 정중하고, Do you want to는 더 편한 표현입니다.',
        examples: [
          { en: 'Would you like to join us?', ko: '우리와 함께할래요?' },
          { en: 'Do you want to see a movie?', ko: '영화 보러 갈래요?' },
          { en: 'Are you free tonight?', ko: '오늘 밤 시간 되나요?' },
          { en: 'Let us have dinner together.', ko: '함께 저녁 먹어요.' },
        ],
      }),
      build('6-6', 3, '초대 문장 조립', [
        { ko: '우리와 함께할래요?', answer: ['Would', 'you', 'like', 'to', 'join', 'us'], bank: ['us', 'join', 'to', 'like', 'you', 'Would'] },
        { ko: '영화 보러 갈래요?', answer: ['Do', 'you', 'want', 'to', 'see', 'a', 'movie'], bank: ['movie', 'a', 'see', 'to', 'want', 'you', 'Do'] },
        { ko: '오늘 밤 시간 되나요?', answer: ['Are', 'you', 'free', 'tonight'], bank: ['tonight', 'free', 'you', 'Are'] },
        { ko: '함께 저녁 먹어요.', answer: ['Let', 'us', 'have', 'dinner', 'together'], bank: ['together', 'dinner', 'have', 'us', 'Let'] },
      ]),
      listening('6-6', 4, '듣고 초대 이해하기', [
        { audioText: 'Would you like to join us?', question: '무엇을 제안하나요?', options: ['함께하기', '결제하기', '길 안내'], answerIndex: 0 },
        { audioText: 'Do you want to see a movie?', question: '무엇을 하자고 하나요?', options: ['영화 보기', '수업 듣기', '전화하기'], answerIndex: 0 },
        { audioText: 'Are you free tonight?', question: '언제 시간이 되는지 묻나요?', options: ['오늘 밤', '내일 아침', '주말'], answerIndex: 0 },
      ]),
      speaking('6-6', 5, '초대 표현 말하기', [
        { en: 'Would you like to join us?', ko: '우리와 함께할래요?' },
        { en: 'Do you want to see a movie?', ko: '영화 보러 갈래요?' },
        { en: 'Are you free tonight?', ko: '오늘 밤 시간 되나요?' },
        { en: 'Let us have dinner together.', ko: '함께 저녁 먹어요.' },
      ]),
      conversation('6-6', 6, 'AI와 초대하기', 'making-invitations', 'AI를 영화, 저녁 식사, 모임에 자연스럽게 초대해요.'),
      review('6-6', 7, '유닛 복습', [
        { prompt: '정중한 초대 표현은?', options: ['Would you like to join us?', 'You join us now', 'Where join us?'], answerIndex: 0 },
        { prompt: '"오늘 밤"은?', options: ['tonight', 'tomorrow', 'noon'], answerIndex: 0 },
        { prompt: '"함께"는?', options: ['together', 'again', 'rarely'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-7',
    levelId: 6,
    order: 7,
    title: '수락과 거절',
    icon: '🤔',
    description: '초대에 좋다고 하거나 정중하게 거절하기',
    lessons: [
      vocab('6-7', 1, '수락/거절 표현', [
        { en: 'sure', ko: '물론', ipa: '/ʃʊr/', example: 'Sure, I would love to.', exampleKo: '물론이죠, 그러고 싶어요.' },
        { en: 'I would love to', ko: '그러고 싶어요', ipa: '/aɪ wʊd lʌv tu/', example: 'I would love to join.', exampleKo: '함께하고 싶어요.' },
        { en: 'sounds great', ko: '아주 좋아요', ipa: '/saʊndz ɡreɪt/', example: 'That sounds great.', exampleKo: '아주 좋아요.' },
        { en: 'sorry', ko: '미안해요', ipa: '/ˈsɑːri/', example: 'Sorry, I am busy.', exampleKo: '미안해요, 바빠요.' },
        { en: 'maybe next time', ko: '다음에요', ipa: '/ˈmeɪbi nekst taɪm/', example: 'Maybe next time.', exampleKo: '다음에요.' },
        { en: 'I cannot make it', ko: '갈 수 없어요', ipa: '/aɪ ˈkænɑːt meɪk ɪt/', example: 'I cannot make it today.', exampleKo: '오늘은 갈 수 없어요.' },
        { en: 'another time', ko: '다른 시간', ipa: '/əˈnʌðər taɪm/', example: 'How about another time?', exampleKo: '다른 시간은 어때요?' },
        { en: 'reason', ko: '이유', ipa: '/ˈriːzən/', example: 'What is the reason?', exampleKo: '이유가 무엇인가요?' },
      ]),
      grammar('6-7', 2, '정중한 수락과 거절', {
        point: 'I would love to. / Sorry, I cannot make it.',
        explanation:
          '초대를 수락할 때는 I would love to, Sounds great를 쓰고, 거절할 때는 Sorry를 먼저 붙이면 부드럽습니다.',
        examples: [
          { en: 'Sure, I would love to.', ko: '물론이죠, 그러고 싶어요.' },
          { en: 'That sounds great.', ko: '아주 좋아요.' },
          { en: 'Sorry, I am busy tonight.', ko: '미안해요, 오늘 밤은 바빠요.' },
          { en: 'Maybe next time.', ko: '다음에요.' },
        ],
      }),
      build('6-7', 3, '수락/거절 문장 조립', [
        { ko: '물론이죠, 그러고 싶어요.', answer: ['Sure', 'I', 'would', 'love', 'to'], bank: ['to', 'love', 'would', 'I', 'Sure'] },
        { ko: '아주 좋아요.', answer: ['That', 'sounds', 'great'], bank: ['great', 'sounds', 'That'] },
        { ko: '미안해요, 오늘 밤은 바빠요.', answer: ['Sorry', 'I', 'am', 'busy', 'tonight'], bank: ['tonight', 'busy', 'am', 'I', 'Sorry'] },
        { ko: '오늘은 갈 수 없어요.', answer: ['I', 'cannot', 'make', 'it', 'today'], bank: ['today', 'it', 'make', 'cannot', 'I'] },
      ]),
      listening('6-7', 4, '듣고 수락/거절 고르기', [
        { audioText: 'Sure, I would love to.', question: '초대를 수락하나요?', options: ['네', '아니요', '모름'], answerIndex: 0 },
        { audioText: 'Sorry, I am busy tonight.', question: '초대를 거절하나요?', options: ['네', '아니요', '수락'], answerIndex: 0 },
        { audioText: 'Maybe next time.', question: '언제 하자는 뜻인가요?', options: ['다음에', '지금', '정오에'], answerIndex: 0 },
      ]),
      speaking('6-7', 5, '수락/거절 말하기', [
        { en: 'Sure, I would love to.', ko: '물론이죠, 그러고 싶어요.' },
        { en: 'That sounds great.', ko: '아주 좋아요.' },
        { en: 'Sorry, I am busy tonight.', ko: '미안해요, 오늘 밤은 바빠요.' },
        { en: 'Maybe next time.', ko: '다음에요.' },
      ]),
      conversation('6-7', 6, 'AI와 수락/거절', 'accept-decline', 'AI의 초대에 수락하거나 정중하게 거절해요.'),
      review('6-7', 7, '유닛 복습', [
        { prompt: '"그러고 싶어요"는?', options: ['I would love to', 'I cannot make it', 'Maybe next time'], answerIndex: 0 },
        { prompt: '"오늘은 갈 수 없어요"는?', options: ['I cannot make it today', 'I can make today', 'I cannot do today'], answerIndex: 0 },
        { prompt: '"다음에요"는?', options: ['Maybe next time', 'Sure', 'Right now'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-8',
    levelId: 6,
    order: 8,
    title: '일정 변경하기',
    icon: '🔄',
    description: 'reschedule / cancel / move 로 약속 조정하기',
    lessons: [
      vocab('6-8', 1, '일정 변경 단어', [
        { en: 'reschedule', ko: '일정을 변경하다', ipa: '/ˌriːˈskedʒuːl/', example: 'Can we reschedule?', exampleKo: '일정을 변경할 수 있을까요?' },
        { en: 'cancel', ko: '취소하다', ipa: '/ˈkænsəl/', example: 'I need to cancel.', exampleKo: '취소해야 해요.' },
        { en: 'move', ko: '옮기다', ipa: '/muːv/', example: 'Can we move it to Friday?', exampleKo: '금요일로 옮길 수 있을까요?' },
        { en: 'change', ko: '바꾸다', ipa: '/tʃeɪndʒ/', example: 'Can we change the time?', exampleKo: '시간을 바꿀 수 있을까요?' },
        { en: 'available', ko: '시간이 되는', ipa: '/əˈveɪləbəl/', example: 'I am available on Friday.', exampleKo: '나는 금요일에 시간이 돼요.' },
        { en: 'something came up', ko: '일이 생겼어요', ipa: '/ˈsʌmθɪŋ keɪm ʌp/', example: 'Something came up.', exampleKo: '일이 생겼어요.' },
        { en: 'instead', ko: '대신에', ipa: '/ɪnˈsted/', example: 'Can we meet at six instead?', exampleKo: '대신 6시에 만날 수 있을까요?' },
        { en: 'still', ko: '아직/여전히', ipa: '/stɪl/', example: 'Are we still meeting today?', exampleKo: '우리 오늘 아직 만나는 거죠?' },
      ]),
      grammar('6-8', 2, '일정 조정 표현', {
        point: 'Can we reschedule? / Can we move it to Friday?',
        explanation:
          '약속을 바꾸고 싶을 때는 Can we reschedule?이 가장 간단합니다. 특정 날짜나 시간으로 옮길 때는 move it to를 씁니다.',
        examples: [
          { en: 'Can we reschedule?', ko: '일정을 변경할 수 있을까요?' },
          { en: 'Something came up.', ko: '일이 생겼어요.' },
          { en: 'Can we move it to Friday?', ko: '금요일로 옮길 수 있을까요?' },
          { en: 'Are we still meeting today?', ko: '우리 오늘 아직 만나는 거죠?' },
        ],
      }),
      build('6-8', 3, '일정 변경 문장 조립', [
        { ko: '일정을 변경할 수 있을까요?', answer: ['Can', 'we', 'reschedule'], bank: ['reschedule', 'we', 'Can'] },
        { ko: '일이 생겼어요.', answer: ['Something', 'came', 'up'], bank: ['up', 'came', 'Something'] },
        { ko: '금요일로 옮길 수 있을까요?', answer: ['Can', 'we', 'move', 'it', 'to', 'Friday'], bank: ['Friday', 'to', 'it', 'move', 'we', 'Can'] },
        { ko: '대신 6시에 만날 수 있을까요?', answer: ['Can', 'we', 'meet', 'at', 'six', 'instead'], bank: ['instead', 'six', 'at', 'meet', 'we', 'Can'] },
      ]),
      listening('6-8', 4, '듣고 일정 변경 이해하기', [
        { audioText: 'Can we reschedule?', question: '무엇을 요청하나요?', options: ['일정 변경', '계산', '길 안내'], answerIndex: 0 },
        { audioText: 'Something came up.', question: '무슨 뜻인가요?', options: ['일이 생김', '시간이 남음', '도착함'], answerIndex: 0 },
        { audioText: 'Can we move it to Friday?', question: '언제로 옮기나요?', options: ['금요일', '월요일', '오늘'], answerIndex: 0 },
      ]),
      speaking('6-8', 5, '일정 변경 말하기', [
        { en: 'Can we reschedule?', ko: '일정을 변경할 수 있을까요?' },
        { en: 'Something came up.', ko: '일이 생겼어요.' },
        { en: 'Can we move it to Friday?', ko: '금요일로 옮길 수 있을까요?' },
        { en: 'Are we still meeting today?', ko: '우리 오늘 아직 만나는 거죠?' },
      ]),
      conversation('6-8', 6, 'AI와 일정 변경', 'reschedule-plans', 'AI와 약속을 취소하거나 다른 시간으로 바꿔요.'),
      review('6-8', 7, '유닛 복습', [
        { prompt: '"일정을 변경하다"는?', options: ['reschedule', 'receipt', 'rarely'], answerIndex: 0 },
        { prompt: '"일이 생겼어요"는?', options: ['Something came up', 'Something went down', 'Something is free'], answerIndex: 0 },
        { prompt: 'Can we move it ___ Friday?', options: ['to', 'at', 'in'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-9',
    levelId: 6,
    order: 9,
    title: '교통 시간표',
    icon: '🚌',
    description: '버스와 기차 시간, 도착/출발 시간 묻기',
    lessons: [
      vocab('6-9', 1, '교통 시간 단어', [
        { en: 'bus', ko: '버스', ipa: '/bʌs/', example: 'The bus leaves at eight.', exampleKo: '버스는 8시에 출발해요.' },
        { en: 'train', ko: '기차', ipa: '/treɪn/', example: 'The train arrives at nine.', exampleKo: '기차는 9시에 도착해요.' },
        { en: 'leave', ko: '출발하다', ipa: '/liːv/', example: 'What time does it leave?', exampleKo: '몇 시에 출발하나요?' },
        { en: 'arrive', ko: '도착하다', ipa: '/əˈraɪv/', example: 'What time does it arrive?', exampleKo: '몇 시에 도착하나요?' },
        { en: 'platform', ko: '승강장', ipa: '/ˈplætfɔːrm/', example: 'Which platform?', exampleKo: '몇 번 승강장인가요?' },
        { en: 'ticket', ko: '표', ipa: '/ˈtɪkɪt/', example: 'I need a ticket.', exampleKo: '표가 필요해요.' },
        { en: 'delay', ko: '지연', ipa: '/dɪˈleɪ/', example: 'The train is delayed.', exampleKo: '기차가 지연됐어요.' },
        { en: 'next', ko: '다음', ipa: '/nekst/', example: 'When is the next bus?', exampleKo: '다음 버스는 언제인가요?' },
      ]),
      grammar('6-9', 2, 'What time does it leave?', {
        point: 'What time does the bus leave? / It leaves at eight.',
        explanation:
          '교통편의 출발/도착 시간을 물을 때는 What time does + 주어 + leave/arrive?를 씁니다. 대답은 It leaves at eight처럼 말해요.',
        examples: [
          { en: 'What time does the bus leave?', ko: '버스는 몇 시에 출발하나요?' },
          { en: 'It leaves at eight.', ko: '8시에 출발해요.' },
          { en: 'What time does the train arrive?', ko: '기차는 몇 시에 도착하나요?' },
          { en: 'The train is delayed.', ko: '기차가 지연됐어요.' },
        ],
      }),
      build('6-9', 3, '교통 시간 문장 조립', [
        { ko: '버스는 몇 시에 출발하나요?', answer: ['What', 'time', 'does', 'the', 'bus', 'leave'], bank: ['leave', 'bus', 'the', 'does', 'time', 'What'] },
        { ko: '8시에 출발해요.', answer: ['It', 'leaves', 'at', 'eight'], bank: ['eight', 'at', 'leaves', 'It'] },
        { ko: '기차는 9시에 도착해요.', answer: ['The', 'train', 'arrives', 'at', 'nine'], bank: ['nine', 'at', 'arrives', 'train', 'The'] },
        { ko: '다음 버스는 언제인가요?', answer: ['When', 'is', 'the', 'next', 'bus'], bank: ['bus', 'next', 'the', 'is', 'When'] },
      ]),
      listening('6-9', 4, '듣고 출발/도착 고르기', [
        { audioText: 'The bus leaves at eight.', question: '버스는 몇 시에 출발하나요?', options: ['8시', '9시', '정오'], answerIndex: 0 },
        { audioText: 'The train arrives at nine.', question: '기차는 몇 시에 도착하나요?', options: ['9시', '8시', '6시'], answerIndex: 0 },
        { audioText: 'The train is delayed.', question: '무슨 상황인가요?', options: ['기차 지연', '기차 도착', '표 구매'], answerIndex: 0 },
      ]),
      speaking('6-9', 5, '교통 시간 말하기', [
        { en: 'What time does the bus leave?', ko: '버스는 몇 시에 출발하나요?' },
        { en: 'It leaves at eight.', ko: '8시에 출발해요.' },
        { en: 'What time does the train arrive?', ko: '기차는 몇 시에 도착하나요?' },
        { en: 'The train is delayed.', ko: '기차가 지연됐어요.' },
      ]),
      conversation('6-9', 6, 'AI와 교통 시간표', 'transport-schedule', 'AI에게 버스/기차 출발 시간과 도착 시간을 물어봐요.'),
      review('6-9', 7, '유닛 복습', [
        { prompt: '"출발하다"는?', options: ['leave', 'arrive', 'delay'], answerIndex: 0 },
        { prompt: '"도착하다"는?', options: ['arrive', 'leave', 'ticket'], answerIndex: 0 },
        { prompt: 'What time ___ the bus leave?', options: ['does', 'do', 'is'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-10',
    levelId: 6,
    order: 10,
    title: '집안일과 심부름',
    icon: '🧺',
    description: '해야 할 일과 심부름 일정을 말하기',
    lessons: [
      vocab('6-10', 1, '할 일 단어', [
        { en: 'chores', ko: '집안일', ipa: '/tʃɔːrz/', example: 'I do chores on Saturday.', exampleKo: '나는 토요일에 집안일을 해요.' },
        { en: 'laundry', ko: '빨래', ipa: '/ˈlɔːndri/', example: 'I do laundry on Sunday.', exampleKo: '나는 일요일에 빨래를 해요.' },
        { en: 'dishes', ko: '설거지', ipa: '/ˈdɪʃɪz/', example: 'I wash the dishes after dinner.', exampleKo: '나는 저녁 후에 설거지를 해요.' },
        { en: 'grocery shopping', ko: '장보기', ipa: '/ˈɡroʊsəri ˈʃɑːpɪŋ/', example: 'I go grocery shopping on Friday.', exampleKo: '나는 금요일에 장을 봐요.' },
        { en: 'errand', ko: '심부름', ipa: '/ˈerənd/', example: 'I have an errand today.', exampleKo: '나는 오늘 심부름이 있어요.' },
        { en: 'take out', ko: '내놓다/버리다', ipa: '/teɪk aʊt/', example: 'I take out the trash.', exampleKo: '나는 쓰레기를 내놓아요.' },
        { en: 'trash', ko: '쓰레기', ipa: '/træʃ/', example: 'Take out the trash, please.', exampleKo: '쓰레기를 내놓아 주세요.' },
        { en: 'before', ko: '~전에', ipa: '/bɪˈfɔːr/', example: 'I clean before dinner.', exampleKo: '나는 저녁 전에 청소해요.' },
      ]),
      grammar('6-10', 2, 'have to / need to', {
        point: 'I have to do laundry. / I need to run an errand.',
        explanation:
          '해야 할 일은 have to 또는 need to로 말합니다. 아주 강한 의무보다 일상적인 할 일을 표현할 때 자주 씁니다.',
        examples: [
          { en: 'I have to do laundry.', ko: '나는 빨래를 해야 해요.' },
          { en: 'I need to run an errand.', ko: '나는 심부름을 해야 해요.' },
          { en: 'I wash the dishes after dinner.', ko: '나는 저녁 후에 설거지를 해요.' },
          { en: 'I go grocery shopping on Friday.', ko: '나는 금요일에 장을 봐요.' },
        ],
      }),
      build('6-10', 3, '할 일 문장 조립', [
        { ko: '나는 빨래를 해야 해요.', answer: ['I', 'have', 'to', 'do', 'laundry'], bank: ['laundry', 'do', 'to', 'have', 'I'] },
        { ko: '나는 심부름을 해야 해요.', answer: ['I', 'need', 'to', 'run', 'an', 'errand'], bank: ['errand', 'an', 'run', 'to', 'need', 'I'] },
        { ko: '나는 저녁 후에 설거지를 해요.', answer: ['I', 'wash', 'the', 'dishes', 'after', 'dinner'], bank: ['dinner', 'after', 'dishes', 'the', 'wash', 'I'] },
        { ko: '쓰레기를 내놓아 주세요.', answer: ['Take', 'out', 'the', 'trash', 'please'], bank: ['please', 'trash', 'the', 'out', 'Take'] },
      ]),
      listening('6-10', 4, '듣고 할 일 고르기', [
        { audioText: 'I have to do laundry.', question: '무엇을 해야 하나요?', options: ['빨래', '장보기', '설거지'], answerIndex: 0 },
        { audioText: 'I need to run an errand.', question: '무엇을 해야 하나요?', options: ['심부름', '수업', '전화'], answerIndex: 0 },
        { audioText: 'Take out the trash, please.', question: '무엇을 부탁하나요?', options: ['쓰레기 내놓기', '빨래하기', '장보기'], answerIndex: 0 },
      ]),
      speaking('6-10', 5, '할 일 말하기', [
        { en: 'I have to do laundry.', ko: '나는 빨래를 해야 해요.' },
        { en: 'I need to run an errand.', ko: '나는 심부름을 해야 해요.' },
        { en: 'I wash the dishes after dinner.', ko: '나는 저녁 후에 설거지를 해요.' },
        { en: 'Take out the trash, please.', ko: '쓰레기를 내놓아 주세요.' },
      ]),
      conversation('6-10', 6, 'AI와 할 일 일정', 'chores-errands', 'AI와 집안일과 심부름을 언제 할지 정리해요.'),
      review('6-10', 7, '유닛 복습', [
        { prompt: '"빨래"는?', options: ['laundry', 'dishes', 'trash'], answerIndex: 0 },
        { prompt: '"나는 빨래를 해야 해요"는?', options: ['I have to do laundry', 'I have laundry do', 'I am laundry'], answerIndex: 0 },
        { prompt: '"심부름"은?', options: ['errand', 'appointment', 'platform'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-11',
    levelId: 6,
    order: 11,
    title: '날씨와 일정',
    icon: '🌦️',
    description: '날씨 때문에 계획을 바꾸거나 제안하기',
    lessons: [
      vocab('6-11', 1, '날씨와 계획 단어', [
        { en: 'weather', ko: '날씨', ipa: '/ˈweðər/', example: 'The weather is nice.', exampleKo: '날씨가 좋아요.' },
        { en: 'rainy', ko: '비 오는', ipa: '/ˈreɪni/', example: 'It is rainy today.', exampleKo: '오늘은 비가 와요.' },
        { en: 'sunny', ko: '맑은', ipa: '/ˈsʌni/', example: 'It is sunny this morning.', exampleKo: '오늘 아침은 맑아요.' },
        { en: 'cloudy', ko: '흐린', ipa: '/ˈklaʊdi/', example: 'It is cloudy now.', exampleKo: '지금 흐려요.' },
        { en: 'cold', ko: '추운', ipa: '/koʊld/', example: 'It is cold outside.', exampleKo: '밖이 추워요.' },
        { en: 'hot', ko: '더운', ipa: '/hɑːt/', example: 'It is hot today.', exampleKo: '오늘 더워요.' },
        { en: 'outside', ko: '밖에', ipa: '/ˌaʊtˈsaɪd/', example: 'Let us meet outside.', exampleKo: '밖에서 만나요.' },
        { en: 'inside', ko: '안에', ipa: '/ˌɪnˈsaɪd/', example: 'Let us stay inside.', exampleKo: '안에 있어요.' },
      ]),
      grammar('6-11', 2, '날씨와 제안', {
        point: 'It is rainy, so let us stay inside.',
        explanation:
          '날씨를 말할 때는 It is + 날씨 형용사를 씁니다. 이유와 제안을 연결할 때는 so를 사용합니다.',
        examples: [
          { en: 'It is rainy today.', ko: '오늘은 비가 와요.' },
          { en: 'It is sunny this morning.', ko: '오늘 아침은 맑아요.' },
          { en: 'It is cold outside.', ko: '밖이 추워요.' },
          { en: 'It is rainy, so let us stay inside.', ko: '비가 오니까 안에 있어요.' },
        ],
      }),
      build('6-11', 3, '날씨 문장 조립', [
        { ko: '오늘은 비가 와요.', answer: ['It', 'is', 'rainy', 'today'], bank: ['today', 'rainy', 'is', 'It'] },
        { ko: '밖이 추워요.', answer: ['It', 'is', 'cold', 'outside'], bank: ['outside', 'cold', 'is', 'It'] },
        { ko: '비가 오니까 안에 있어요.', answer: ['It', 'is', 'rainy', 'so', 'let', 'us', 'stay', 'inside'], bank: ['inside', 'stay', 'us', 'let', 'so', 'rainy', 'is', 'It'] },
        { ko: '밖에서 만나요.', answer: ['Let', 'us', 'meet', 'outside'], bank: ['outside', 'meet', 'us', 'Let'] },
      ]),
      listening('6-11', 4, '듣고 날씨 고르기', [
        { audioText: 'It is rainy today.', question: '오늘 날씨는?', options: ['비', '맑음', '흐림'], answerIndex: 0 },
        { audioText: 'It is cold outside.', question: '밖은 어떤가요?', options: ['추움', '더움', '따뜻함'], answerIndex: 0 },
        { audioText: 'It is rainy, so let us stay inside.', question: '어디에 있자고 하나요?', options: ['안', '밖', '역'], answerIndex: 0 },
      ]),
      speaking('6-11', 5, '날씨와 계획 말하기', [
        { en: 'It is rainy today.', ko: '오늘은 비가 와요.' },
        { en: 'It is sunny this morning.', ko: '오늘 아침은 맑아요.' },
        { en: 'It is cold outside.', ko: '밖이 추워요.' },
        { en: 'It is rainy, so let us stay inside.', ko: '비가 오니까 안에 있어요.' },
      ]),
      conversation('6-11', 6, 'AI와 날씨 계획', 'weather-plans-a2', 'AI와 날씨를 보고 약속 장소나 활동을 바꿔요.'),
      review('6-11', 7, '유닛 복습', [
        { prompt: '"비 오는"은?', options: ['rainy', 'sunny', 'cloudy'], answerIndex: 0 },
        { prompt: '"밖이 추워요"는?', options: ['It is cold outside', 'It is hot inside', 'It cold outside'], answerIndex: 0 },
        { prompt: '이유와 제안을 연결하는 말은?', options: ['so', 'whose', 'rarely'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-12',
    levelId: 6,
    order: 12,
    title: '주간 일정 대화',
    icon: '🗂️',
    description: '한 주 일정을 설명하고 약속을 조율하기',
    lessons: [
      vocab('6-12', 1, '주간 일정 표현', [
        { en: 'weekly', ko: '주간의', ipa: '/ˈwiːkli/', example: 'This is my weekly schedule.', exampleKo: '이것은 내 주간 일정이에요.' },
        { en: 'available', ko: '시간이 되는', ipa: '/əˈveɪləbəl/', example: 'I am available on Thursday.', exampleKo: '나는 목요일에 시간이 돼요.' },
        { en: 'fully booked', ko: '예약이 꽉 찬', ipa: '/ˈfʊli bʊkt/', example: 'I am fully booked on Monday.', exampleKo: '나는 월요일 일정이 꽉 찼어요.' },
        { en: 'flexible', ko: '융통성 있는', ipa: '/ˈfleksəbəl/', example: 'My schedule is flexible.', exampleKo: '내 일정은 조정 가능해요.' },
        { en: 'confirm', ko: '확인하다', ipa: '/kənˈfɜːrm/', example: 'Can you confirm the time?', exampleKo: '시간을 확인해줄 수 있나요?' },
        { en: 'update', ko: '업데이트/변경 사항', ipa: '/ˈʌpdeɪt/', example: 'Please send me an update.', exampleKo: '변경 사항을 보내주세요.' },
        { en: 'plan ahead', ko: '미리 계획하다', ipa: '/plæn əˈhed/', example: 'I like to plan ahead.', exampleKo: '나는 미리 계획하는 것을 좋아해요.' },
        { en: 'works for me', ko: '나에게 괜찮다', ipa: '/wɜːrks fɔːr mi/', example: 'Friday works for me.', exampleKo: '금요일은 괜찮아요.' },
      ]),
      grammar('6-12', 2, '일정 조율 문장', {
        point: 'Friday works for me. / Can you confirm the time?',
        explanation:
          '약속 조율에서는 works for me, available, fully booked 같은 표현이 매우 유용합니다. 시간을 확정할 때는 confirm을 씁니다.',
        examples: [
          { en: 'Thursday works for me.', ko: '목요일은 괜찮아요.' },
          { en: 'I am fully booked on Monday.', ko: '나는 월요일 일정이 꽉 찼어요.' },
          { en: 'My schedule is flexible.', ko: '내 일정은 조정 가능해요.' },
          { en: 'Can you confirm the time?', ko: '시간을 확인해줄 수 있나요?' },
        ],
      }),
      build('6-12', 3, '주간 일정 문장 조립', [
        { ko: '목요일은 괜찮아요.', answer: ['Thursday', 'works', 'for', 'me'], bank: ['me', 'for', 'works', 'Thursday'] },
        { ko: '나는 월요일 일정이 꽉 찼어요.', answer: ['I', 'am', 'fully', 'booked', 'on', 'Monday'], bank: ['Monday', 'on', 'booked', 'fully', 'am', 'I'] },
        { ko: '내 일정은 조정 가능해요.', answer: ['My', 'schedule', 'is', 'flexible'], bank: ['flexible', 'is', 'schedule', 'My'] },
        { ko: '시간을 확인해줄 수 있나요?', answer: ['Can', 'you', 'confirm', 'the', 'time'], bank: ['time', 'the', 'confirm', 'you', 'Can'] },
      ]),
      listening('6-12', 4, '듣고 일정 조율 이해하기', [
        { audioText: 'Thursday works for me.', question: '언제가 괜찮나요?', options: ['목요일', '월요일', '금요일'], answerIndex: 0 },
        { audioText: 'I am fully booked on Monday.', question: '월요일 일정은 어떤가요?', options: ['꽉 참', '비어 있음', '취소됨'], answerIndex: 0 },
        { audioText: 'Can you confirm the time?', question: '무엇을 확인하나요?', options: ['시간', '가격', '날씨'], answerIndex: 0 },
      ]),
      speaking('6-12', 5, '주간 일정 말하기', [
        { en: 'Thursday works for me.', ko: '목요일은 괜찮아요.' },
        { en: 'I am fully booked on Monday.', ko: '나는 월요일 일정이 꽉 찼어요.' },
        { en: 'My schedule is flexible.', ko: '내 일정은 조정 가능해요.' },
        { en: 'Can you confirm the time?', ko: '시간을 확인해줄 수 있나요?' },
      ]),
      conversation('6-12', 6, 'AI와 주간 일정 조율', 'weekly-schedule-talk', 'AI와 한 주 일정을 비교하며 가능한 약속 시간을 정해요.', 6),
      review('6-12', 7, '유닛 복습', [
        { prompt: '"목요일은 괜찮아요"는?', options: ['Thursday works for me', 'Thursday works me', 'Thursday is fully booked'], answerIndex: 0 },
        { prompt: '"일정이 꽉 찬"은?', options: ['fully booked', 'flexible', 'available'], answerIndex: 0 },
        { prompt: '"확인하다"는?', options: ['confirm', 'cancel', 'delay'], answerIndex: 0 },
      ]),
    ],
  },

  {
    id: '6-13',
    levelId: 6,
    order: 13,
    title: '복습 + 승급 테스트',
    icon: '🏁',
    description: 'Level 6 시간·요일·빈도·일정 조율 종합 복습',
    lessons: [
      review('6-13', 1, 'Level 6 종합 복습', [
        { prompt: 'I work ___ Monday.', options: ['on', 'at', 'in'], answerIndex: 0 },
        { prompt: 'I wake up ___ seven.', options: ['at', 'on', 'in'], answerIndex: 0 },
        { prompt: 'I study ___ the morning.', options: ['in', 'on', 'at'], answerIndex: 0 },
        { prompt: '"얼마나 자주 운동하나요?"는?', options: ['How often do you exercise?', 'How much do you exercise?', 'What time exercise?'], answerIndex: 0 },
        { prompt: '"일정을 변경할 수 있을까요?"는?', options: ['Can we reschedule?', 'Can we receipt?', 'Can we delay train?'], answerIndex: 0 },
        { prompt: '"버스는 몇 시에 출발하나요?"는?', options: ['What time does the bus leave?', 'What time do the bus leaves?', 'When bus leave?'], answerIndex: 0 },
        { prompt: '"목요일은 괜찮아요"는?', options: ['Thursday works for me', 'Thursday is full for me', 'Thursday works me'], answerIndex: 0 },
        { prompt: '"일이 생겼어요"는?', options: ['Something came up', 'Something is sharp', 'Something booked'], answerIndex: 0 },
      ]),
      conversation('6-13', 2, 'AI 종합 회화', 'level6-review-test', '시간, 요일, 빈도, 일정 변경, 교통 시간표를 섞어 생활 회화를 진행해요.', 7),
      {
        id: '6-13-3',
        unitId: '6-13',
        order: 3,
        type: 'test',
        title: 'Level 6 승급 테스트',
        xp: 110,
        content: {
          kind: 'test',
          passScore: 70,
          questions: [
            { prompt: 'Let us meet ___ Friday.', options: ['on', 'at', 'in'], answerIndex: 0 },
            { prompt: 'Please come ___ nine sharp.', options: ['at', 'on', 'in'], answerIndex: 0 },
            { prompt: 'I read ___ night.', options: ['at', 'on', 'in'], answerIndex: 0 },
            { prompt: 'I have a meeting ___ two.', options: ['at', 'on', 'in'], answerIndex: 0 },
            { prompt: 'How often ___ you exercise?', options: ['do', 'does', 'are'], answerIndex: 0 },
            { prompt: 'I exercise ___ a week.', options: ['once', 'one time in', 'first'], answerIndex: 0 },
            { prompt: 'Would you like ___ join us?', options: ['to', 'for', 'at'], answerIndex: 0 },
            { prompt: 'Sorry, I cannot ___ it today.', options: ['make', 'do', 'go'], answerIndex: 0 },
            { prompt: 'Can we move it ___ Friday?', options: ['to', 'at', 'on'], answerIndex: 0 },
            { prompt: 'What time does the train ___?', options: ['arrive', 'arrives', 'arriving'], answerIndex: 0 },
            { prompt: 'I have ___ do laundry.', options: ['to', 'for', 'at'], answerIndex: 0 },
            { prompt: 'It is rainy, ___ let us stay inside.', options: ['so', 'but', 'or'], answerIndex: 0 },
            { prompt: 'Can you ___ the time?', options: ['confirm', 'cancel', 'delay'], answerIndex: 0 },
            { prompt: 'My schedule is ___.', options: ['flexible', 'quarter', 'straight'], answerIndex: 0 },
            { prompt: '"다음 버스는 언제인가요?"는?', options: ['When is the next bus?', 'Where is the next bus?', 'How much is the next bus?'], answerIndex: 0 },
            { prompt: '"나는 월요일 일정이 꽉 찼어요"는?', options: ['I am fully booked on Monday', 'I am flexible on Monday', 'I book Monday fully'], answerIndex: 0 },
          ],
        },
      },
    ],
  },
];
