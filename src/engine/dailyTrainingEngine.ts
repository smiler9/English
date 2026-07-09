import { LEVELS } from '../data/levels';
import {
  BuildItem,
  ConversationContent,
  Lesson,
  ListeningItem,
  QuizQuestion,
  SpeakingContent,
  VocabWord,
} from '../types/curriculum';

export interface DailyTraining {
  id: string;
  dateKey: string;
  levelId: number;
  xp: number;
  title: string;
  vocab: VocabWord[];
  build: BuildItem[];
  listening: ListeningItem[];
  speaking: SpeakingContent['prompts'];
  review: QuizQuestion[];
  conversation?: ConversationContent;
}

interface ProgressInput {
  completedLessons: Record<string, boolean>;
  weakItems: string[];
}

const DAILY_COUNTS = {
  vocab: 10,
  build: 5,
  listening: 5,
  speaking: 5,
  review: 6,
} as const;

export function createDailyTraining(progress: ProgressInput, date = new Date()): DailyTraining {
  const dateKey = getDailyDateKey(date);
  const levelId = pickTargetLevel(progress.completedLessons);
  const lessons = getLessonsThroughLevel(levelId);
  const seedBase = `${dateKey}:${levelId}:${progress.weakItems.join('|')}`;

  const vocab = pickDaily(
    collectVocab(lessons),
    DAILY_COUNTS.vocab,
    `${seedBase}:vocab`,
    (word) => `${word.en}:${word.ko}`,
    progress.weakItems
  );
  const build = pickDaily(
    collectBuild(lessons),
    DAILY_COUNTS.build,
    `${seedBase}:build`,
    (item) => `${item.ko}:${item.answer.join(' ')}`,
    progress.weakItems
  );
  const listening = pickDaily(
    collectListening(lessons),
    DAILY_COUNTS.listening,
    `${seedBase}:listening`,
    (item) => item.audioText,
    progress.weakItems
  );
  const speaking = pickDaily(
    collectSpeaking(lessons),
    DAILY_COUNTS.speaking,
    `${seedBase}:speaking`,
    (item) => item.en,
    progress.weakItems
  );
  const review = pickDaily(
    collectReview(lessons),
    DAILY_COUNTS.review,
    `${seedBase}:review`,
    (question) => question.prompt,
    progress.weakItems
  );
  const conversation = pickConversation(lessons, `${seedBase}:conversation`);

  return {
    id: getDailyTrainingId(date),
    dateKey,
    levelId,
    xp: 35,
    title: '오늘의 훈련',
    vocab,
    build,
    listening,
    speaking,
    review,
    conversation,
  };
}

export function getDailyTrainingId(date = new Date()) {
  return `daily-${getDailyDateKey(date)}`;
}

export function getDailyDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function pickTargetLevel(completedLessons: Record<string, boolean>) {
  const maxReadyLevel = Math.max(...LEVELS.filter((level) => level.units?.length).map((level) => level.id));
  const completedLevelIds = Object.keys(completedLessons)
    .map((id) => Number(id.split('-')[0]))
    .filter((id) => Number.isInteger(id) && id >= 1);
  const touchedLevel = completedLevelIds.length ? Math.max(...completedLevelIds) : 1;
  return Math.min(Math.max(touchedLevel, 1), maxReadyLevel);
}

function getLessonsThroughLevel(levelId: number) {
  return LEVELS.filter((level) => level.units?.length && level.id <= levelId).flatMap((level) =>
    level.units!.flatMap((unit) => unit.lessons)
  );
}

function collectVocab(lessons: Lesson[]) {
  return lessons.flatMap((lesson) => (lesson.content.kind === 'vocab' ? lesson.content.words : []));
}

function collectBuild(lessons: Lesson[]) {
  return lessons.flatMap((lesson) => (lesson.content.kind === 'build' ? lesson.content.items : []));
}

function collectListening(lessons: Lesson[]) {
  return lessons.flatMap((lesson) =>
    lesson.content.kind === 'listening' ? lesson.content.items : []
  );
}

function collectSpeaking(lessons: Lesson[]) {
  return lessons.flatMap((lesson) =>
    lesson.content.kind === 'speaking' ? lesson.content.prompts : []
  );
}

function collectReview(lessons: Lesson[]) {
  return lessons.flatMap((lesson) =>
    lesson.content.kind === 'review' || lesson.content.kind === 'test'
      ? lesson.content.questions
      : []
  );
}

function pickConversation(lessons: Lesson[], seed: string) {
  const conversations = lessons.flatMap((lesson) =>
    lesson.content.kind === 'conversation' ? [lesson.content] : []
  );
  return seededShuffle(conversations, seed)[0];
}

function pickDaily<T>(
  items: T[],
  count: number,
  seed: string,
  keyOf: (item: T) => string,
  weakItems: string[]
) {
  const uniqueItems = uniqueBy(items, keyOf);
  const weakText = weakItems.join(' ').toLowerCase();
  const shuffled = seededShuffle(uniqueItems, seed);

  return shuffled
    .map((item) => ({
      item,
      score: weakText ? scoreWeakMatch(keyOf(item), weakText) : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ item }) => item);
}

function uniqueBy<T>(items: T[], keyOf: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyOf(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function scoreWeakMatch(key: string, weakText: string) {
  const normalizedKey = key.toLowerCase();
  if (weakText.includes(normalizedKey)) return 3;
  return normalizedKey
    .split(/[^a-z0-9가-힣']+/)
    .filter((token) => token.length >= 2 && weakText.includes(token))
    .length;
}

function seededShuffle<T>(items: T[], seed: string) {
  const random = mulberry32(hashString(seed));
  return [...items]
    .map((item) => ({ item, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
