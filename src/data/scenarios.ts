import { Scenario } from '../engine/conversationEngine';

/**
 * AI 회화 시나리오 (정해진 대본).
 * 레슨의 ConversationContent.scenarioId 가 여기를 가리킨다.
 * 나중에 LLM으로 바꾸면 이 대본 없이 자유 대화가 되지만,
 * 지금은 초급자가 "무슨 말을 할지" 추천 문장으로 도와준다.
 */
export const SCENARIOS: Record<string, Scenario> = {
  'greet-first-meeting': {
    id: 'greet-first-meeting',
    steps: [
      {
        bot: 'Hi! Nice to meet you.',
        botKo: '안녕하세요! 만나서 반가워요.',
        suggestions: ['Nice to meet you too.', 'Hello!', 'Hi!'],
      },
      {
        bot: "How are you today?",
        botKo: '오늘 기분 어때요?',
        suggestions: ["I'm good, thank you.", "I'm fine.", 'Not bad.'],
      },
      {
        bot: "Great! What's your name?",
        botKo: '좋아요! 이름이 뭐예요?',
        suggestions: ['My name is Minsu.', "I'm Minsu.", 'My name is ___.'],
      },
      {
        bot: 'Nice name! Where are you from?',
        botKo: '좋은 이름이네요! 어디에서 왔어요?',
        suggestions: ["I'm from Korea.", 'I am from Seoul.', 'From Korea.'],
      },
    ],
    closing: {
      bot: 'Awesome! It was nice talking to you. See you next time!',
      botKo: '멋져요! 얘기 즐거웠어요. 다음에 또 봐요!',
    },
  },

  'level1-review-test': {
    id: 'level1-review-test',
    steps: [
      {
        bot: "Hello! Let's practice everything you learned. Ready?",
        botKo: '안녕하세요! 배운 걸 다 연습해봐요. 준비됐나요?',
        suggestions: ['Yes, I am ready.', "Yes, let's go!", 'Okay.'],
      },
      {
        bot: 'Good! Please introduce yourself.',
        botKo: '좋아요! 자기소개를 해보세요.',
        suggestions: [
          "Hi, I'm Minsu. I'm from Korea.",
          'My name is Minsu.',
          "I'm 20 years old.",
        ],
      },
      {
        bot: 'Nice! What do you like?',
        botKo: '좋네요! 뭘 좋아해요?',
        suggestions: ['I like coffee.', 'I like music.', 'I like soccer.'],
      },
      {
        bot: 'Cool! How old are you?',
        botKo: '멋져요! 몇 살이에요?',
        suggestions: ["I'm 20 years old.", 'I am 20.', 'Twenty.'],
      },
    ],
    closing: {
      bot: 'Perfect! You passed the Level 1 test. Congratulations! 🎉',
      botKo: '완벽해요! 레벨 1 테스트 통과예요. 축하해요! 🎉',
    },
  },

  'classroom-objects': {
    id: 'classroom-objects',
    steps: [
      {
        bot: "Let's talk about things on your desk. What is this?",
        botKo: '책상 위 물건을 말해봐요. 이것은 무엇인가요?',
        suggestions: ['This is a book.', 'This is a pen.', 'This is my phone.'],
      },
      {
        bot: 'Good. Is it your book?',
        botKo: '좋아요. 그것은 당신의 책인가요?',
        suggestions: ['Yes, it is my book.', 'No, it is my pen.', 'Yes, it is.'],
      },
      {
        bot: 'Great. What color is it?',
        botKo: '좋아요. 무슨 색인가요?',
        suggestions: ['It is blue.', 'It is red.', 'It is black.'],
      },
      {
        bot: 'Nice. Please say one more thing.',
        botKo: '좋아요. 물건 하나를 더 말해보세요.',
        suggestions: ['This is a bag.', 'This is an apple.', 'This is a chair.'],
      },
    ],
    closing: {
      bot: 'Great job! You can introduce simple objects now.',
      botKo: '잘했어요! 이제 간단한 물건을 소개할 수 있어요.',
    },
  },

  'daily-routine-basic': {
    id: 'daily-routine-basic',
    steps: [
      {
        bot: 'What do you do today?',
        botKo: '오늘 무엇을 하나요?',
        suggestions: ['I study English.', 'I go to school.', 'I work today.'],
      },
      {
        bot: 'Good. What do you drink?',
        botKo: '좋아요. 무엇을 마시나요?',
        suggestions: ['I drink water.', 'I drink coffee.', 'I drink tea.'],
      },
      {
        bot: 'Nice. What do you eat?',
        botKo: '좋아요. 무엇을 먹나요?',
        suggestions: ['I eat breakfast.', 'I eat Korean food.', 'I eat an apple.'],
      },
      {
        bot: 'Great. What do you do at night?',
        botKo: '훌륭해요. 밤에는 무엇을 하나요?',
        suggestions: ['I sleep at night.', 'I read a book.', 'I watch TV.'],
      },
    ],
    closing: {
      bot: 'Excellent! You talked about your day in English.',
      botKo: '아주 좋아요! 영어로 하루 일과를 말했어요.',
    },
  },

  'family-introduction': {
    id: 'family-introduction',
    steps: [
      {
        bot: 'Who is this?',
        botKo: '이 사람은 누구인가요?',
        suggestions: ['This is my mother.', 'This is my father.', 'This is my sister.'],
      },
      {
        bot: 'Nice. Is she kind?',
        botKo: '좋아요. 그녀는 친절한가요?',
        suggestions: ['Yes, she is kind.', 'Yes, she is.', 'She is my mother.'],
      },
      {
        bot: 'Good. Who is he?',
        botKo: '좋아요. 그는 누구인가요?',
        suggestions: ['He is my father.', 'He is my brother.', 'He is my teacher.'],
      },
      {
        bot: 'Great. Tell me one more family word.',
        botKo: '훌륭해요. 가족 단어를 하나 더 말해보세요.',
        suggestions: ['This is my brother.', 'This is my sister.', 'This is my family.'],
      },
    ],
    closing: {
      bot: 'Great work! You introduced your family clearly.',
      botKo: '잘했어요! 가족을 분명하게 소개했어요.',
    },
  },

  'room-description': {
    id: 'room-description',
    steps: [
      {
        bot: 'Please introduce your room.',
        botKo: '당신의 방을 소개해보세요.',
        suggestions: ['This is my room.', 'My room is small.', 'My room is nice.'],
      },
      {
        bot: 'What is in your room?',
        botKo: '방 안에 무엇이 있나요?',
        suggestions: ['There is a bed.', 'There is a desk.', 'There is a window.'],
      },
      {
        bot: 'Good. Are there chairs?',
        botKo: '좋아요. 의자가 있나요?',
        suggestions: ['There is a chair.', 'There are two chairs.', 'No, there are no chairs.'],
      },
      {
        bot: 'Nice. Where is your bag?',
        botKo: '좋아요. 가방은 어디에 있나요?',
        suggestions: ['It is on the bed.', 'It is under the desk.', 'It is in my room.'],
      },
    ],
    closing: {
      bot: 'Excellent! You described your room in English.',
      botKo: '훌륭해요! 영어로 방을 설명했어요.',
    },
  },

  'level2-review-test': {
    id: 'level2-review-test',
    steps: [
      {
        bot: "Let's review Level 2. Please introduce one family member.",
        botKo: 'Level 2를 복습해요. 가족 한 명을 소개해보세요.',
        suggestions: ['She is my mother.', 'He is my father.', 'This is my brother.'],
      },
      {
        bot: 'Good. Show me something near you.',
        botKo: '좋아요. 가까이에 있는 물건을 말해보세요.',
        suggestions: ['This is my phone.', 'This is a red pen.', 'This is my notebook.'],
      },
      {
        bot: 'Nice. Now show me something far from you.',
        botKo: '좋아요. 이제 멀리 있는 것을 말해보세요.',
        suggestions: ['That is a blue bag.', 'That is a big desk.', 'That is his phone.'],
      },
      {
        bot: 'Great. Where is your phone or book?',
        botKo: '훌륭해요. 휴대폰이나 책은 어디에 있나요?',
        suggestions: ['It is on the desk.', 'It is in my bag.', 'It is under the chair.'],
      },
      {
        bot: 'Last one. How are you today?',
        botKo: '마지막이에요. 오늘 기분이 어떤가요?',
        suggestions: ['I am happy.', 'I am tired, but I am okay.', 'I am ready.'],
      },
    ],
    closing: {
      bot: 'Great! You finished the Level 2 conversation test.',
      botKo: '좋아요! Level 2 회화 테스트를 마쳤어요.',
    },
  },

  'numbers-and-plurals': {
    id: 'numbers-and-plurals',
    steps: [
      {
        bot: 'How many books are there?',
        botKo: '책이 몇 권 있나요?',
        suggestions: ['There is one book.', 'There are two books.', 'There are three books.'],
      },
      {
        bot: 'Good. What are these?',
        botKo: '좋아요. 이것들은 무엇인가요?',
        suggestions: ['These are my books.', 'These are pens.', 'These are my keys.'],
      },
      {
        bot: 'Nice. What are those?',
        botKo: '좋아요. 저것들은 무엇인가요?',
        suggestions: ['Those are your bags.', 'Those are chairs.', 'Those are books.'],
      },
      {
        bot: 'Last one. Are there many books?',
        botKo: '마지막이에요. 책이 많이 있나요?',
        suggestions: ['Yes, there are many books.', 'There are five books.', 'No, there is one book.'],
      },
    ],
    closing: {
      bot: 'Great! You can talk about one thing and many things.',
      botKo: '좋아요! 하나와 여러 개를 말할 수 있어요.',
    },
  },

  'object-location': {
    id: 'object-location',
    steps: [
      {
        bot: 'Where is your book?',
        botKo: '책은 어디에 있나요?',
        suggestions: ['It is on the desk.', 'It is in my bag.', 'It is here.'],
      },
      {
        bot: 'Good. Where is your phone?',
        botKo: '좋아요. 휴대폰은 어디에 있나요?',
        suggestions: ['It is on the desk.', 'It is next to my book.', 'It is in my room.'],
      },
      {
        bot: 'Nice. Where is your bag?',
        botKo: '좋아요. 가방은 어디에 있나요?',
        suggestions: ['It is under the chair.', 'It is next to the bed.', 'It is there.'],
      },
      {
        bot: 'Last one. Ask me where something is.',
        botKo: '마지막이에요. 어떤 물건이 어디에 있는지 물어보세요.',
        suggestions: ['Where is my key?', 'Where is my bag?', 'Where is the book?'],
      },
    ],
    closing: {
      bot: 'Excellent! You asked and answered about locations.',
      botKo: '훌륭해요! 위치를 묻고 답했어요.',
    },
  },

  'feelings-basic': {
    id: 'feelings-basic',
    steps: [
      {
        bot: 'How are you today?',
        botKo: '오늘 기분이 어떤가요?',
        suggestions: ['I am happy.', 'I am tired.', 'I am okay.'],
      },
      {
        bot: 'Good. Are you hungry?',
        botKo: '좋아요. 배고픈가요?',
        suggestions: ['Yes, I am hungry.', 'No, I am okay.', 'I am thirsty.'],
      },
      {
        bot: 'Nice. Is your friend busy?',
        botKo: '좋아요. 친구는 바쁜가요?',
        suggestions: ['She is busy.', 'He is busy.', 'No, she is okay.'],
      },
      {
        bot: 'Last one. Are you ready?',
        botKo: '마지막이에요. 준비됐나요?',
        suggestions: ['Yes, I am ready.', 'I am ready.', 'I am tired, but I am ready.'],
      },
    ],
    closing: {
      bot: 'Nice! You talked about feelings and states.',
      botKo: '좋아요! 기분과 상태를 말했어요.',
    },
  },

  'short-introduction-extended': {
    id: 'short-introduction-extended',
    steps: [
      {
        bot: 'Please introduce yourself with two ideas.',
        botKo: '두 가지 내용을 연결해서 자기소개해보세요.',
        suggestions: ['I am a student, and I am happy.', 'I am Minsu, and I am from Korea.', 'I am tired, but I am okay.'],
      },
      {
        bot: 'Good. Tell me about your room.',
        botKo: '좋아요. 방에 대해 말해보세요.',
        suggestions: ['This is my room, and it is nice.', 'There is a bed, and there is a desk.', 'My room is small, but it is nice.'],
      },
      {
        bot: 'Nice. Tell me about your favorite thing.',
        botKo: '좋아요. 가장 좋아하는 물건에 대해 말해보세요.',
        suggestions: ['This is my favorite book.', 'This is my new bag.', 'This is old, but it is good.'],
      },
      {
        bot: 'Great. Use "but" one more time.',
        botKo: '훌륭해요. but을 한 번 더 써보세요.',
        suggestions: ['I am tired, but I am okay.', 'This is old, but it is good.', 'My room is small, but it is nice.'],
      },
      {
        bot: 'Last one. Say one sentence with "and".',
        botKo: '마지막이에요. and가 들어간 문장을 말해보세요.',
        suggestions: ['This is my phone, and it is black.', 'I am a student, and I am ready.', 'These are my books, and they are new.'],
      },
    ],
    closing: {
      bot: 'Great! You connected short sentences naturally.',
      botKo: '좋아요! 짧은 문장을 자연스럽게 연결했어요.',
    },
  },

  'present-actions': {
    id: 'present-actions',
    steps: [
      {
        bot: 'What do you do today?',
        botKo: '오늘 무엇을 하나요?',
        suggestions: ['I study English.', 'I work today.', 'I clean my room.'],
      },
      {
        bot: 'Good. What do you study?',
        botKo: '좋아요. 무엇을 공부하나요?',
        suggestions: ['I study English.', 'I study new words.', 'I study at home.'],
      },
      {
        bot: 'Nice. What do you listen to?',
        botKo: '좋아요. 무엇을 듣나요?',
        suggestions: ['I listen to music.', 'I listen to English.', 'I listen to a podcast.'],
      },
      {
        bot: 'Great. What do you read?',
        botKo: '훌륭해요. 무엇을 읽나요?',
        suggestions: ['I read a book.', 'I read English words.', 'I read at night.'],
      },
      {
        bot: 'Last one. What do you do at home?',
        botKo: '마지막이에요. 집에서 무엇을 하나요?',
        suggestions: ['I cook dinner.', 'I watch TV.', 'I clean my room.'],
      },
    ],
    closing: {
      bot: 'Great work! You can talk about simple actions now.',
      botKo: '잘했어요! 이제 간단한 행동을 말할 수 있어요.',
    },
  },

  'likes-dislikes': {
    id: 'likes-dislikes',
    steps: [
      {
        bot: 'What do you like?',
        botKo: '무엇을 좋아하나요?',
        suggestions: ['I like coffee.', 'I like music.', 'I like Korean food.'],
      },
      {
        bot: 'Great. What do you love?',
        botKo: '좋아요. 무엇을 아주 좋아하나요?',
        suggestions: ['I love music.', 'I love movies.', 'I love games.'],
      },
      {
        bot: 'Nice. What do you want now?',
        botKo: '좋아요. 지금 무엇을 원하나요?',
        suggestions: ['I want tea.', 'I want water.', 'I want coffee.'],
      },
      {
        bot: 'Good. What do you need?',
        botKo: '좋아요. 무엇이 필요한가요?',
        suggestions: ['I need a pen.', 'I need my phone.', 'I need a notebook.'],
      },
      {
        bot: 'One more. What food do you like?',
        botKo: '하나 더요. 어떤 음식을 좋아하나요?',
        suggestions: ['I like Korean food.', 'I like pizza.', 'I like fruit.'],
      },
    ],
    closing: {
      bot: 'Excellent! You talked about likes and wants clearly.',
      botKo: '훌륭해요! 좋아하는 것과 원하는 것을 분명히 말했어요.',
    },
  },

  'daily-routine-level3': {
    id: 'daily-routine-level3',
    steps: [
      {
        bot: 'What time do you wake up?',
        botKo: '몇 시에 일어나나요?',
        suggestions: ['I wake up at seven.', 'I wake up at eight.', 'I wake up early.'],
      },
      {
        bot: 'Good. What do you do in the morning?',
        botKo: '좋아요. 아침에 무엇을 하나요?',
        suggestions: ['I eat breakfast.', 'I study in the morning.', 'I go to school.'],
      },
      {
        bot: 'Nice. What do you do in the afternoon?',
        botKo: '좋아요. 오후에 무엇을 하나요?',
        suggestions: ['I work in the afternoon.', 'I study at school.', 'I go home at five.'],
      },
      {
        bot: 'Great. What do you do at night?',
        botKo: '훌륭해요. 밤에는 무엇을 하나요?',
        suggestions: ['I read at night.', 'I watch TV.', 'I do homework.'],
      },
      {
        bot: 'Last one. What time do you go to bed?',
        botKo: '마지막이에요. 몇 시에 자러 가나요?',
        suggestions: ['I go to bed at ten.', 'I go to bed at eleven.', 'I sleep at night.'],
      },
    ],
    closing: {
      bot: 'Great! You described your daily routine.',
      botKo: '좋아요! 하루 일과를 설명했어요.',
    },
  },

  'third-person-habits': {
    id: 'third-person-habits',
    steps: [
      {
        bot: 'Tell me about your friend. What does he or she do?',
        botKo: '친구에 대해 말해보세요. 그/그녀는 무엇을 하나요?',
        suggestions: ['She studies English.', 'He works at a cafe.', 'My friend studies English.'],
      },
      {
        bot: 'Good. Where does your friend live?',
        botKo: '좋아요. 친구는 어디에 사나요?',
        suggestions: ['She lives in Seoul.', 'He lives in this city.', 'My friend lives in Korea.'],
      },
      {
        bot: 'Nice. What does your friend like?',
        botKo: '좋아요. 친구는 무엇을 좋아하나요?',
        suggestions: ['She likes music.', 'He likes soccer.', 'My friend likes coffee.'],
      },
      {
        bot: 'Great. What does he or she watch?',
        botKo: '훌륭해요. 그/그녀는 무엇을 보나요?',
        suggestions: ['She watches TV.', 'He watches movies.', 'My friend watches soccer.'],
      },
      {
        bot: 'Last one. Say one more sentence about your friend.',
        botKo: '마지막이에요. 친구에 대해 한 문장 더 말해보세요.',
        suggestions: ['He plays soccer.', 'She reads a book.', 'My friend works at school.'],
      },
    ],
    closing: {
      bot: 'Nice job! You used he and she with present verbs.',
      botKo: '잘했어요! he와 she 뒤의 현재형 동사를 사용했어요.',
    },
  },

  'do-you-questions': {
    id: 'do-you-questions',
    steps: [
      {
        bot: 'Ask me a question with "Do you".',
        botKo: 'Do you로 질문해보세요.',
        suggestions: ['Do you study English?', 'Do you like coffee?', 'Do you live in Seoul?'],
      },
      {
        bot: 'Yes, I do. Now answer this: Do you study English?',
        botKo: '네, 그래요. 이제 대답해보세요. 영어를 공부하나요?',
        suggestions: ['Yes, I do.', 'Yes, I study English.', 'No, I do not.'],
      },
      {
        bot: 'Good. Do you speak English?',
        botKo: '좋아요. 영어를 말하나요?',
        suggestions: ['Yes, I do.', 'I speak a little English.', 'No, I do not.'],
      },
      {
        bot: 'Nice. Do you live in Seoul?',
        botKo: '좋아요. 서울에 사나요?',
        suggestions: ['Yes, I do.', 'No, I live in Busan.', 'No, I do not.'],
      },
      {
        bot: 'Last one. Ask me one more question.',
        botKo: '마지막이에요. 질문을 하나 더 해보세요.',
        suggestions: ['Do you like music?', 'Do you work today?', 'Do you read books?'],
      },
    ],
    closing: {
      bot: 'Great! You can ask and answer Do you questions.',
      botKo: '좋아요! Do you 질문과 대답을 할 수 있어요.',
    },
  },

  'places-activities': {
    id: 'places-activities',
    steps: [
      {
        bot: 'Where do you study?',
        botKo: '어디에서 공부하나요?',
        suggestions: ['I study at school.', 'I study at home.', 'I study at the library.'],
      },
      {
        bot: 'Good. Where do you work?',
        botKo: '좋아요. 어디에서 일하나요?',
        suggestions: ['I work at the office.', 'I work at home.', 'I work at a cafe.'],
      },
      {
        bot: 'Nice. Where do you walk?',
        botKo: '좋아요. 어디에서 걷나요?',
        suggestions: ['I walk in the park.', 'I walk at school.', 'I walk near my home.'],
      },
      {
        bot: 'Great. Where do you read?',
        botKo: '훌륭해요. 어디에서 책을 읽나요?',
        suggestions: ['I read at the library.', 'I read at home.', 'I read in the park.'],
      },
      {
        bot: 'Last one. Where do you exercise?',
        botKo: '마지막이에요. 어디에서 운동하나요?',
        suggestions: ['I exercise at the gym.', 'I exercise in the park.', 'I exercise at home.'],
      },
    ],
    closing: {
      bot: 'Excellent! You connected places and actions.',
      botKo: '훌륭해요! 장소와 행동을 연결해서 말했어요.',
    },
  },

  'frequency-habits': {
    id: 'frequency-habits',
    steps: [
      {
        bot: 'What do you always do?',
        botKo: '항상 무엇을 하나요?',
        suggestions: ['I always eat breakfast.', 'I always study English.', 'I always drink water.'],
      },
      {
        bot: 'Good. What do you usually do at night?',
        botKo: '좋아요. 밤에 보통 무엇을 하나요?',
        suggestions: ['I usually study at night.', 'I usually read at night.', 'I usually watch TV.'],
      },
      {
        bot: 'Nice. What do you often drink?',
        botKo: '좋아요. 무엇을 자주 마시나요?',
        suggestions: ['I often drink coffee.', 'I often drink water.', 'I often drink tea.'],
      },
      {
        bot: 'Great. What do you sometimes do on the weekend?',
        botKo: '훌륭해요. 주말에 가끔 무엇을 하나요?',
        suggestions: ['I sometimes watch movies.', 'I sometimes play games.', 'I sometimes meet my friend.'],
      },
      {
        bot: 'Last one. What do you do every day?',
        botKo: '마지막이에요. 매일 무엇을 하나요?',
        suggestions: ['I study English every day.', 'I walk every day.', 'I read every day.'],
      },
    ],
    closing: {
      bot: 'Great! You talked about habits with frequency words.',
      botKo: '좋아요! 빈도 표현으로 습관을 말했어요.',
    },
  },

  'daily-errands': {
    id: 'daily-errands',
    steps: [
      {
        bot: 'What do you buy today?',
        botKo: '오늘 무엇을 사나요?',
        suggestions: ['I buy coffee.', 'I buy lunch.', 'I buy a notebook.'],
      },
      {
        bot: 'Good. Who do you meet today?',
        botKo: '좋아요. 오늘 누구를 만나나요?',
        suggestions: ['I meet my friend.', 'I meet my teacher.', 'I meet my brother.'],
      },
      {
        bot: 'Nice. Who do you call?',
        botKo: '좋아요. 누구에게 전화하나요?',
        suggestions: ['I call my mother.', 'I call my friend.', 'I call my father.'],
      },
      {
        bot: 'Great. What do you wait for?',
        botKo: '훌륭해요. 무엇을 기다리나요?',
        suggestions: ['I wait for the bus.', 'I wait for my friend.', 'I wait for coffee.'],
      },
      {
        bot: 'Last one. What do you order?',
        botKo: '마지막이에요. 무엇을 주문하나요?',
        suggestions: ['I order lunch.', 'I order coffee.', 'I order Korean food.'],
      },
    ],
    closing: {
      bot: 'Nice! You talked about daily errands in English.',
      botKo: '좋아요! 생활 속 할 일을 영어로 말했어요.',
    },
  },

  'sequence-routine': {
    id: 'sequence-routine',
    steps: [
      {
        bot: 'Start your day. What do you do first?',
        botKo: '하루를 시작해요. 먼저 무엇을 하나요?',
        suggestions: ['First, I wake up.', 'First, I take a shower.', 'First, I eat breakfast.'],
      },
      {
        bot: 'Good. What do you do then?',
        botKo: '좋아요. 그다음 무엇을 하나요?',
        suggestions: ['Then, I eat breakfast.', 'Then, I go to school.', 'Then, I study English.'],
      },
      {
        bot: 'Nice. What do you do after that?',
        botKo: '좋아요. 그 후에는 무엇을 하나요?',
        suggestions: ['After that, I go to school.', 'After that, I work at the office.', 'After that, I meet my friend.'],
      },
      {
        bot: 'Great. What do you do before dinner?',
        botKo: '훌륭해요. 저녁 전에는 무엇을 하나요?',
        suggestions: ['I study before dinner.', 'I exercise before dinner.', 'I read before dinner.'],
      },
      {
        bot: 'Last one. What do you do finally?',
        botKo: '마지막이에요. 마지막으로 무엇을 하나요?',
        suggestions: ['Finally, I go to bed.', 'Finally, I read a book.', 'Finally, I sleep.'],
      },
    ],
    closing: {
      bot: 'Excellent! You connected your day step by step.',
      botKo: '훌륭해요! 하루를 순서대로 연결해서 말했어요.',
    },
  },

  'level3-review-test': {
    id: 'level3-review-test',
    steps: [
      {
        bot: "Let's review Level 3. What do you do every day?",
        botKo: 'Level 3를 복습해요. 매일 무엇을 하나요?',
        suggestions: ['I study English every day.', 'I read every day.', 'I walk every day.'],
      },
      {
        bot: 'Good. What do you like?',
        botKo: '좋아요. 무엇을 좋아하나요?',
        suggestions: ['I like coffee.', 'I love music.', 'I like Korean food.'],
      },
      {
        bot: 'Nice. Tell me about your friend.',
        botKo: '좋아요. 친구에 대해 말해보세요.',
        suggestions: ['She studies English.', 'He works at a cafe.', 'My friend lives in Seoul.'],
      },
      {
        bot: 'Great. Ask me a Do you question.',
        botKo: '훌륭해요. Do you 질문을 해보세요.',
        suggestions: ['Do you study English?', 'Do you like coffee?', 'Do you live in Seoul?'],
      },
      {
        bot: 'Good. Where do you study or work?',
        botKo: '좋아요. 어디에서 공부하거나 일하나요?',
        suggestions: ['I study at home.', 'I work at the office.', 'I study at school.'],
      },
      {
        bot: 'Last one. Say your day in order.',
        botKo: '마지막이에요. 하루를 순서대로 말해보세요.',
        suggestions: ['First, I wake up. Then, I study English.', 'First, I eat breakfast. Then, I go to school.', 'Finally, I go to bed.'],
      },
    ],
    closing: {
      bot: 'Excellent! You finished the Level 3 conversation test.',
      botKo: '훌륭해요! Level 3 회화 테스트를 마쳤어요.',
    },
  },

  'be-negative-status': {
    id: 'be-negative-status',
    steps: [
      {
        bot: 'Are you busy today?',
        botKo: '오늘 바쁜가요?',
        suggestions: ['No, I am not busy.', 'Yes, I am busy.', 'I am not busy today.'],
      },
      {
        bot: 'Good. Are you ready?',
        botKo: '좋아요. 준비됐나요?',
        suggestions: ['Yes, I am ready.', 'I am not ready.', 'I am ready now.'],
      },
      {
        bot: 'Nice. Is your friend late?',
        botKo: '좋아요. 친구는 늦었나요?',
        suggestions: ['He is not late.', 'She is not late.', 'No, he is not late.'],
      },
      {
        bot: 'Last one. Are these your books?',
        botKo: '마지막이에요. 이것들은 네 책들인가요?',
        suggestions: ['They are not my books.', 'Yes, they are my books.', 'No, they are not mine.'],
      },
    ],
    closing: {
      bot: 'Good work! You used be verbs with not.',
      botKo: '잘했어요! be동사와 not을 사용했어요.',
    },
  },

  'be-questions-basic': {
    id: 'be-questions-basic',
    steps: [
      {
        bot: 'Ask me if I am ready.',
        botKo: '내가 준비됐는지 물어보세요.',
        suggestions: ['Are you ready?', 'Are you sure?', 'Are you okay?'],
      },
      {
        bot: 'Yes, I am. Now ask about this bag.',
        botKo: '네, 준비됐어요. 이제 이 가방에 대해 물어보세요.',
        suggestions: ['Is this your bag?', 'Is this my bag?', 'Is this a new bag?'],
      },
      {
        bot: 'Good. Ask about those books.',
        botKo: '좋아요. 저 책들에 대해 물어보세요.',
        suggestions: ['Are they your books?', 'Are those your books?', 'Are they new books?'],
      },
      {
        bot: 'Last one. Ask if he is my brother.',
        botKo: '마지막이에요. 그가 내 남자 형제인지 물어보세요.',
        suggestions: ['Is he your brother?', 'Is he your friend?', 'Is he a student?'],
      },
    ],
    closing: {
      bot: 'Great! You can make be verb questions.',
      botKo: '좋아요! be동사 질문을 만들 수 있어요.',
    },
  },

  'do-not-like': {
    id: 'do-not-like',
    steps: [
      {
        bot: 'Tell me something you do not drink.',
        botKo: '마시지 않는 것을 말해보세요.',
        suggestions: ['I do not drink coffee.', 'I do not drink tea.', 'I do not drink soda.'],
      },
      {
        bot: 'Good. Tell me something you do not eat.',
        botKo: '좋아요. 먹지 않는 것을 말해보세요.',
        suggestions: ['I do not eat breakfast.', 'I do not eat meat.', 'I do not eat spicy food.'],
      },
      {
        bot: 'Nice. Tell me something you do not like.',
        botKo: '좋아요. 좋아하지 않는 것을 말해보세요.',
        suggestions: ['I do not like games.', 'I do not like coffee.', 'I do not like this movie.'],
      },
      {
        bot: 'Last one. Tell me something you do not watch.',
        botKo: '마지막이에요. 보지 않는 것을 말해보세요.',
        suggestions: ['I do not watch TV.', 'I do not watch movies at night.', 'I do not watch soccer.'],
      },
    ],
    closing: {
      bot: 'Nice! You can say what you do not do.',
      botKo: '좋아요! 하지 않는 일을 말할 수 있어요.',
    },
  },

  'does-not-third-person': {
    id: 'does-not-third-person',
    steps: [
      {
        bot: 'Tell me something he does not do.',
        botKo: '그가 하지 않는 일을 말해보세요.',
        suggestions: ['He does not drink coffee.', 'He does not live here.', 'He does not work today.'],
      },
      {
        bot: 'Good. Tell me something she does not do.',
        botKo: '좋아요. 그녀가 하지 않는 일을 말해보세요.',
        suggestions: ['She does not speak English.', 'She does not work today.', 'She does not know him.'],
      },
      {
        bot: 'Nice. Does your friend live here?',
        botKo: '좋아요. 친구는 여기에 사나요?',
        suggestions: ['No, he does not live here.', 'No, she does not live here.', 'Yes, my friend lives here.'],
      },
      {
        bot: 'Last one. Does your friend study at night?',
        botKo: '마지막이에요. 친구는 밤에 공부하나요?',
        suggestions: ['No, he does not study at night.', 'Yes, she studies at night.', 'No, my friend does not study at night.'],
      },
    ],
    closing: {
      bot: 'Great! You used does not with he and she.',
      botKo: '좋아요! he/she와 does not을 사용했어요.',
    },
  },

  'do-does-questions': {
    id: 'do-does-questions',
    steps: [
      {
        bot: 'Ask me if I like coffee.',
        botKo: '내가 커피를 좋아하는지 물어보세요.',
        suggestions: ['Do you like coffee?', 'Do you drink coffee?', 'Do you want coffee?'],
      },
      {
        bot: 'Yes, I do. Ask about him now.',
        botKo: '네, 좋아해요. 이제 그에 대해 물어보세요.',
        suggestions: ['Does he like coffee?', 'Does he work today?', 'Does he live here?'],
      },
      {
        bot: 'Good. Ask about her English study.',
        botKo: '좋아요. 그녀의 영어 공부에 대해 물어보세요.',
        suggestions: ['Does she study English?', 'Does she speak English?', 'Does she like English?'],
      },
      {
        bot: 'Nice. Ask about them.',
        botKo: '좋아요. 그들에 대해 물어보세요.',
        suggestions: ['Do they live here?', 'Do they study English?', 'Do they work today?'],
      },
      {
        bot: 'Last one. Answer: Do you study every day?',
        botKo: '마지막이에요. 대답해보세요: 매일 공부하나요?',
        suggestions: ['Yes, I do.', 'No, I do not.', 'Yes, I study every day.'],
      },
    ],
    closing: {
      bot: 'Excellent! You practiced Do and Does questions.',
      botKo: '훌륭해요! Do와 Does 질문을 연습했어요.',
    },
  },

  'wh-what-where': {
    id: 'wh-what-where',
    steps: [
      {
        bot: 'Ask me what this is.',
        botKo: '이것이 무엇인지 물어보세요.',
        suggestions: ['What is this?', 'What is it?', 'What is this thing?'],
      },
      {
        bot: 'It is a notebook. Ask me my name.',
        botKo: '그것은 공책이에요. 내 이름을 물어보세요.',
        suggestions: ['What is your name?', 'What is your full name?', 'What is your English name?'],
      },
      {
        bot: 'Good. Ask where my bag is.',
        botKo: '좋아요. 내 가방이 어디에 있는지 물어보세요.',
        suggestions: ['Where is your bag?', 'Where is the bag?', 'Where is it?'],
      },
      {
        bot: 'Nice. Ask about my favorite food.',
        botKo: '좋아요. 내가 가장 좋아하는 음식을 물어보세요.',
        suggestions: ['What is your favorite food?', 'What food do you like?', 'What is your favorite?'],
      },
      {
        bot: 'Last one. Answer: Where are your books?',
        botKo: '마지막이에요. 대답해보세요: 책들은 어디에 있나요?',
        suggestions: ['They are on the desk.', 'They are in my bag.', 'They are here.'],
      },
    ],
    closing: {
      bot: 'Great! You asked what and where questions.',
      botKo: '좋아요! what과 where 질문을 했어요.',
    },
  },

  'who-whose-basic': {
    id: 'who-whose-basic',
    steps: [
      {
        bot: 'Ask me who she is.',
        botKo: '그녀가 누구인지 물어보세요.',
        suggestions: ['Who is she?', 'Who is this?', 'Who is your friend?'],
      },
      {
        bot: 'She is my teacher. Ask whose phone this is.',
        botKo: '그녀는 내 선생님이에요. 이것이 누구의 휴대폰인지 물어보세요.',
        suggestions: ['Whose phone is this?', 'Whose is this?', 'Is this yours?'],
      },
      {
        bot: 'It is mine. Now answer: Is this yours?',
        botKo: '그것은 내 것이에요. 이제 대답해보세요: 이것은 네 것인가요?',
        suggestions: ['Yes, it is mine.', 'No, it is not mine.', 'No, it is hers.'],
      },
      {
        bot: 'Good. Ask who the owner is.',
        botKo: '좋아요. 주인이 누구인지 물어보세요.',
        suggestions: ['Who is the owner?', 'Whose bag is this?', 'Who is he?'],
      },
      {
        bot: 'Last one. Say it is hers.',
        botKo: '마지막이에요. 그것이 그녀의 것이라고 말해보세요.',
        suggestions: ['It is hers.', 'This is hers.', 'The bag is hers.'],
      },
    ],
    closing: {
      bot: 'Nice! You asked about people and ownership.',
      botKo: '좋아요! 사람과 소유를 물어봤어요.',
    },
  },

  'how-questions-basic': {
    id: 'how-questions-basic',
    steps: [
      {
        bot: 'Ask me how I am.',
        botKo: '내가 어떻게 지내는지 물어보세요.',
        suggestions: ['How are you?', 'Are you okay?', 'How are you today?'],
      },
      {
        bot: 'I am good. Ask how many books there are.',
        botKo: '나는 좋아요. 책이 몇 권 있는지 물어보세요.',
        suggestions: ['How many books are there?', 'How many books do you have?', 'Are there many books?'],
      },
      {
        bot: 'There are three books. Ask my age.',
        botKo: '책은 세 권 있어요. 내 나이를 물어보세요.',
        suggestions: ['How old are you?', 'What is your age?', 'Are you twenty?'],
      },
      {
        bot: 'Good. Ask the price.',
        botKo: '좋아요. 가격을 물어보세요.',
        suggestions: ['How much is it?', 'What is the price?', 'Is it five dollars?'],
      },
      {
        bot: 'Last one. Answer: How many pens are there?',
        botKo: '마지막이에요. 대답해보세요: 펜이 몇 개 있나요?',
        suggestions: ['There are two pens.', 'There is one pen.', 'There are many pens.'],
      },
    ],
    closing: {
      bot: 'Excellent! You used how questions.',
      botKo: '훌륭해요! how 질문을 사용했어요.',
    },
  },

  'short-answers-basic': {
    id: 'short-answers-basic',
    steps: [
      {
        bot: 'Are you ready?',
        botKo: '준비됐나요?',
        suggestions: ['Yes, I am.', 'No, I am not.', 'I am ready.'],
      },
      {
        bot: 'Do you study English?',
        botKo: '영어를 공부하나요?',
        suggestions: ['Yes, I do.', 'No, I do not.', 'Yes, I study English.'],
      },
      {
        bot: 'Does your friend work today?',
        botKo: '친구는 오늘 일하나요?',
        suggestions: ['Yes, he does.', 'No, she does not.', 'No, my friend does not work today.'],
      },
      {
        bot: 'Is this your bag?',
        botKo: '이것은 네 가방인가요?',
        suggestions: ['Yes, it is.', 'No, it is not.', 'No, it is hers.'],
      },
      {
        bot: 'Last one. Do you like coffee?',
        botKo: '마지막이에요. 커피를 좋아하나요?',
        suggestions: ['Yes, I do.', 'No, I do not.', 'Maybe.'],
      },
    ],
    closing: {
      bot: 'Great! You answered questions naturally.',
      botKo: '좋아요! 질문에 자연스럽게 답했어요.',
    },
  },

  'level4-mixed-practice': {
    id: 'level4-mixed-practice',
    steps: [
      {
        bot: 'Are you busy today?',
        botKo: '오늘 바쁜가요?',
        suggestions: ['No, I am not busy.', 'Yes, I am busy.', 'I am busy because I work today.'],
      },
      {
        bot: 'Do you drink coffee?',
        botKo: '커피를 마시나요?',
        suggestions: ['Yes, I do.', 'No, I do not drink coffee.', 'I drink tea.'],
      },
      {
        bot: 'Where is your bag?',
        botKo: '가방은 어디에 있나요?',
        suggestions: ['It is on the desk.', 'It is in my room.', 'It is under the chair.'],
      },
      {
        bot: 'Whose phone is this?',
        botKo: '이것은 누구의 휴대폰인가요?',
        suggestions: ['It is mine.', 'It is yours.', 'It is hers.'],
      },
      {
        bot: 'Why are you tired?',
        botKo: '왜 피곤한가요?',
        suggestions: ['Because I work today.', 'Because I study at night.', 'Because I am busy.'],
      },
      {
        bot: 'Please ask me one question.',
        botKo: '나에게 질문 하나를 해보세요.',
        suggestions: ['Are you ready?', 'Do you like coffee?', 'Where is your book?'],
      },
    ],
    closing: {
      bot: 'Excellent! You connected questions, answers, and reasons.',
      botKo: '훌륭해요! 질문, 대답, 이유를 연결했어요.',
    },
  },

  'level4-review-test': {
    id: 'level4-review-test',
    steps: [
      {
        bot: "Let's review Level 4. Say one be verb negative sentence.",
        botKo: 'Level 4를 복습해요. be동사 부정문을 하나 말해보세요.',
        suggestions: ['I am not busy.', 'He is not late.', 'They are not my books.'],
      },
      {
        bot: 'Good. Ask a be verb question.',
        botKo: '좋아요. be동사 질문을 해보세요.',
        suggestions: ['Are you ready?', 'Is this your bag?', 'Are they your books?'],
      },
      {
        bot: 'Nice. Say one do not sentence.',
        botKo: '좋아요. do not 문장을 하나 말해보세요.',
        suggestions: ['I do not drink coffee.', 'I do not watch TV.', 'I do not like games.'],
      },
      {
        bot: 'Great. Ask a Does question.',
        botKo: '훌륭해요. Does 질문을 해보세요.',
        suggestions: ['Does he work today?', 'Does she study English?', 'Does your friend live here?'],
      },
      {
        bot: 'Good. Ask a What or Where question.',
        botKo: '좋아요. What 또는 Where 질문을 해보세요.',
        suggestions: ['What is this?', 'Where is your bag?', 'What is your favorite food?'],
      },
      {
        bot: 'Nice. Ask a Who, Whose, or How question.',
        botKo: '좋아요. Who, Whose, How 질문 중 하나를 해보세요.',
        suggestions: ['Who is she?', 'Whose phone is this?', 'How many books are there?'],
      },
      {
        bot: 'Last one. Answer: Do you study English?',
        botKo: '마지막이에요. 대답해보세요: 영어를 공부하나요?',
        suggestions: ['Yes, I do.', 'No, I do not.', 'Yes, I study English every day.'],
      },
    ],
    closing: {
      bot: 'Perfect! You finished the Level 4 conversation test.',
      botKo: '완벽해요! Level 4 회화 테스트를 마쳤어요.',
    },
  },

  'present-progress-now': {
    id: 'present-progress-now',
    steps: [
      {
        bot: 'What are you doing right now?',
        botKo: '바로 지금 무엇을 하고 있나요?',
        suggestions: ['I am studying English.', 'I am drinking water.', 'I am reading a book.'],
      },
      {
        bot: 'Good. What is your friend doing?',
        botKo: '좋아요. 친구는 무엇을 하고 있나요?',
        suggestions: ['She is working now.', 'He is eating lunch.', 'My friend is watching TV.'],
      },
      {
        bot: 'Nice. Are you busy now?',
        botKo: '좋아요. 지금 바쁜가요?',
        suggestions: ['Yes, I am busy now.', 'No, I am not busy.', 'I am studying right now.'],
      },
      {
        bot: 'Great. What are they doing?',
        botKo: '훌륭해요. 그들은 무엇을 하고 있나요?',
        suggestions: ['They are reading books.', 'They are watching TV.', 'They are working now.'],
      },
      {
        bot: 'Last one. Say one more -ing sentence.',
        botKo: '마지막이에요. -ing 문장을 하나 더 말해보세요.',
        suggestions: ['I am learning English.', 'She is cooking dinner.', 'We are listening to music.'],
      },
    ],
    closing: {
      bot: 'Great! You can describe actions happening now.',
      botKo: '좋아요! 지금 일어나는 행동을 설명할 수 있어요.',
    },
  },

  'what-are-you-doing': {
    id: 'what-are-you-doing',
    steps: [
      {
        bot: 'Ask me what I am doing.',
        botKo: '내가 무엇을 하고 있는지 물어보세요.',
        suggestions: ['What are you doing?', 'Are you studying now?', 'What are you doing right now?'],
      },
      {
        bot: 'I am waiting for the bus. What are you doing?',
        botKo: '나는 버스를 기다리고 있어요. 당신은 무엇을 하고 있나요?',
        suggestions: ['I am studying English.', 'I am walking to school.', 'I am cooking dinner.'],
      },
      {
        bot: 'Good. Are you talking on the phone?',
        botKo: '좋아요. 전화 통화 중인가요?',
        suggestions: ['No, I am not.', 'Yes, I am talking on the phone.', 'No, I am studying now.'],
      },
      {
        bot: 'Nice. What is your mother doing?',
        botKo: '좋아요. 어머니는 무엇을 하고 있나요?',
        suggestions: ['She is cooking dinner.', 'She is working now.', 'She is watching TV.'],
      },
      {
        bot: 'Last one. Ask me one Are you -ing question.',
        botKo: '마지막이에요. Are you -ing 질문을 하나 해보세요.',
        suggestions: ['Are you studying now?', 'Are you waiting for the bus?', 'Are you working today?'],
      },
    ],
    closing: {
      bot: 'Nice! You asked and answered present-progressive questions.',
      botKo: '좋아요! 현재진행 질문과 대답을 연습했어요.',
    },
  },

  'routine-in-progress': {
    id: 'routine-in-progress',
    steps: [
      {
        bot: 'What do you do every day?',
        botKo: '매일 무엇을 하나요?',
        suggestions: ['I study English every day.', 'I drink coffee every day.', 'I walk every day.'],
      },
      {
        bot: 'Good. What are you doing now?',
        botKo: '좋아요. 지금 무엇을 하고 있나요?',
        suggestions: ['I am studying English now.', 'I am working right now.', 'I am reading now.'],
      },
      {
        bot: 'Nice. What do you usually do at night?',
        botKo: '좋아요. 밤에 보통 무엇을 하나요?',
        suggestions: ['I usually study at night.', 'I usually watch TV.', 'I usually read at night.'],
      },
      {
        bot: 'Great. What are you doing today?',
        botKo: '훌륭해요. 오늘은 무엇을 하고 있나요?',
        suggestions: ['I am working at home today.', 'I am meeting my friend today.', 'I am learning English today.'],
      },
      {
        bot: 'Last one. Say one routine and one now sentence.',
        botKo: '마지막이에요. 평소 문장 하나와 지금 문장 하나를 말해보세요.',
        suggestions: ['I study every day. I am studying now.', 'I usually work at home. I am working now.', 'I read at night. I am reading now.'],
      },
    ],
    closing: {
      bot: 'Excellent! You separated routines and actions happening now.',
      botKo: '훌륭해요! 평소 하는 일과 지금 하는 일을 구분했어요.',
    },
  },

  'cafe-order-basic': {
    id: 'cafe-order-basic',
    steps: [
      {
        bot: 'Hi! What would you like?',
        botKo: '안녕하세요! 무엇을 드릴까요?',
        suggestions: ['I would like an iced coffee.', 'Can I have a latte?', 'A hot tea, please.'],
      },
      {
        bot: 'What size would you like?',
        botKo: '어떤 사이즈로 드릴까요?',
        suggestions: ['Medium, please.', 'Small, please.', 'Large, please.'],
      },
      {
        bot: 'For here or to go?',
        botKo: '매장에서 드시나요, 포장인가요?',
        suggestions: ['To go, please.', 'For here, please.', 'To go.'],
      },
      {
        bot: 'Anything else?',
        botKo: '더 필요한 것이 있나요?',
        suggestions: ['No, thank you.', 'Can I have water?', 'That is all, thank you.'],
      },
      {
        bot: 'That will be five dollars.',
        botKo: '5달러입니다.',
        suggestions: ['I will pay by card.', 'Here you go.', 'Thank you.'],
      },
    ],
    closing: {
      bot: 'Great! You ordered at a cafe clearly.',
      botKo: '좋아요! 카페에서 분명하게 주문했어요.',
    },
  },

  'convenience-store-basic': {
    id: 'convenience-store-basic',
    steps: [
      {
        bot: 'Hello. Do you need a bag?',
        botKo: '안녕하세요. 봉투가 필요하신가요?',
        suggestions: ['Yes, please.', 'No, thank you.', 'Can I have a bag?'],
      },
      {
        bot: 'The total is eight dollars.',
        botKo: '총액은 8달러입니다.',
        suggestions: ['I will pay by card.', 'I will pay in cash.', 'How much is it?'],
      },
      {
        bot: 'Do you want a receipt?',
        botKo: '영수증 필요하신가요?',
        suggestions: ['Yes, please.', 'No, thank you.', 'Can I have a receipt?'],
      },
      {
        bot: 'Anything else?',
        botKo: '더 필요한 것이 있나요?',
        suggestions: ['That is all.', 'Can I have water?', 'No, thank you.'],
      },
      {
        bot: 'Have a nice day.',
        botKo: '좋은 하루 보내세요.',
        suggestions: ['Thank you.', 'You too.', 'Thanks.'],
      },
    ],
    closing: {
      bot: 'Nice! You handled a store checkout.',
      botKo: '좋아요! 가게 계산 상황을 처리했어요.',
    },
  },

  'directions-basic': {
    id: 'directions-basic',
    steps: [
      {
        bot: 'Where do you want to go?',
        botKo: '어디에 가고 싶나요?',
        suggestions: ['Where is the station?', 'Where is the hospital?', 'Where is the bank?'],
      },
      {
        bot: 'It is near here. Go straight.',
        botKo: '여기 가까이에 있어요. 직진하세요.',
        suggestions: ['Go straight?', 'Okay, go straight.', 'Is it far from here?'],
      },
      {
        bot: 'Then turn left at the corner.',
        botKo: '그다음 모퉁이에서 왼쪽으로 도세요.',
        suggestions: ['Turn left at the corner.', 'Okay, turn left.', 'Can you say it again?'],
      },
      {
        bot: 'It is two blocks away.',
        botKo: '두 블록 떨어져 있어요.',
        suggestions: ['Thank you.', 'Is it near here?', 'Two blocks away.'],
      },
      {
        bot: 'Do you need more help?',
        botKo: '더 도움이 필요한가요?',
        suggestions: ['No, thank you.', 'Yes, please.', 'Can you help me?'],
      },
    ],
    closing: {
      bot: 'Great! You asked for and followed directions.',
      botKo: '좋아요! 길을 묻고 안내를 이해했어요.',
    },
  },

  'plans-meeting-basic': {
    id: 'plans-meeting-basic',
    steps: [
      {
        bot: 'Are you free tomorrow?',
        botKo: '내일 시간 되나요?',
        suggestions: ['Yes, I am free tomorrow.', 'No, I am busy tomorrow.', 'I am free at five.'],
      },
      {
        bot: 'What time is good for you?',
        botKo: '몇 시가 좋아요?',
        suggestions: ['Five is good.', 'I am free at three.', 'What time is good for you?'],
      },
      {
        bot: 'Let us meet at five.',
        botKo: '5시에 만나요.',
        suggestions: ['Sounds good.', 'Okay, see you at five.', 'Can we meet at six?'],
      },
      {
        bot: 'Where should we meet?',
        botKo: '어디에서 만날까요?',
        suggestions: ['Let us meet at the cafe.', 'Let us meet at the station.', 'At school, please.'],
      },
      {
        bot: 'Great. See you tomorrow.',
        botKo: '좋아요. 내일 봐요.',
        suggestions: ['See you tomorrow.', 'Thank you.', 'See you at five.'],
      },
    ],
    closing: {
      bot: 'Excellent! You made a simple plan.',
      botKo: '훌륭해요! 간단한 약속을 잡았어요.',
    },
  },

  'requests-help-basic': {
    id: 'requests-help-basic',
    steps: [
      {
        bot: 'You look confused. Do you need help?',
        botKo: '헷갈려 보이네요. 도움이 필요한가요?',
        suggestions: ['Yes, can you help me?', 'I need help.', 'No, thank you.'],
      },
      {
        bot: 'Sure. What is the problem?',
        botKo: '물론이에요. 문제가 무엇인가요?',
        suggestions: ['I cannot find my bag.', 'I am lost.', 'I do not understand.'],
      },
      {
        bot: 'Can I show you the map?',
        botKo: '지도를 보여드릴까요?',
        suggestions: ['Yes, please show me.', 'Can you show me?', 'Thank you.'],
      },
      {
        bot: 'Please wait a minute.',
        botKo: '잠깐 기다려주세요.',
        suggestions: ['Okay.', 'No problem.', 'I can wait.'],
      },
      {
        bot: 'Is this helpful?',
        botKo: '도움이 되나요?',
        suggestions: ['Yes, thank you.', 'Yes, it is helpful.', 'I need more help.'],
      },
    ],
    closing: {
      bot: 'Nice! You asked for help politely.',
      botKo: '좋아요! 공손하게 도움을 요청했어요.',
    },
  },

  'phone-chat-basic': {
    id: 'phone-chat-basic',
    steps: [
      {
        bot: 'Hello, are you available now?',
        botKo: '안녕하세요, 지금 통화 가능하세요?',
        suggestions: ['Yes, I am available.', 'No, I am busy right now.', 'Can I call you later?'],
      },
      {
        bot: 'Can you talk for a minute?',
        botKo: '잠깐 통화할 수 있나요?',
        suggestions: ['Yes, I can.', 'Sorry, I am busy.', 'Please text me.'],
      },
      {
        bot: 'Should I call you later?',
        botKo: '나중에 전화할까요?',
        suggestions: ['Yes, please call me later.', 'I will call you later.', 'Please text me.'],
      },
      {
        bot: 'Did you get my message?',
        botKo: '내 메시지 받았나요?',
        suggestions: ['Yes, I got your message.', 'No, please text me again.', 'I did not see it.'],
      },
      {
        bot: 'Okay, talk to you later.',
        botKo: '좋아요, 나중에 이야기해요.',
        suggestions: ['Talk to you later.', 'See you later.', 'Thank you.'],
      },
    ],
    closing: {
      bot: 'Great! You handled a short phone conversation.',
      botKo: '좋아요! 짧은 전화 대화를 처리했어요.',
    },
  },

  'problem-solving-basic': {
    id: 'problem-solving-basic',
    steps: [
      {
        bot: 'What is the problem?',
        botKo: '문제가 무엇인가요?',
        suggestions: ['I am lost.', 'I have a problem.', 'I cannot find my wallet.'],
      },
      {
        bot: 'Do you need help?',
        botKo: '도움이 필요한가요?',
        suggestions: ['Yes, I need help.', 'Can you help me?', 'Yes, please.'],
      },
      {
        bot: 'What are you looking for?',
        botKo: '무엇을 찾고 있나요?',
        suggestions: ['I cannot find my phone.', 'I cannot find my wallet.', 'I cannot find my passport.'],
      },
      {
        bot: 'Are you running late?',
        botKo: '늦을 것 같나요?',
        suggestions: ['Yes, I am running late.', 'No, I am okay.', 'Yes, I need to go now.'],
      },
      {
        bot: 'Okay. Please wait here.',
        botKo: '좋아요. 여기서 기다려주세요.',
        suggestions: ['Okay, thank you.', 'I will wait here.', 'Thank you for your help.'],
      },
    ],
    closing: {
      bot: 'Good job! You explained a problem and asked for help.',
      botKo: '잘했어요! 문제를 설명하고 도움을 요청했어요.',
    },
  },

  'mini-talk-basic': {
    id: 'mini-talk-basic',
    steps: [
      {
        bot: 'What are you doing now?',
        botKo: '지금 무엇을 하고 있나요?',
        suggestions: ['I am studying English now.', 'I am waiting for the bus.', 'I am drinking coffee.'],
      },
      {
        bot: 'Are you free later?',
        botKo: '나중에 시간 되나요?',
        suggestions: ['Yes, I am free at five.', 'No, I am busy later.', 'I am free tomorrow.'],
      },
      {
        bot: 'Then, let us meet at a cafe.',
        botKo: '그러면 카페에서 만나요.',
        suggestions: ['Sounds good.', 'What time is good?', 'Let us meet at five.'],
      },
      {
        bot: 'Can you order coffee?',
        botKo: '커피를 주문할 수 있나요?',
        suggestions: ['Yes. I would like an iced coffee.', 'Can I have a latte?', 'A coffee, please.'],
      },
      {
        bot: 'By the way, where is the cafe?',
        botKo: '그런데, 카페는 어디에 있나요?',
        suggestions: ['It is near the station.', 'Go straight and turn left.', 'It is two blocks away.'],
      },
      {
        bot: 'Great. See you soon.',
        botKo: '좋아요. 곧 봐요.',
        suggestions: ['See you soon.', 'Sounds good.', 'See you at five.'],
      },
    ],
    closing: {
      bot: 'Excellent! You kept a short practical conversation going.',
      botKo: '훌륭해요! 짧은 실전 대화를 이어갔어요.',
    },
  },

  'level5-review-test': {
    id: 'level5-review-test',
    steps: [
      {
        bot: "Let's review Level 5. What are you doing now?",
        botKo: 'Level 5를 복습해요. 지금 무엇을 하고 있나요?',
        suggestions: ['I am studying English now.', 'I am reading right now.', 'I am waiting for the bus.'],
      },
      {
        bot: 'Good. Order a drink at a cafe.',
        botKo: '좋아요. 카페에서 음료를 주문해보세요.',
        suggestions: ['I would like an iced coffee.', 'Can I have a latte?', 'A medium coffee, please.'],
      },
      {
        bot: 'Nice. Ask for the price and pay.',
        botKo: '좋아요. 가격을 묻고 결제해보세요.',
        suggestions: ['How much is it? I will pay by card.', 'Can I have a receipt?', 'I will pay in cash.'],
      },
      {
        bot: 'Great. Ask for directions.',
        botKo: '훌륭해요. 길을 물어보세요.',
        suggestions: ['Where is the station?', 'Is it near here?', 'Can you show me the way?'],
      },
      {
        bot: 'Good. Make a plan to meet.',
        botKo: '좋아요. 만날 약속을 잡아보세요.',
        suggestions: ['When are you free?', 'Let us meet at five.', 'What time is good?'],
      },
      {
        bot: 'Now ask for help.',
        botKo: '이제 도움을 요청해보세요.',
        suggestions: ['Can you help me?', 'I need help.', 'I cannot find my wallet.'],
      },
      {
        bot: 'Last one. End the conversation naturally.',
        botKo: '마지막이에요. 자연스럽게 대화를 마무리해보세요.',
        suggestions: ['Thank you for your help.', 'Sounds good. See you soon.', 'No problem. See you later.'],
      },
    ],
    closing: {
      bot: 'Excellent! You finished the Level 5 conversation test.',
      botKo: '훌륭해요! Level 5 회화 테스트를 마쳤어요.',
    },
  },

  'schedule-days': {
    id: 'schedule-days',
    steps: [
      {
        bot: 'What do you do on Monday?',
        botKo: '월요일에 무엇을 하나요?',
        suggestions: ['I work on Monday.', 'I have class on Monday.', 'I am busy on Monday.'],
      },
      {
        bot: 'Good. When are you free this week?',
        botKo: '좋아요. 이번 주 언제 시간이 되나요?',
        suggestions: ['I am free on Wednesday.', 'I am free on Friday.', 'I am free on the weekend.'],
      },
      {
        bot: 'Nice. Can we meet on Friday?',
        botKo: '좋아요. 금요일에 만날 수 있나요?',
        suggestions: ['Yes, let us meet on Friday.', 'No, I am busy on Friday.', 'Friday works for me.'],
      },
      {
        bot: 'What do you do on the weekend?',
        botKo: '주말에는 무엇을 하나요?',
        suggestions: ['I rest on the weekend.', 'I visit my parents on Sunday.', 'I study on Saturday.'],
      },
      {
        bot: 'Last one. Ask me about a day.',
        botKo: '마지막이에요. 요일에 대해 질문해보세요.',
        suggestions: ['Are you free on Monday?', 'What do you do on Friday?', 'Can we meet on Saturday?'],
      },
    ],
    closing: {
      bot: 'Great! You talked about days and weekly plans.',
      botKo: '좋아요! 요일과 주간 일정을 말했어요.',
    },
  },

  'telling-time': {
    id: 'telling-time',
    steps: [
      {
        bot: 'What time is it now?',
        botKo: '지금 몇 시인가요?',
        suggestions: ['It is seven thirty.', 'It is nine o clock.', 'It is around six.'],
      },
      {
        bot: 'Good. What time should we meet?',
        botKo: '좋아요. 몇 시에 만날까요?',
        suggestions: ['Let us meet at noon.', 'Let us meet at three.', 'Please come at nine sharp.'],
      },
      {
        bot: 'Are you free around six?',
        botKo: '6시쯤 시간 되나요?',
        suggestions: ['Yes, I am free around six.', 'No, I am busy around six.', 'I am free at seven.'],
      },
      {
        bot: 'Nice. Do you sleep before midnight?',
        botKo: '좋아요. 자정 전에 자나요?',
        suggestions: ['Yes, I sleep before midnight.', 'No, I sleep after midnight.', 'Usually, yes.'],
      },
      {
        bot: 'Last one. Ask me the time.',
        botKo: '마지막이에요. 시간을 물어보세요.',
        suggestions: ['What time is it?', 'What time should we meet?', 'Are you free at noon?'],
      },
    ],
    closing: {
      bot: 'Nice! You used clock-time expressions.',
      botKo: '좋아요! 시각 표현을 사용했어요.',
    },
  },

  'daily-schedule-a2': {
    id: 'daily-schedule-a2',
    steps: [
      {
        bot: 'What is your schedule today?',
        botKo: '오늘 일정이 어떻게 되나요?',
        suggestions: ['I have class at ten.', 'I have a meeting at two.', 'My schedule is full today.'],
      },
      {
        bot: 'When is your lunch break?',
        botKo: '점심시간은 언제인가요?',
        suggestions: ['My lunch break is at noon.', 'I eat lunch at twelve.', 'I take a break at one.'],
      },
      {
        bot: 'What time do you finish work?',
        botKo: '몇 시에 일을 끝내나요?',
        suggestions: ['I finish work at six.', 'I finish at five thirty.', 'I finish work around seven.'],
      },
      {
        bot: 'Are you free after work?',
        botKo: '퇴근 후에 시간이 되나요?',
        suggestions: ['Yes, I am free after work.', 'No, I have an appointment.', 'I am free around seven.'],
      },
      {
        bot: 'Last one. Ask about my schedule.',
        botKo: '마지막이에요. 내 일정을 물어보세요.',
        suggestions: ['What is your schedule today?', 'Do you have a meeting?', 'When is your lunch break?'],
      },
    ],
    closing: {
      bot: 'Excellent! You explained a daily schedule.',
      botKo: '훌륭해요! 하루 일정을 설명했어요.',
    },
  },

  'frequency-a2': {
    id: 'frequency-a2',
    steps: [
      {
        bot: 'How often do you exercise?',
        botKo: '얼마나 자주 운동하나요?',
        suggestions: ['I exercise once a week.', 'I exercise twice a week.', 'I rarely exercise.'],
      },
      {
        bot: 'Good. How often do you study English?',
        botKo: '좋아요. 영어를 얼마나 자주 공부하나요?',
        suggestions: ['I study every day.', 'I study three times a week.', 'I study twice a week.'],
      },
      {
        bot: 'Nice. How often do you eat fast food?',
        botKo: '좋아요. 패스트푸드를 얼마나 자주 먹나요?',
        suggestions: ['I rarely eat fast food.', 'I eat fast food once a month.', 'I sometimes eat fast food.'],
      },
      {
        bot: 'How often do you call your family?',
        botKo: '가족에게 얼마나 자주 전화하나요?',
        suggestions: ['I call them twice a week.', 'I call them once a week.', 'I call them every day.'],
      },
      {
        bot: 'Last one. Ask me a how often question.',
        botKo: '마지막이에요. how often 질문을 해보세요.',
        suggestions: ['How often do you exercise?', 'How often do you study?', 'How often do you eat out?'],
      },
    ],
    closing: {
      bot: 'Great! You talked about frequency in more detail.',
      botKo: '좋아요! 빈도를 더 자세히 말했어요.',
    },
  },

  'time-prepositions': {
    id: 'time-prepositions',
    steps: [
      {
        bot: 'When do you wake up?',
        botKo: '언제 일어나나요?',
        suggestions: ['I wake up at seven.', 'I wake up at six thirty.', 'I wake up at eight.'],
      },
      {
        bot: 'Good. When do you work?',
        botKo: '좋아요. 언제 일하나요?',
        suggestions: ['I work on Monday.', 'I work on weekdays.', 'I work in the afternoon.'],
      },
      {
        bot: 'Nice. When do you study?',
        botKo: '좋아요. 언제 공부하나요?',
        suggestions: ['I study in the morning.', 'I study at night.', 'I study on Sunday.'],
      },
      {
        bot: 'What do you do in the evening?',
        botKo: '저녁에는 무엇을 하나요?',
        suggestions: ['I walk in the evening.', 'I cook in the evening.', 'I rest in the evening.'],
      },
      {
        bot: 'Last one. Say one sentence with at, on, or in.',
        botKo: '마지막이에요. at, on, in 중 하나를 넣어 말해보세요.',
        suggestions: ['I wake up at seven.', 'I work on Friday.', 'I study in the morning.'],
      },
    ],
    closing: {
      bot: 'Nice! You used at, on, and in with time.',
      botKo: '좋아요! 시간 표현에 at, on, in을 사용했어요.',
    },
  },

  'making-invitations': {
    id: 'making-invitations',
    steps: [
      {
        bot: 'Invite me to do something.',
        botKo: '나를 무언가에 초대해보세요.',
        suggestions: ['Would you like to join us?', 'Do you want to see a movie?', 'Would you like to have dinner?'],
      },
      {
        bot: 'Sounds nice. When?',
        botKo: '좋네요. 언제요?',
        suggestions: ['Are you free tonight?', 'Let us meet on Friday.', 'How about this weekend?'],
      },
      {
        bot: 'Who else is joining?',
        botKo: '또 누가 함께하나요?',
        suggestions: ['My friend is joining us.', 'My brother is joining us.', 'It is just us.'],
      },
      {
        bot: 'Where should we meet?',
        botKo: '어디에서 만날까요?',
        suggestions: ['Let us meet at the cafe.', 'Let us meet at the station.', 'Let us meet outside.'],
      },
      {
        bot: 'Last one. Confirm the plan.',
        botKo: '마지막이에요. 계획을 확인해보세요.',
        suggestions: ['Great, see you tonight.', 'Okay, see you on Friday.', 'Sounds great.'],
      },
    ],
    closing: {
      bot: 'Excellent! You invited someone and made a plan.',
      botKo: '훌륭해요! 누군가를 초대하고 계획을 세웠어요.',
    },
  },

  'accept-decline': {
    id: 'accept-decline',
    steps: [
      {
        bot: 'Would you like to have dinner tonight?',
        botKo: '오늘 밤 저녁 먹을래요?',
        suggestions: ['Sure, I would love to.', 'Sorry, I am busy tonight.', 'Maybe next time.'],
      },
      {
        bot: 'Do you want to see a movie on Friday?',
        botKo: '금요일에 영화 보러 갈래요?',
        suggestions: ['That sounds great.', 'I cannot make it on Friday.', 'How about another time?'],
      },
      {
        bot: 'Can you join us this weekend?',
        botKo: '이번 주말에 함께할 수 있나요?',
        suggestions: ['Yes, I can join.', 'Sorry, I cannot make it.', 'Maybe next time.'],
      },
      {
        bot: 'What is the reason?',
        botKo: '이유가 무엇인가요?',
        suggestions: ['I am busy on the weekend.', 'I have a meeting.', 'I have family plans.'],
      },
      {
        bot: 'Last one. Suggest another time.',
        botKo: '마지막이에요. 다른 시간을 제안해보세요.',
        suggestions: ['How about another time?', 'Can we meet on Monday?', 'Maybe next week.'],
      },
    ],
    closing: {
      bot: 'Great! You accepted and declined invitations politely.',
      botKo: '좋아요! 초대를 공손하게 수락하고 거절했어요.',
    },
  },

  'reschedule-plans': {
    id: 'reschedule-plans',
    steps: [
      {
        bot: 'Are we still meeting today?',
        botKo: '우리 오늘 아직 만나는 거죠?',
        suggestions: ['Can we reschedule?', 'Yes, we are still meeting.', 'Something came up.'],
      },
      {
        bot: 'Oh, what happened?',
        botKo: '아, 무슨 일이 생겼나요?',
        suggestions: ['Something came up.', 'I have a meeting.', 'I am running late.'],
      },
      {
        bot: 'When should we meet instead?',
        botKo: '대신 언제 만날까요?',
        suggestions: ['Can we move it to Friday?', 'Can we meet at six instead?', 'How about tomorrow?'],
      },
      {
        bot: 'Friday works for me.',
        botKo: '금요일은 괜찮아요.',
        suggestions: ['Great, thank you.', 'Can you confirm the time?', 'Let us meet on Friday.'],
      },
      {
        bot: 'Last one. Apologize politely.',
        botKo: '마지막이에요. 공손하게 사과해보세요.',
        suggestions: ['Sorry about that.', 'Sorry, something came up.', 'Thank you for understanding.'],
      },
    ],
    closing: {
      bot: 'Nice! You rescheduled a plan politely.',
      botKo: '좋아요! 약속을 공손하게 변경했어요.',
    },
  },

  'transport-schedule': {
    id: 'transport-schedule',
    steps: [
      {
        bot: 'Where are you going?',
        botKo: '어디에 가고 있나요?',
        suggestions: ['I am going to the station.', 'I am going to school.', 'I am going downtown.'],
      },
      {
        bot: 'What time does the bus leave?',
        botKo: '버스는 몇 시에 출발하나요?',
        suggestions: ['It leaves at eight.', 'The bus leaves at nine.', 'I do not know.'],
      },
      {
        bot: 'What time does the train arrive?',
        botKo: '기차는 몇 시에 도착하나요?',
        suggestions: ['It arrives at nine.', 'The train arrives at noon.', 'It is delayed.'],
      },
      {
        bot: 'Which platform do you need?',
        botKo: '몇 번 승강장이 필요한가요?',
        suggestions: ['Which platform?', 'Platform two, please.', 'I need a ticket first.'],
      },
      {
        bot: 'Last one. Ask about the next bus.',
        botKo: '마지막이에요. 다음 버스에 대해 물어보세요.',
        suggestions: ['When is the next bus?', 'What time does the next bus leave?', 'Is the next bus delayed?'],
      },
    ],
    closing: {
      bot: 'Excellent! You asked about transportation schedules.',
      botKo: '훌륭해요! 교통 시간표를 물어봤어요.',
    },
  },

  'chores-errands': {
    id: 'chores-errands',
    steps: [
      {
        bot: 'What chores do you have to do this weekend?',
        botKo: '이번 주말에 어떤 집안일을 해야 하나요?',
        suggestions: ['I have to do laundry.', 'I have to wash the dishes.', 'I have to clean my room.'],
      },
      {
        bot: 'Do you need to run an errand today?',
        botKo: '오늘 심부름을 해야 하나요?',
        suggestions: ['Yes, I need to run an errand.', 'No, I do not.', 'I need to go grocery shopping.'],
      },
      {
        bot: 'When do you go grocery shopping?',
        botKo: '언제 장을 보나요?',
        suggestions: ['I go grocery shopping on Friday.', 'I go on Saturday.', 'I go after work.'],
      },
      {
        bot: 'Can you take out the trash?',
        botKo: '쓰레기를 내놓아 줄 수 있나요?',
        suggestions: ['Yes, I can.', 'Sure, no problem.', 'I can do it after dinner.'],
      },
      {
        bot: 'Last one. Say one thing you have to do.',
        botKo: '마지막이에요. 해야 할 일 하나를 말해보세요.',
        suggestions: ['I have to do laundry.', 'I need to run an errand.', 'I have to wash the dishes.'],
      },
    ],
    closing: {
      bot: 'Good job! You talked about chores and errands.',
      botKo: '잘했어요! 집안일과 심부름에 대해 말했어요.',
    },
  },

  'weather-plans-a2': {
    id: 'weather-plans-a2',
    steps: [
      {
        bot: 'How is the weather today?',
        botKo: '오늘 날씨가 어떤가요?',
        suggestions: ['It is rainy today.', 'It is sunny today.', 'It is cloudy now.'],
      },
      {
        bot: 'Is it cold outside?',
        botKo: '밖이 추운가요?',
        suggestions: ['Yes, it is cold outside.', 'No, it is warm.', 'It is hot today.'],
      },
      {
        bot: 'Should we meet outside?',
        botKo: '밖에서 만날까요?',
        suggestions: ['Let us meet outside.', 'It is rainy, so let us stay inside.', 'Let us meet inside.'],
      },
      {
        bot: 'What should we do if it rains?',
        botKo: '비가 오면 무엇을 할까요?',
        suggestions: ['Let us stay inside.', 'Let us go to a cafe.', 'Can we reschedule?'],
      },
      {
        bot: 'Last one. Make a plan based on the weather.',
        botKo: '마지막이에요. 날씨에 맞춰 계획을 말해보세요.',
        suggestions: ['It is sunny, so let us walk outside.', 'It is rainy, so let us stay inside.', 'It is cold, so let us meet at a cafe.'],
      },
    ],
    closing: {
      bot: 'Nice! You connected weather and plans.',
      botKo: '좋아요! 날씨와 계획을 연결했어요.',
    },
  },

  'weekly-schedule-talk': {
    id: 'weekly-schedule-talk',
    steps: [
      {
        bot: 'What is your weekly schedule like?',
        botKo: '주간 일정이 어떤가요?',
        suggestions: ['My weekly schedule is full.', 'My schedule is flexible.', 'I am busy on weekdays.'],
      },
      {
        bot: 'When are you available?',
        botKo: '언제 시간이 되나요?',
        suggestions: ['I am available on Thursday.', 'Friday works for me.', 'I am free on the weekend.'],
      },
      {
        bot: 'Are you fully booked on Monday?',
        botKo: '월요일 일정이 꽉 찼나요?',
        suggestions: ['Yes, I am fully booked on Monday.', 'No, I am available on Monday.', 'Monday does not work for me.'],
      },
      {
        bot: 'Can you confirm the time?',
        botKo: '시간을 확인해줄 수 있나요?',
        suggestions: ['Yes, I can confirm the time.', 'The meeting is at three.', 'Let me check my schedule.'],
      },
      {
        bot: 'Do you like to plan ahead?',
        botKo: '미리 계획하는 것을 좋아하나요?',
        suggestions: ['Yes, I like to plan ahead.', 'No, my schedule is flexible.', 'I usually plan ahead.'],
      },
      {
        bot: 'Last one. Suggest a time that works for you.',
        botKo: '마지막이에요. 괜찮은 시간을 제안해보세요.',
        suggestions: ['Thursday works for me.', 'I am available around six.', 'Friday afternoon works for me.'],
      },
    ],
    closing: {
      bot: 'Excellent! You managed a weekly schedule conversation.',
      botKo: '훌륭해요! 주간 일정 조율 대화를 해냈어요.',
    },
  },

  'level6-review-test': {
    id: 'level6-review-test',
    steps: [
      {
        bot: "Let's review Level 6. When are you free this week?",
        botKo: 'Level 6를 복습해요. 이번 주 언제 시간이 되나요?',
        suggestions: ['I am free on Wednesday.', 'Friday works for me.', 'I am available on the weekend.'],
      },
      {
        bot: 'Good. What time should we meet?',
        botKo: '좋아요. 몇 시에 만날까요?',
        suggestions: ['Let us meet at noon.', 'I am free around six.', 'Please come at nine sharp.'],
      },
      {
        bot: 'Nice. How often do you exercise?',
        botKo: '좋아요. 얼마나 자주 운동하나요?',
        suggestions: ['I exercise once a week.', 'I exercise twice a week.', 'I rarely exercise.'],
      },
      {
        bot: 'Invite me to do something.',
        botKo: '나를 무언가에 초대해보세요.',
        suggestions: ['Would you like to join us?', 'Do you want to see a movie?', 'Let us have dinner together.'],
      },
      {
        bot: 'Now reschedule the plan.',
        botKo: '이제 약속을 변경해보세요.',
        suggestions: ['Can we reschedule?', 'Something came up.', 'Can we move it to Friday?'],
      },
      {
        bot: 'Ask about a bus or train time.',
        botKo: '버스나 기차 시간을 물어보세요.',
        suggestions: ['What time does the bus leave?', 'When is the next train?', 'Is the train delayed?'],
      },
      {
        bot: 'Last one. Confirm the weekly plan.',
        botKo: '마지막이에요. 주간 계획을 확인해보세요.',
        suggestions: ['Can you confirm the time?', 'Thursday works for me.', 'My schedule is flexible.'],
      },
    ],
    closing: {
      bot: 'Excellent! You finished the Level 6 conversation test.',
      botKo: '훌륭해요! Level 6 회화 테스트를 마쳤어요.',
    },
  },

  'can-abilities': {
    id: 'can-abilities',
    steps: [
      {
        bot: 'What can you do in English?',
        botKo: '영어로 무엇을 할 수 있나요?',
        suggestions: ['I can speak English.', 'I can read short sentences.', 'I can introduce myself.'],
      },
      {
        bot: 'Nice. Can you drive?',
        botKo: '좋아요. 운전할 수 있나요?',
        suggestions: ['Yes, I can drive.', 'No, I cannot drive.', 'I can drive a little.'],
      },
      {
        bot: 'What is something you cannot do well yet?',
        botKo: '아직 잘 못하는 것은 무엇인가요?',
        suggestions: ['I cannot swim well.', 'I cannot speak fast.', 'I cannot cook well.'],
      },
      {
        bot: 'Can someone in your family cook well?',
        botKo: '가족 중 누군가 요리를 잘할 수 있나요?',
        suggestions: ['My mother can cook well.', 'My brother can cook dinner.', 'No one can cook well.'],
      },
      {
        bot: 'Last one. Ask me what I can do.',
        botKo: '마지막이에요. 제가 무엇을 할 수 있는지 물어보세요.',
        suggestions: ['What can you do?', 'Can you speak Korean?', 'Can you help me study?'],
      },
    ],
    closing: {
      bot: 'Great! You talked about abilities with can.',
      botKo: '좋아요! can으로 능력을 말했어요.',
    },
  },

  'ask-permission': {
    id: 'ask-permission',
    steps: [
      {
        bot: 'You are in a classroom. What do you want to ask?',
        botKo: '교실에 있어요. 무엇을 물어보고 싶나요?',
        suggestions: ['Can I open the window?', 'Can I borrow your pen?', 'Can I leave early?'],
      },
      {
        bot: 'Yes, you can. What else do you need?',
        botKo: '네, 그래도 돼요. 또 무엇이 필요한가요?',
        suggestions: ['Can I borrow your pen?', 'Can I use your phone?', 'Can I sit here?'],
      },
      {
        bot: 'Sorry, you cannot enter now. What do you say?',
        botKo: '죄송하지만 지금은 들어갈 수 없어요. 뭐라고 말할까요?',
        suggestions: ['Okay, I will wait.', 'Can I enter later?', 'No problem.'],
      },
      {
        bot: 'Can I close the door?',
        botKo: '문을 닫아도 될까요?',
        suggestions: ['Yes, you can.', 'No, please keep it open.', 'Sure, thank you.'],
      },
      {
        bot: 'Last one. Ask for permission politely.',
        botKo: '마지막이에요. 공손하게 허락을 구해보세요.',
        suggestions: ['Can I leave early?', 'Can I sit in this seat?', 'Can I open the window?'],
      },
    ],
    closing: {
      bot: 'Good job! You asked for permission clearly.',
      botKo: '잘했어요! 허락을 분명하게 구했어요.',
    },
  },

  'polite-requests-a2': {
    id: 'polite-requests-a2',
    steps: [
      {
        bot: 'How can I help you?',
        botKo: '어떻게 도와드릴까요?',
        suggestions: ['Could you help me?', 'Could you repeat that?', 'Can you show me the way?'],
      },
      {
        bot: 'Sure. What should I repeat?',
        botKo: '물론이죠. 무엇을 다시 말해드릴까요?',
        suggestions: ['Could you repeat that?', 'Could you speak slowly?', 'Could you say it again?'],
      },
      {
        bot: 'Can you wait a minute?',
        botKo: '잠깐 기다려줄 수 있나요?',
        suggestions: ['Yes, I can wait.', 'Sure, no problem.', 'Sorry, I am in a hurry.'],
      },
      {
        bot: 'What do you need me to carry?',
        botKo: '무엇을 들어드릴까요?',
        suggestions: ['Can you carry this bag?', 'Could you carry this box?', 'Can you help me with this?'],
      },
      {
        bot: 'Last one. Ask for help very politely.',
        botKo: '마지막이에요. 아주 공손하게 도움을 요청해보세요.',
        suggestions: ['Could you help me, please?', 'Could you wait a minute, please?', 'Could you show me the way?'],
      },
    ],
    closing: {
      bot: 'Excellent! You made polite requests.',
      botKo: '훌륭해요! 공손하게 부탁했어요.',
    },
  },

  'offer-help-a2': {
    id: 'offer-help-a2',
    steps: [
      {
        bot: 'I have a small problem.',
        botKo: '작은 문제가 있어요.',
        suggestions: ['Can I help you?', 'What is the problem?', 'Do you need anything?'],
      },
      {
        bot: 'I need some water.',
        botKo: '물이 좀 필요해요.',
        suggestions: ['I can bring water.', 'Do you need anything else?', 'I can help.'],
      },
      {
        bot: 'This app is not working.',
        botKo: '이 앱이 작동하지 않아요.',
        suggestions: ['I can fix it.', 'You should restart it.', 'Can I see it?'],
      },
      {
        bot: 'We need to choose a place.',
        botKo: '장소를 골라야 해요.',
        suggestions: ['I can choose a place.', 'I can support the team.', 'Let us choose a cafe.'],
      },
      {
        bot: 'Last one. Offer one specific help.',
        botKo: '마지막이에요. 구체적인 도움 하나를 제안해보세요.',
        suggestions: ['I can bring water.', 'I can fix it.', 'I can choose a place.'],
      },
    ],
    closing: {
      bot: 'Nice! You offered help naturally.',
      botKo: '좋아요! 자연스럽게 도움을 제안했어요.',
    },
  },

  'give-advice': {
    id: 'give-advice',
    steps: [
      {
        bot: 'I am very tired today.',
        botKo: '오늘 너무 피곤해요.',
        suggestions: ['You should rest today.', 'You should sleep early.', 'You should drink water.'],
      },
      {
        bot: 'I do not sleep well.',
        botKo: '잠을 잘 못 자요.',
        suggestions: ['You should sleep early.', 'You should not drink coffee at night.', 'You should rest more.'],
      },
      {
        bot: 'I want to be healthier.',
        botKo: '더 건강해지고 싶어요.',
        suggestions: ['You should exercise more.', 'You should eat healthy food.', 'You should drink water.'],
      },
      {
        bot: 'My head hurts.',
        botKo: '머리가 아파요.',
        suggestions: ['You should see a doctor.', 'You should rest.', 'You should take medicine.'],
      },
      {
        bot: 'Last one. Give me one short piece of advice.',
        botKo: '마지막이에요. 짧은 조언 하나를 해보세요.',
        suggestions: ['You should rest today.', 'You should sleep early.', 'You should see a doctor.'],
      },
    ],
    closing: {
      bot: 'Good advice! You used should well.',
      botKo: '좋은 조언이에요! should를 잘 썼어요.',
    },
  },

  'safety-rules': {
    id: 'safety-rules',
    steps: [
      {
        bot: 'Can I smoke here?',
        botKo: '여기서 담배를 피워도 될까요?',
        suggestions: ['You should not smoke here.', 'Smoking is prohibited.', 'No, you cannot.'],
      },
      {
        bot: 'Can I park here?',
        botKo: '여기 주차해도 될까요?',
        suggestions: ['You should not park here.', 'No, parking is not allowed.', 'You should park over there.'],
      },
      {
        bot: 'Can I touch this?',
        botKo: '이걸 만져도 될까요?',
        suggestions: ['You should not touch it.', 'Please be careful.', 'No, you cannot touch it.'],
      },
      {
        bot: 'What should I do here?',
        botKo: '여기서는 어떻게 해야 하나요?',
        suggestions: ['You should be quiet here.', 'You should follow the rules.', 'You should be careful.'],
      },
      {
        bot: 'Last one. Give me one safety rule.',
        botKo: '마지막이에요. 안전 규칙 하나를 말해보세요.',
        suggestions: ['You should be careful.', 'You should not touch it.', 'You should follow the rules.'],
      },
    ],
    closing: {
      bot: 'Well done! You explained rules and warnings.',
      botKo: '잘했어요! 규칙과 주의 사항을 설명했어요.',
    },
  },

  'necessity-plans': {
    id: 'necessity-plans',
    steps: [
      {
        bot: 'What do you need to do today?',
        botKo: '오늘 무엇을 해야 하나요?',
        suggestions: ['I need to prepare.', 'I need to submit the form.', 'I need to pay today.'],
      },
      {
        bot: 'What is the deadline?',
        botKo: '마감일이 언제인가요?',
        suggestions: ['The deadline is Friday.', 'The deadline is today.', 'I need to check the deadline.'],
      },
      {
        bot: 'What must I bring?',
        botKo: '무엇을 꼭 가져와야 하나요?',
        suggestions: ['You must bring your ID.', 'You must bring the form.', 'You must bring your passport.'],
      },
      {
        bot: 'Do you need to fill out this form?',
        botKo: '이 양식을 작성해야 하나요?',
        suggestions: ['Yes, I need to fill out this form.', 'No, I do not need to.', 'I need to submit it later.'],
      },
      {
        bot: 'Last one. Say one thing you need to do.',
        botKo: '마지막이에요. 해야 할 일 하나를 말해보세요.',
        suggestions: ['I need to prepare.', 'I need to submit the form.', 'I need to pay today.'],
      },
    ],
    closing: {
      bot: 'Great! You organized necessary tasks.',
      botKo: '좋아요! 해야 할 일을 정리했어요.',
    },
  },

  'health-advice': {
    id: 'health-advice',
    steps: [
      {
        bot: 'I do not feel well.',
        botKo: '몸이 좋지 않아요.',
        suggestions: ['What is wrong?', 'Do you have a headache?', 'You should rest.'],
      },
      {
        bot: 'I have a headache.',
        botKo: '두통이 있어요.',
        suggestions: ['You should rest today.', 'You should drink water.', 'You should take medicine.'],
      },
      {
        bot: 'I have a fever too.',
        botKo: '열도 있어요.',
        suggestions: ['You should see a doctor.', 'You should go to a clinic.', 'You should rest at home.'],
      },
      {
        bot: 'Can you make a doctor appointment?',
        botKo: '진료 예약을 잡아줄 수 있나요?',
        suggestions: ['Yes, I can help.', 'You should call the clinic.', 'I can make an appointment.'],
      },
      {
        bot: 'Last one. Give health advice.',
        botKo: '마지막이에요. 건강 조언을 해보세요.',
        suggestions: ['You should see a doctor.', 'You should take medicine.', 'You should rest today.'],
      },
    ],
    closing: {
      bot: 'Nice! You talked about symptoms and advice.',
      botKo: '좋아요! 증상과 조언을 말했어요.',
    },
  },

  'public-rules-a2': {
    id: 'public-rules-a2',
    steps: [
      {
        bot: 'Can I take photos here?',
        botKo: '여기서 사진을 찍어도 될까요?',
        suggestions: ['Photos are not allowed here.', 'Yes, photos are allowed.', 'Please read the sign.'],
      },
      {
        bot: 'Can I eat food here?',
        botKo: '여기서 음식을 먹어도 될까요?',
        suggestions: ['Food is not permitted here.', 'You should not eat here.', 'Please eat outside.'],
      },
      {
        bot: 'Where should I wait?',
        botKo: '어디서 기다려야 하나요?',
        suggestions: ['You should wait in line.', 'Please wait at the entrance.', 'You should wait over there.'],
      },
      {
        bot: 'Where is the exit?',
        botKo: '출구가 어디인가요?',
        suggestions: ['The exit is over there.', 'Please follow the sign.', 'The exit is near the entrance.'],
      },
      {
        bot: 'Last one. Explain one public rule.',
        botKo: '마지막이에요. 공공장소 규칙 하나를 설명해보세요.',
        suggestions: ['Photos are not allowed here.', 'You should wait in line.', 'Smoking is prohibited.'],
      },
    ],
    closing: {
      bot: 'Excellent! You explained public rules.',
      botKo: '훌륭해요! 공공장소 규칙을 설명했어요.',
    },
  },

  'phone-message-requests': {
    id: 'phone-message-requests',
    steps: [
      {
        bot: 'My battery is low.',
        botKo: '배터리가 부족해요.',
        suggestions: ['Can I borrow your charger?', 'I can bring a charger.', 'You should charge your phone.'],
      },
      {
        bot: 'What is the Wi-Fi password?',
        botKo: '와이파이 비밀번호가 뭐예요?',
        suggestions: ['I need the password.', 'Can you show me the password?', 'I do not know the password.'],
      },
      {
        bot: 'Could you send me the file?',
        botKo: '파일을 보내주실 수 있나요?',
        suggestions: ['Yes, I can send it.', 'Could you email me the file?', 'I did not receive it.'],
      },
      {
        bot: 'Can you message me later?',
        botKo: '나중에 메시지 보내줄 수 있나요?',
        suggestions: ['Yes, I can message you later.', 'Can you send me a message?', 'I will call you later.'],
      },
      {
        bot: 'Last one. Ask for one phone-related favor.',
        botKo: '마지막이에요. 휴대폰 관련 부탁 하나를 해보세요.',
        suggestions: ['Can I use your phone?', 'Can I borrow your charger?', 'Can you send me a message?'],
      },
    ],
    closing: {
      bot: 'Good job! You handled phone and message requests.',
      botKo: '잘했어요! 전화와 메시지 부탁을 처리했어요.',
    },
  },

  'tech-problems': {
    id: 'tech-problems',
    steps: [
      {
        bot: 'My phone is broken.',
        botKo: '휴대폰이 고장 났어요.',
        suggestions: ['You should restart it.', 'Can I see it?', 'You should take it to a store.'],
      },
      {
        bot: 'The connection is slow.',
        botKo: '연결이 느려요.',
        suggestions: ['You should try again.', 'You should check the Wi-Fi.', 'You should restart the app.'],
      },
      {
        bot: 'I see an error message.',
        botKo: '오류 메시지가 보여요.',
        suggestions: ['Can you show me the error?', 'You should update the app.', 'You should click this button.'],
      },
      {
        bot: 'The screen is black.',
        botKo: '화면이 검어요.',
        suggestions: ['You should restart it.', 'You should charge your phone.', 'The battery may be low.'],
      },
      {
        bot: 'Last one. Suggest one solution.',
        botKo: '마지막이에요. 해결책 하나를 제안해보세요.',
        suggestions: ['You should restart it.', 'You should update the app.', 'You should try again.'],
      },
    ],
    closing: {
      bot: 'Nice! You explained tech problems and solutions.',
      botKo: '좋아요! 기기 문제와 해결책을 설명했어요.',
    },
  },

  'travel-help-can': {
    id: 'travel-help-can',
    steps: [
      {
        bot: 'Welcome. How can I help you?',
        botKo: '어서 오세요. 어떻게 도와드릴까요?',
        suggestions: ['I have a reservation.', 'Can I check in now?', 'I need information.'],
      },
      {
        bot: 'Do you need help with your baggage?',
        botKo: '수하물 도움이 필요하신가요?',
        suggestions: ['Can you help me with my baggage?', 'Yes, please.', 'No, I am okay.'],
      },
      {
        bot: 'You must show your passport.',
        botKo: '여권을 보여줘야 해요.',
        suggestions: ['Here is my passport.', 'Can I use my ID?', 'I need to find my passport.'],
      },
      {
        bot: 'The flight is delayed.',
        botKo: '비행기가 지연됐어요.',
        suggestions: ['How long is the delay?', 'Where is gate five?', 'I need more information.'],
      },
      {
        bot: 'Last one. Ask for travel help.',
        botKo: '마지막이에요. 여행 중 도움을 요청해보세요.',
        suggestions: ['Can you help me with my baggage?', 'Can I check in now?', 'Where is gate five?'],
      },
    ],
    closing: {
      bot: 'Excellent! You asked for travel help clearly.',
      botKo: '훌륭해요! 여행 도움을 분명히 요청했어요.',
    },
  },

  'problem-solving-a2': {
    id: 'problem-solving-a2',
    steps: [
      {
        bot: 'I have a problem and cannot decide.',
        botKo: '문제가 있고 결정하지 못하겠어요.',
        suggestions: ['What should I do?', 'What are my options?', 'What do you recommend?'],
      },
      {
        bot: 'You have two options.',
        botKo: '선택지가 두 개 있어요.',
        suggestions: ['What are my options?', 'Which option is better?', 'Can you recommend one?'],
      },
      {
        bot: 'Option one is faster, but option two is cheaper.',
        botKo: '1번은 더 빠르지만 2번은 더 저렴해요.',
        suggestions: ['You should choose option one.', 'You should choose option two.', 'I need to think.'],
      },
      {
        bot: 'Is that possible today?',
        botKo: '오늘 그게 가능한가요?',
        suggestions: ['Yes, it is possible.', 'No, it is not possible today.', 'Maybe we can try tomorrow.'],
      },
      {
        bot: 'What should we try first?',
        botKo: '먼저 무엇을 시도해야 할까요?',
        suggestions: ['You should try this.', 'We should try option one.', 'Let us try again.'],
      },
      {
        bot: 'Last one. Ask for a recommendation.',
        botKo: '마지막이에요. 추천을 요청해보세요.',
        suggestions: ['What do you recommend?', 'Which option is better?', 'What should I do?'],
      },
    ],
    closing: {
      bot: 'Great! You solved a problem through conversation.',
      botKo: '좋아요! 대화로 문제를 해결했어요.',
    },
  },

  'level7-review-test': {
    id: 'level7-review-test',
    steps: [
      {
        bot: 'Let us review Level 7. Tell me one thing you can do.',
        botKo: 'Level 7를 복습해요. 할 수 있는 일 하나를 말해보세요.',
        suggestions: ['I can speak English.', 'I can use this app.', 'I can help you.'],
      },
      {
        bot: 'Ask me for permission.',
        botKo: '저에게 허락을 구해보세요.',
        suggestions: ['Can I open the window?', 'Can I borrow your pen?', 'Can I leave early?'],
      },
      {
        bot: 'Now make a polite request.',
        botKo: '이제 공손하게 부탁해보세요.',
        suggestions: ['Could you help me?', 'Could you repeat that?', 'Could you wait a minute?'],
      },
      {
        bot: 'Give me health advice.',
        botKo: '건강 조언을 해보세요.',
        suggestions: ['You should rest today.', 'You should drink water.', 'You should see a doctor.'],
      },
      {
        bot: 'Explain a rule in a public place.',
        botKo: '공공장소 규칙을 설명해보세요.',
        suggestions: ['Photos are not allowed here.', 'You should wait in line.', 'Smoking is prohibited.'],
      },
      {
        bot: 'Ask for help with a phone or travel problem.',
        botKo: '휴대폰이나 여행 문제로 도움을 요청해보세요.',
        suggestions: ['Can I borrow your charger?', 'Can you help me with my baggage?', 'Could you email me the file?'],
      },
      {
        bot: 'Last one. Ask what you should do.',
        botKo: '마지막이에요. 어떻게 해야 하는지 물어보세요.',
        suggestions: ['What should I do?', 'What are my options?', 'What do you recommend?'],
      },
    ],
    closing: {
      bot: 'Excellent! You finished the Level 7 conversation test.',
      botKo: '훌륭해요! Level 7 회화 테스트를 마쳤어요.',
    },
  },
};
