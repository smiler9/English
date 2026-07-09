/** 화면 간 이동 파라미터 정의 */
export type RootStackParamList = {
  Home: undefined;
  Daily: undefined;
  Level: { levelId: number };
  Lesson: { levelId: number; unitId: string; lessonId: string };
  Conversation: {
    levelId: number;
    lessonId: string;
    xp: number;
    scenarioId: string;
    title: string;
    situation: string;
  };
};
