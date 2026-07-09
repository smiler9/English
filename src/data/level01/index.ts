import { Unit } from '../../types/curriculum';

/**
 * Level 1 (완전 왕초보 / CEFR A1) 실제 학습 콘텐츠.
 * 이 파일이 "20단계 구조는 미리, 콘텐츠는 Level 1부터"의 실체다.
 * 새 유닛/레슨은 여기에 객체를 추가하는 것만으로 늘어난다.
 */
export const LEVEL_1_UNITS: Unit[] = [
  // ── Unit 1-1 : 인사하기 ─────────────────────────────
  {
    id: '1-1',
    levelId: 1,
    order: 1,
    title: '인사하기',
    icon: '👋',
    description: '만나고 헤어질 때 쓰는 기본 인사',
    lessons: [
      {
        id: '1-1-1',
        unitId: '1-1',
        order: 1,
        type: 'vocab',
        title: '기본 인사 단어',
        xp: 10,
        content: {
          kind: 'vocab',
          words: [
            { en: 'hello', ko: '안녕(하세요)', ipa: '/həˈloʊ/', example: 'Hello, everyone!', exampleKo: '안녕하세요, 여러분!' },
            { en: 'hi', ko: '안녕 (친근)', ipa: '/haɪ/', example: 'Hi, Minsu!', exampleKo: '안녕, 민수야!' },
            { en: 'goodbye', ko: '안녕히 가세요', ipa: '/ˌɡʊdˈbaɪ/', example: 'Goodbye! See you.', exampleKo: '잘 가요! 또 봐요.' },
            { en: 'thank you', ko: '고맙습니다', ipa: '/ˈθæŋk juː/', example: 'Thank you very much.', exampleKo: '정말 고맙습니다.' },
            { en: 'sorry', ko: '미안해요', ipa: '/ˈsɑːri/', example: "Sorry, I'm late.", exampleKo: '미안해요, 늦었어요.' },
            { en: 'please', ko: '부탁해요 / 제발', ipa: '/pliːz/', example: 'Water, please.', exampleKo: '물 좀 주세요.' },
            { en: 'yes', ko: '네', ipa: '/jes/', example: 'Yes, I am.', exampleKo: '네, 맞아요.' },
            { en: 'no', ko: '아니요', ipa: '/noʊ/', example: 'No, thank you.', exampleKo: '아니요, 괜찮아요.' },
          ],
        },
      },
      {
        id: '1-1-2',
        unitId: '1-1',
        order: 2,
        type: 'grammar',
        title: '만나서 반가워요',
        xp: 10,
        content: {
          kind: 'grammar',
          point: 'Nice to meet you = 만나서 반가워요',
          explanation:
            '처음 만난 사람에게 쓰는 고정 인사입니다. 상대가 먼저 말하면 "Nice to meet you, too."(저도요)로 답해요.',
          examples: [
            { en: 'Nice to meet you.', ko: '만나서 반가워요.' },
            { en: 'Nice to meet you, too.', ko: '저도 만나서 반가워요.' },
            { en: 'How are you?', ko: '어떻게 지내요?' },
            { en: "I'm fine, thank you.", ko: '잘 지내요, 고마워요.' },
          ],
          tips: ['처음 만날 때만 "Nice to meet you"를 써요. 아는 사이엔 "Nice to see you".'],
        },
      },
      {
        id: '1-1-3',
        unitId: '1-1',
        order: 3,
        type: 'build',
        title: '인사 문장 조립',
        xp: 15,
        content: {
          kind: 'build',
          items: [
            { ko: '만나서 반가워요.', answer: ['Nice', 'to', 'meet', 'you'], bank: ['meet', 'Nice', 'you', 'to'] },
            { ko: '어떻게 지내요?', answer: ['How', 'are', 'you'], bank: ['you', 'How', 'are'] },
            { ko: '잘 지내요, 고마워요.', answer: ["I'm", 'fine', 'thank', 'you'], bank: ['thank', "I'm", 'you', 'fine'] },
          ],
        },
      },
      {
        id: '1-1-4',
        unitId: '1-1',
        order: 4,
        type: 'listening',
        title: '듣고 고르기',
        xp: 15,
        content: {
          kind: 'listening',
          items: [
            { audioText: 'Nice to meet you.', question: '무슨 뜻일까요?', options: ['만나서 반가워요', '안녕히 가세요', '고맙습니다'], answerIndex: 0 },
            { audioText: 'How are you?', question: '무슨 뜻일까요?', options: ['이름이 뭐예요?', '어떻게 지내요?', '몇 살이에요?'], answerIndex: 1 },
            { audioText: 'Thank you very much.', question: '무슨 뜻일까요?', options: ['미안해요', '정말 고맙습니다', '천만에요'], answerIndex: 1 },
          ],
        },
      },
      {
        id: '1-1-5',
        unitId: '1-1',
        order: 5,
        type: 'speaking',
        title: '따라 말하기',
        xp: 15,
        content: {
          kind: 'speaking',
          prompts: [
            { en: 'Hello!', ko: '안녕하세요!', ipa: '/həˈloʊ/' },
            { en: 'Nice to meet you.', ko: '만나서 반가워요.', ipa: '/naɪs tə miːt juː/' },
            { en: 'How are you?', ko: '어떻게 지내요?', ipa: '/haʊ ɑːr juː/' },
            { en: "I'm fine, thank you.", ko: '잘 지내요, 고마워요.', ipa: '/aɪm faɪn θæŋk juː/' },
          ],
        },
      },
      {
        id: '1-1-6',
        unitId: '1-1',
        order: 6,
        type: 'conversation',
        title: 'AI와 첫인사',
        xp: 25,
        content: {
          kind: 'conversation',
          scenarioId: 'greet-first-meeting',
          title: '처음 만난 사람과 인사하기',
          situation: 'AI 친구를 처음 만났어요. 인사하고 이름과 출신을 말해보세요.',
          goalTurns: 4,
        },
      },
      {
        id: '1-1-7',
        unitId: '1-1',
        order: 7,
        type: 'review',
        title: '유닛 복습',
        xp: 20,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"만나서 반가워요"를 영어로?', options: ['Nice to meet you', 'See you later', 'Thank you'], answerIndex: 0 },
            { prompt: '"How are you?"의 뜻은?', options: ['이름이 뭐예요?', '어떻게 지내요?', '어디 살아요?'], answerIndex: 1 },
            { prompt: '고마움을 표현하는 말은?', options: ['Sorry', 'Please', 'Thank you'], answerIndex: 2 },
          ],
        },
      },
    ],
  },

  // ── Unit 1-2 : 자기소개 ─────────────────────────────
  {
    id: '1-2',
    levelId: 1,
    order: 2,
    title: '자기소개',
    icon: '🙋',
    description: 'be동사로 이름과 출신 말하기',
    lessons: [
      {
        id: '1-2-1',
        unitId: '1-2',
        order: 1,
        type: 'vocab',
        title: '자기소개 단어',
        xp: 10,
        content: {
          kind: 'vocab',
          words: [
            { en: 'I', ko: '나는', ipa: '/aɪ/', example: 'I am Minsu.', exampleKo: '나는 민수예요.' },
            { en: 'you', ko: '너는', ipa: '/juː/', example: 'You are kind.', exampleKo: '너는 친절해.' },
            { en: 'name', ko: '이름', ipa: '/neɪm/', example: 'My name is Anna.', exampleKo: '내 이름은 안나야.' },
            { en: 'from', ko: '~에서 온', ipa: '/frʌm/', example: "I'm from Korea.", exampleKo: '나는 한국에서 왔어.' },
            { en: 'Korea', ko: '한국', ipa: '/kəˈriːə/', example: 'Korea is beautiful.', exampleKo: '한국은 아름다워.' },
            { en: 'this', ko: '이것 / 이 사람', ipa: '/ðɪs/', example: 'This is my friend.', exampleKo: '이 사람은 내 친구야.' },
            { en: 'friend', ko: '친구', ipa: '/frend/', example: 'You are my friend.', exampleKo: '너는 내 친구야.' },
          ],
        },
      },
      {
        id: '1-2-2',
        unitId: '1-2',
        order: 2,
        type: 'grammar',
        title: 'I am / You are',
        xp: 15,
        content: {
          kind: 'grammar',
          point: 'I am ~ (나는 ~이다), You are ~ (너는 ~이다)',
          explanation:
            '"이다/있다"를 뜻하는 be동사입니다. I엔 am, you엔 are를 씁니다. I am은 I\'m, You are는 You\'re로 줄여 써요.',
          examples: [
            { en: 'I am Minsu.', ko: '나는 민수예요.' },
            { en: "I'm from Korea.", ko: '나는 한국에서 왔어요.' },
            { en: 'You are my friend.', ko: '너는 내 친구야.' },
            { en: "You're kind.", ko: '너는 친절해.' },
          ],
          tips: ["I am → I'm, You are → You're 처럼 줄임말이 더 자연스러워요."],
        },
      },
      {
        id: '1-2-3',
        unitId: '1-2',
        order: 3,
        type: 'build',
        title: '자기소개 조립',
        xp: 15,
        content: {
          kind: 'build',
          items: [
            { ko: '나는 민수예요.', answer: ['I', 'am', 'Minsu'], bank: ['Minsu', 'am', 'I'] },
            { ko: '나는 한국에서 왔어요.', answer: ["I'm", 'from', 'Korea'], bank: ['Korea', "I'm", 'from'] },
            { ko: '너는 내 친구야.', answer: ['You', 'are', 'my', 'friend'], bank: ['friend', 'are', 'my', 'You'] },
          ],
        },
      },
      {
        id: '1-2-4',
        unitId: '1-2',
        order: 4,
        type: 'listening',
        title: '듣고 고르기',
        xp: 15,
        content: {
          kind: 'listening',
          items: [
            { audioText: "I'm from Korea.", question: '어디에서 왔나요?', options: ['일본', '한국', '중국'], answerIndex: 1 },
            { audioText: 'My name is Anna.', question: '이름이 무엇인가요?', options: ['Anna', 'Emma', 'Minsu'], answerIndex: 0 },
          ],
        },
      },
      {
        id: '1-2-5',
        unitId: '1-2',
        order: 5,
        type: 'review',
        title: '유닛 복습',
        xp: 20,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"나는 한국에서 왔어요"를 영어로?', options: ["I'm from Korea", 'You are Korea', 'I am Japan'], answerIndex: 0 },
            { prompt: 'I 뒤에 오는 be동사는?', options: ['are', 'is', 'am'], answerIndex: 2 },
          ],
        },
      },
    ],
  },

  // ── Unit 1-3 : 숫자와 나이 ──────────────────────────
  {
    id: '1-3',
    levelId: 1,
    order: 3,
    title: '숫자와 나이',
    icon: '🔢',
    description: '1~10 숫자와 나이 말하기',
    lessons: [
      {
        id: '1-3-1',
        unitId: '1-3',
        order: 1,
        type: 'vocab',
        title: '숫자 1~10',
        xp: 10,
        content: {
          kind: 'vocab',
          words: [
            { en: 'one', ko: '1', ipa: '/wʌn/', example: 'I have one dog.', exampleKo: '나는 개 한 마리가 있어.' },
            { en: 'two', ko: '2', ipa: '/tuː/', example: 'Two coffees, please.', exampleKo: '커피 두 잔 주세요.' },
            { en: 'three', ko: '3', ipa: '/θriː/', example: 'Three books.', exampleKo: '책 세 권.' },
            { en: 'four', ko: '4', ipa: '/fɔːr/', example: 'Four seasons.', exampleKo: '사계절.' },
            { en: 'five', ko: '5', ipa: '/faɪv/', example: 'Five minutes.', exampleKo: '5분.' },
            { en: 'six', ko: '6', ipa: '/sɪks/', example: 'Six apples.', exampleKo: '사과 여섯 개.' },
            { en: 'seven', ko: '7', ipa: '/ˈsevən/', example: 'Seven days.', exampleKo: '7일.' },
            { en: 'eight', ko: '8', ipa: '/eɪt/', example: 'Eight students.', exampleKo: '학생 여덟 명.' },
            { en: 'nine', ko: '9', ipa: '/naɪn/', example: 'Nine hours.', exampleKo: '9시간.' },
            { en: 'ten', ko: '10', ipa: '/ten/', example: 'Ten dollars.', exampleKo: '10달러.' },
            { en: 'twenty', ko: '20', ipa: '/ˈtwenti/', example: "I'm twenty.", exampleKo: '나는 스무 살이야.' },
          ],
        },
      },
      {
        id: '1-3-2',
        unitId: '1-3',
        order: 2,
        type: 'grammar',
        title: '나이 말하기',
        xp: 15,
        content: {
          kind: 'grammar',
          point: "I'm + 숫자 + years old = 나는 ~살이에요",
          explanation:
            '나이는 be동사로 말합니다. "years old"는 생략할 수도 있어요. (I\'m 20.)',
          examples: [
            { en: "I'm twenty years old.", ko: '나는 스무 살이에요.' },
            { en: "I'm 20.", ko: '나는 스무 살이에요. (짧게)' },
            { en: 'How old are you?', ko: '몇 살이에요?' },
          ],
        },
      },
      {
        id: '1-3-3',
        unitId: '1-3',
        order: 3,
        type: 'build',
        title: '나이 문장 조립',
        xp: 15,
        content: {
          kind: 'build',
          items: [
            { ko: '나는 스무 살이에요.', answer: ["I'm", 'twenty', 'years', 'old'], bank: ['old', 'twenty', "I'm", 'years'] },
            { ko: '몇 살이에요?', answer: ['How', 'old', 'are', 'you'], bank: ['are', 'How', 'you', 'old'] },
          ],
        },
      },
      {
        id: '1-3-4',
        unitId: '1-3',
        order: 4,
        type: 'review',
        title: '유닛 복습',
        xp: 20,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"몇 살이에요?"를 영어로?', options: ['How are you?', 'How old are you?', 'Who are you?'], answerIndex: 1 },
            { prompt: '숫자 "three"는?', options: ['2', '3', '4'], answerIndex: 1 },
          ],
        },
      },
    ],
  },

  // ── Unit 1-4 : 좋아하는 것 말하기 ────────────────────
  {
    id: '1-4',
    levelId: 1,
    order: 4,
    title: '좋아하는 것',
    icon: '❤️',
    description: 'I like ~ 로 좋아하는 것 말하기',
    lessons: [
      {
        id: '1-4-1',
        unitId: '1-4',
        order: 1,
        type: 'vocab',
        title: '좋아하는 것 단어',
        xp: 10,
        content: {
          kind: 'vocab',
          words: [
            { en: 'like', ko: '좋아하다', ipa: '/laɪk/', example: 'I like coffee.', exampleKo: '나는 커피를 좋아해.' },
            { en: 'coffee', ko: '커피', ipa: '/ˈkɔːfi/', example: 'I like coffee.', exampleKo: '나는 커피를 좋아해.' },
            { en: 'music', ko: '음악', ipa: '/ˈmjuːzɪk/', example: 'I like music.', exampleKo: '나는 음악을 좋아해.' },
            { en: 'soccer', ko: '축구', ipa: '/ˈsɑːkər/', example: 'I like soccer.', exampleKo: '나는 축구를 좋아해.' },
            { en: 'dog', ko: '개', ipa: '/dɔːɡ/', example: 'I like dogs.', exampleKo: '나는 개를 좋아해.' },
            { en: 'food', ko: '음식', ipa: '/fuːd/', example: 'I like Korean food.', exampleKo: '나는 한국 음식을 좋아해.' },
          ],
        },
      },
      {
        id: '1-4-2',
        unitId: '1-4',
        order: 2,
        type: 'grammar',
        title: 'I like ~',
        xp: 15,
        content: {
          kind: 'grammar',
          point: 'I like + 좋아하는 것',
          explanation:
            '"나는 ~를 좋아해"는 I like 뒤에 대상을 붙입니다. 싫어할 땐 I don\'t like ~.',
          examples: [
            { en: 'I like music.', ko: '나는 음악을 좋아해.' },
            { en: "I don't like coffee.", ko: '나는 커피를 안 좋아해.' },
            { en: 'Do you like soccer?', ko: '축구 좋아해?' },
          ],
        },
      },
      {
        id: '1-4-3',
        unitId: '1-4',
        order: 3,
        type: 'build',
        title: '좋아하는 것 조립',
        xp: 15,
        content: {
          kind: 'build',
          items: [
            { ko: '나는 음악을 좋아해.', answer: ['I', 'like', 'music'], bank: ['music', 'I', 'like'] },
            { ko: '나는 커피를 안 좋아해.', answer: ['I', "don't", 'like', 'coffee'], bank: ['coffee', 'like', 'I', "don't"] },
          ],
        },
      },
      {
        id: '1-4-4',
        unitId: '1-4',
        order: 4,
        type: 'review',
        title: '유닛 복습',
        xp: 20,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"나는 축구를 좋아해"를 영어로?', options: ['I like soccer', 'I am soccer', "I don't soccer"], answerIndex: 0 },
            { prompt: '"좋아하지 않는다"의 표현은?', options: ['I like', "I don't like", 'I am like'], answerIndex: 1 },
          ],
        },
      },
    ],
  },

  // ── Unit 1-6 : 물건 말하기 ───────────────────────────
  {
    id: '1-6',
    levelId: 1,
    order: 5,
    title: '물건 말하기',
    icon: '📎',
    description: 'this is / a / an 으로 주변 물건 말하기',
    lessons: [
      {
        id: '1-6-1',
        unitId: '1-6',
        order: 1,
        type: 'vocab',
        title: '주변 물건 단어',
        xp: 10,
        content: {
          kind: 'vocab',
          words: [
            { en: 'book', ko: '책', ipa: '/bʊk/', example: 'This is a book.', exampleKo: '이것은 책이에요.' },
            { en: 'pen', ko: '펜', ipa: '/pen/', example: 'This is a pen.', exampleKo: '이것은 펜이에요.' },
            { en: 'bag', ko: '가방', ipa: '/bæɡ/', example: 'My bag is blue.', exampleKo: '내 가방은 파란색이에요.' },
            { en: 'phone', ko: '휴대폰', ipa: '/foʊn/', example: 'This is my phone.', exampleKo: '이것은 내 휴대폰이에요.' },
            { en: 'desk', ko: '책상', ipa: '/desk/', example: 'It is on the desk.', exampleKo: '그것은 책상 위에 있어요.' },
            { en: 'chair', ko: '의자', ipa: '/tʃer/', example: 'This is a chair.', exampleKo: '이것은 의자예요.' },
            { en: 'apple', ko: '사과', ipa: '/ˈæpəl/', example: 'This is an apple.', exampleKo: '이것은 사과예요.' },
            { en: 'umbrella', ko: '우산', ipa: '/ʌmˈbrelə/', example: 'This is an umbrella.', exampleKo: '이것은 우산이에요.' },
          ],
        },
      },
      {
        id: '1-6-2',
        unitId: '1-6',
        order: 2,
        type: 'grammar',
        title: 'This is a/an',
        xp: 15,
        content: {
          kind: 'grammar',
          point: 'This is + a/an + 명사 = 이것은 ~예요',
          explanation:
            '하나의 물건을 소개할 때 "This is a book."처럼 말합니다. 소리가 a/e/i/o/u로 시작하면 an을 써요.',
          examples: [
            { en: 'This is a book.', ko: '이것은 책이에요.' },
            { en: 'This is a pen.', ko: '이것은 펜이에요.' },
            { en: 'This is an apple.', ko: '이것은 사과예요.' },
            { en: 'This is my phone.', ko: '이것은 내 휴대폰이에요.' },
          ],
          tips: ['a/an은 "하나의"라는 느낌이에요.', '철자가 아니라 발음이 모음 소리인지가 중요해요.'],
        },
      },
      {
        id: '1-6-3',
        unitId: '1-6',
        order: 3,
        type: 'build',
        title: '물건 문장 조립',
        xp: 15,
        content: {
          kind: 'build',
          items: [
            { ko: '이것은 책이에요.', answer: ['This', 'is', 'a', 'book'], bank: ['book', 'This', 'a', 'is'] },
            { ko: '이것은 사과예요.', answer: ['This', 'is', 'an', 'apple'], bank: ['apple', 'is', 'This', 'an'] },
            { ko: '이것은 내 휴대폰이에요.', answer: ['This', 'is', 'my', 'phone'], bank: ['phone', 'my', 'This', 'is'] },
          ],
        },
      },
      {
        id: '1-6-4',
        unitId: '1-6',
        order: 4,
        type: 'listening',
        title: '듣고 물건 고르기',
        xp: 15,
        content: {
          kind: 'listening',
          items: [
            { audioText: 'This is a book.', question: '무엇인가요?', options: ['책', '가방', '펜'], answerIndex: 0 },
            { audioText: 'This is an apple.', question: '무엇인가요?', options: ['우산', '사과', '휴대폰'], answerIndex: 1 },
            { audioText: 'This is my phone.', question: '무엇인가요?', options: ['내 휴대폰', '내 책상', '내 의자'], answerIndex: 0 },
          ],
        },
      },
      {
        id: '1-6-5',
        unitId: '1-6',
        order: 5,
        type: 'speaking',
        title: '물건 소개하기',
        xp: 15,
        content: {
          kind: 'speaking',
          prompts: [
            { en: 'This is a pen.', ko: '이것은 펜이에요.' },
            { en: 'This is an apple.', ko: '이것은 사과예요.' },
            { en: 'This is my bag.', ko: '이것은 내 가방이에요.' },
            { en: 'This is my phone.', ko: '이것은 내 휴대폰이에요.' },
          ],
        },
      },
      {
        id: '1-6-6',
        unitId: '1-6',
        order: 6,
        type: 'conversation',
        title: 'AI와 물건 소개',
        xp: 25,
        content: {
          kind: 'conversation',
          scenarioId: 'classroom-objects',
          title: '교실에서 물건 소개하기',
          situation: '책상 위 물건을 AI 선생님에게 영어로 소개해요.',
          goalTurns: 4,
        },
      },
      {
        id: '1-6-7',
        unitId: '1-6',
        order: 7,
        type: 'review',
        title: '유닛 복습',
        xp: 20,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"이것은 펜이에요"를 영어로?', options: ['This is a pen', 'This are pen', 'It pen'], answerIndex: 0 },
            { prompt: 'apple 앞에 자연스러운 관사는?', options: ['a', 'an', 'the only'], answerIndex: 1 },
            { prompt: '"내 휴대폰"은?', options: ['my phone', 'you phone', 'me phone'], answerIndex: 0 },
          ],
        },
      },
    ],
  },

  // ── Unit 1-7 : 위치 말하기 ───────────────────────────
  {
    id: '1-7',
    levelId: 1,
    order: 6,
    title: '위치 말하기',
    icon: '📍',
    description: 'in / on / under 로 위치 설명하기',
    lessons: [
      {
        id: '1-7-1',
        unitId: '1-7',
        order: 1,
        type: 'vocab',
        title: '위치와 장소 단어',
        xp: 10,
        content: {
          kind: 'vocab',
          words: [
            { en: 'in', ko: '~안에', ipa: '/ɪn/', example: 'It is in the bag.', exampleKo: '그것은 가방 안에 있어요.' },
            { en: 'on', ko: '~위에', ipa: '/ɑːn/', example: 'It is on the desk.', exampleKo: '그것은 책상 위에 있어요.' },
            { en: 'under', ko: '~아래에', ipa: '/ˈʌndər/', example: 'It is under the chair.', exampleKo: '그것은 의자 아래에 있어요.' },
            { en: 'here', ko: '여기', ipa: '/hɪr/', example: 'I am here.', exampleKo: '나는 여기 있어요.' },
            { en: 'there', ko: '저기', ipa: '/ðer/', example: 'It is there.', exampleKo: '그것은 저기 있어요.' },
            { en: 'home', ko: '집', ipa: '/hoʊm/', example: 'I am at home.', exampleKo: '나는 집에 있어요.' },
            { en: 'school', ko: '학교', ipa: '/skuːl/', example: 'I am at school.', exampleKo: '나는 학교에 있어요.' },
            { en: 'where', ko: '어디', ipa: '/wer/', example: 'Where is my bag?', exampleKo: '내 가방은 어디에 있어요?' },
          ],
        },
      },
      {
        id: '1-7-2',
        unitId: '1-7',
        order: 2,
        type: 'grammar',
        title: 'It is in/on/under',
        xp: 15,
        content: {
          kind: 'grammar',
          point: 'It is + 위치 = 그것은 ~에 있어요',
          explanation:
            '물건의 위치를 말할 때 It is 뒤에 in/on/under 같은 위치 표현을 붙입니다. 질문은 "Where is ~?"로 시작해요.',
          examples: [
            { en: 'It is in the bag.', ko: '그것은 가방 안에 있어요.' },
            { en: 'It is on the desk.', ko: '그것은 책상 위에 있어요.' },
            { en: 'It is under the chair.', ko: '그것은 의자 아래에 있어요.' },
            { en: 'Where is my book?', ko: '내 책은 어디에 있어요?' },
          ],
          tips: ['at home, at school처럼 장소에 있을 때 at을 자주 써요.'],
        },
      },
      {
        id: '1-7-3',
        unitId: '1-7',
        order: 3,
        type: 'build',
        title: '위치 문장 조립',
        xp: 15,
        content: {
          kind: 'build',
          items: [
            { ko: '그것은 가방 안에 있어요.', answer: ['It', 'is', 'in', 'the', 'bag'], bank: ['bag', 'is', 'the', 'It', 'in'] },
            { ko: '내 책은 어디에 있어요?', answer: ['Where', 'is', 'my', 'book'], bank: ['book', 'my', 'is', 'Where'] },
            { ko: '나는 학교에 있어요.', answer: ['I', 'am', 'at', 'school'], bank: ['school', 'I', 'at', 'am'] },
          ],
        },
      },
      {
        id: '1-7-4',
        unitId: '1-7',
        order: 4,
        type: 'listening',
        title: '듣고 위치 고르기',
        xp: 15,
        content: {
          kind: 'listening',
          items: [
            { audioText: 'It is on the desk.', question: '어디에 있나요?', options: ['책상 위', '가방 안', '의자 아래'], answerIndex: 0 },
            { audioText: 'It is under the chair.', question: '어디에 있나요?', options: ['책상 위', '의자 아래', '학교에'], answerIndex: 1 },
            { audioText: 'I am at home.', question: '어디에 있나요?', options: ['집에', '학교에', '저기에'], answerIndex: 0 },
          ],
        },
      },
      {
        id: '1-7-5',
        unitId: '1-7',
        order: 5,
        type: 'speaking',
        title: '위치 따라 말하기',
        xp: 15,
        content: {
          kind: 'speaking',
          prompts: [
            { en: 'It is in the bag.', ko: '그것은 가방 안에 있어요.' },
            { en: 'It is on the desk.', ko: '그것은 책상 위에 있어요.' },
            { en: 'Where is my book?', ko: '내 책은 어디에 있어요?' },
            { en: 'I am at school.', ko: '나는 학교에 있어요.' },
          ],
        },
      },
      {
        id: '1-7-6',
        unitId: '1-7',
        order: 6,
        type: 'review',
        title: '유닛 복습',
        xp: 20,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"책상 위에"는?', options: ['on the desk', 'in the desk', 'under the desk'], answerIndex: 0 },
            { prompt: '"어디"는 영어로?', options: ['what', 'where', 'who'], answerIndex: 1 },
            { prompt: '"나는 집에 있어요"는?', options: ['I am at home', 'I am home at', 'I at home'], answerIndex: 0 },
          ],
        },
      },
    ],
  },

  // ── Unit 1-8 : 일상 동작 ─────────────────────────────
  {
    id: '1-8',
    levelId: 1,
    order: 7,
    title: '일상 동작',
    icon: '⏰',
    description: 'go, eat, drink 같은 기본 동작 말하기',
    lessons: [
      {
        id: '1-8-1',
        unitId: '1-8',
        order: 1,
        type: 'vocab',
        title: '기본 동작 단어',
        xp: 10,
        content: {
          kind: 'vocab',
          words: [
            { en: 'go', ko: '가다', ipa: '/ɡoʊ/', example: 'I go to school.', exampleKo: '나는 학교에 가요.' },
            { en: 'eat', ko: '먹다', ipa: '/iːt/', example: 'I eat breakfast.', exampleKo: '나는 아침을 먹어요.' },
            { en: 'drink', ko: '마시다', ipa: '/drɪŋk/', example: 'I drink water.', exampleKo: '나는 물을 마셔요.' },
            { en: 'study', ko: '공부하다', ipa: '/ˈstʌdi/', example: 'I study English.', exampleKo: '나는 영어를 공부해요.' },
            { en: 'work', ko: '일하다', ipa: '/wɜːrk/', example: 'I work today.', exampleKo: '나는 오늘 일해요.' },
            { en: 'sleep', ko: '자다', ipa: '/sliːp/', example: 'I sleep at night.', exampleKo: '나는 밤에 자요.' },
            { en: 'read', ko: '읽다', ipa: '/riːd/', example: 'I read a book.', exampleKo: '나는 책을 읽어요.' },
            { en: 'watch', ko: '보다', ipa: '/wɑːtʃ/', example: 'I watch TV.', exampleKo: '나는 TV를 봐요.' },
          ],
        },
      },
      {
        id: '1-8-2',
        unitId: '1-8',
        order: 2,
        type: 'grammar',
        title: 'I + 동사',
        xp: 15,
        content: {
          kind: 'grammar',
          point: 'I + 동사 = 나는 ~해요',
          explanation:
            '일상 행동은 I 뒤에 동사를 바로 붙여 말합니다. 아직은 I 기준으로 짧고 정확하게 말하는 연습을 합니다.',
          examples: [
            { en: 'I go to school.', ko: '나는 학교에 가요.' },
            { en: 'I eat breakfast.', ko: '나는 아침을 먹어요.' },
            { en: 'I drink water.', ko: '나는 물을 마셔요.' },
            { en: 'I study English.', ko: '나는 영어를 공부해요.' },
          ],
          tips: ['to school처럼 목적지가 오면 go 뒤에 to를 자주 붙여요.'],
        },
      },
      {
        id: '1-8-3',
        unitId: '1-8',
        order: 3,
        type: 'build',
        title: '일상 문장 조립',
        xp: 15,
        content: {
          kind: 'build',
          items: [
            { ko: '나는 학교에 가요.', answer: ['I', 'go', 'to', 'school'], bank: ['school', 'to', 'I', 'go'] },
            { ko: '나는 영어를 공부해요.', answer: ['I', 'study', 'English'], bank: ['English', 'I', 'study'] },
            { ko: '나는 물을 마셔요.', answer: ['I', 'drink', 'water'], bank: ['water', 'drink', 'I'] },
            { ko: '나는 책을 읽어요.', answer: ['I', 'read', 'a', 'book'], bank: ['book', 'I', 'a', 'read'] },
          ],
        },
      },
      {
        id: '1-8-4',
        unitId: '1-8',
        order: 4,
        type: 'listening',
        title: '듣고 행동 고르기',
        xp: 15,
        content: {
          kind: 'listening',
          items: [
            { audioText: 'I study English.', question: '무엇을 하나요?', options: ['영어 공부', '물 마시기', '잠자기'], answerIndex: 0 },
            { audioText: 'I drink water.', question: '무엇을 하나요?', options: ['책 읽기', '물 마시기', '학교 가기'], answerIndex: 1 },
            { audioText: 'I read a book.', question: '무엇을 하나요?', options: ['책 읽기', 'TV 보기', '일하기'], answerIndex: 0 },
          ],
        },
      },
      {
        id: '1-8-5',
        unitId: '1-8',
        order: 5,
        type: 'conversation',
        title: 'AI와 하루 말하기',
        xp: 25,
        content: {
          kind: 'conversation',
          scenarioId: 'daily-routine-basic',
          title: '오늘 하는 일 말하기',
          situation: 'AI 친구에게 오늘 하는 일을 짧은 영어 문장으로 말해요.',
          goalTurns: 4,
        },
      },
      {
        id: '1-8-6',
        unitId: '1-8',
        order: 6,
        type: 'review',
        title: '유닛 복습',
        xp: 20,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"나는 영어를 공부해요"를 영어로?', options: ['I study English', 'I English study', 'I am English'], answerIndex: 0 },
            { prompt: '"마시다"는?', options: ['eat', 'drink', 'sleep'], answerIndex: 1 },
            { prompt: 'go 뒤에 목적지가 오면 자주 붙는 말은?', options: ['to', 'an', 'my'], answerIndex: 0 },
          ],
        },
      },
    ],
  },

  // ── Unit 1-5 : 복습 + AI 대화 테스트 ─────────────────
  {
    id: '1-5',
    levelId: 1,
    order: 8,
    title: '복습 + 레벨 테스트',
    icon: '🏁',
    description: 'Level 1 종합 복습과 AI 회화 테스트',
    lessons: [
      {
        id: '1-5-1',
        unitId: '1-5',
        order: 1,
        type: 'review',
        title: 'Level 1 종합 복습',
        xp: 25,
        content: {
          kind: 'review',
          questions: [
            { prompt: '"만나서 반가워요"를 영어로?', options: ['Nice to meet you', 'Goodbye', 'How old are you'], answerIndex: 0 },
            { prompt: '"나는 한국에서 왔어요"를 영어로?', options: ['You are Korea', "I'm from Korea", 'I like Korea'], answerIndex: 1 },
            { prompt: '"몇 살이에요?"를 영어로?', options: ['How old are you?', 'What is this?', 'Where are you?'], answerIndex: 0 },
            { prompt: '"나는 음악을 좋아해"를 영어로?', options: ['I am music', 'I like music', 'I from music'], answerIndex: 1 },
            { prompt: '"이것은 책이에요"를 영어로?', options: ['This is a book', 'This are book', 'That book'], answerIndex: 0 },
            { prompt: '"책상 위에"는?', options: ['on the desk', 'in the chair', 'under school'], answerIndex: 0 },
            { prompt: '"나는 물을 마셔요"를 영어로?', options: ['I drink water', 'I eat water', 'I am water'], answerIndex: 0 },
            { prompt: '모음 소리로 시작하는 apple 앞에는?', options: ['a', 'an', 'my'], answerIndex: 1 },
          ],
        },
      },
      {
        id: '1-5-2',
        unitId: '1-5',
        order: 2,
        type: 'conversation',
        title: 'AI 회화 테스트',
        xp: 40,
        content: {
          kind: 'conversation',
          scenarioId: 'level1-review-test',
          title: 'Level 1 최종 회화 테스트',
          situation: '배운 걸 모두 써서 AI와 대화해요. 자기소개·나이·좋아하는 것을 말해보세요.',
          goalTurns: 4,
        },
      },
      {
        id: '1-5-3',
        unitId: '1-5',
        order: 3,
        type: 'test',
        title: 'Level 1 승급 테스트',
        xp: 60,
        content: {
          kind: 'test',
          passScore: 70,
          questions: [
            { prompt: 'Nice to ___ you.', options: ['meet', 'meat', 'meeting'], answerIndex: 0, explanation: 'Nice to meet you = 만나서 반가워요' },
            { prompt: '___ am from Korea.', options: ['You', 'I', 'He'], answerIndex: 1 },
            { prompt: "I'm twenty ___ old.", options: ['year', 'years', 'old'], answerIndex: 1 },
            { prompt: 'I ___ music.', options: ['am', 'like', 'from'], answerIndex: 1 },
            { prompt: '"How old are you?"의 뜻은?', options: ['어떻게 지내요?', '몇 살이에요?', '어디서 왔어요?'], answerIndex: 1 },
            { prompt: 'This is ___ apple.', options: ['a', 'an', 'are'], answerIndex: 1 },
            { prompt: 'It is ___ the desk.', options: ['on', 'apple', 'drink'], answerIndex: 0 },
            { prompt: 'Where ___ my book?', options: ['am', 'is', 'are'], answerIndex: 1 },
            { prompt: 'I ___ English.', options: ['study', 'desk', 'old'], answerIndex: 0 },
            { prompt: '"나는 학교에 가요"를 영어로?', options: ['I go to school', 'I school go', 'I am school go'], answerIndex: 0 },
          ],
        },
      },
    ],
  },
];
