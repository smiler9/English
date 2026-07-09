/** 앱 전역 디자인 토큰 */
export const theme = {
  colors: {
    bg: '#0f1220',
    card: '#1b1f33',
    cardAlt: '#232841',
    primary: '#5b8cff',
    primaryDim: '#33427a',
    success: '#3ddc97',
    danger: '#ff6b6b',
    warning: '#ffd166',
    text: '#f5f7ff',
    textDim: '#a8b0cf',
    border: '#2c3350',
    locked: '#3a3f57',
  },
  radius: { sm: 8, md: 14, lg: 22, pill: 999 },
  space: (n: number) => n * 4,
} as const;

/** 레슨 타입별 아이콘/라벨 (화면에서 공용) */
export const LESSON_META: Record<
  string,
  { icon: string; label: string }
> = {
  vocab: { icon: '📘', label: '단어' },
  grammar: { icon: '🧩', label: '문법' },
  build: { icon: '🔨', label: '문장 조립' },
  listening: { icon: '🎧', label: '듣기' },
  speaking: { icon: '🎤', label: '따라 말하기' },
  conversation: { icon: '💬', label: 'AI 회화' },
  review: { icon: '🔁', label: '복습' },
  test: { icon: '🏁', label: '테스트' },
};
