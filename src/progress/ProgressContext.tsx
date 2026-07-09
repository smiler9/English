import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../auth/AuthContext';
import { fetchProgress, saveProgress } from '../api/server';

/**
 * 진도/약점 저장소 (앱 차별점의 기반).
 * "약점 기반 복습, 레벨 승급"이 가능하려면 진도 스키마가 처음부터 잘 잡혀야 한다.
 * 지금은 AsyncStorage(로컬)에 저장 — 나중에 서버 동기화로 확장 가능.
 */
export interface ProgressState {
  completedLessons: Record<string, boolean>; // lessonId -> 완료
  xp: number;
  /** 약점: 틀린 항목 기록 (복습에 사용) */
  weakItems: string[];
}

interface ProgressContextValue extends ProgressState {
  completeLesson: (lessonId: string, xp: number) => void;
  addWeakItem: (label: string) => void;
  isLessonDone: (lessonId: string) => boolean;
  reset: () => void;
}

const STORAGE_PREFIX = '@english_training/progress/v1';
const LEGACY_STORAGE_KEY = STORAGE_PREFIX;
const LEGACY_MIGRATION_KEY = `${STORAGE_PREFIX}/legacy_migrated_to`;
const initial: ProgressState = { completedLessons: {}, xp: 0, weakItems: [] };

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, authToken } = useAuth();
  const [state, setState] = useState<ProgressState>(initial);
  const [loaded, setLoaded] = useState(false);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const storageKey = currentUser ? getUserProgressKey(currentUser.id) : null;

  // 사용자별 저장된 진도를 불러온다.
  useEffect(() => {
    let alive = true;
    setLoaded(false);
    setLoadedKey(null);
    setState(initial);

    if (!storageKey || !currentUser) {
      setLoaded(true);
      return () => {
        alive = false;
      };
    }

    AsyncStorage.multiGet([storageKey, LEGACY_STORAGE_KEY, LEGACY_MIGRATION_KEY])
      .then(async ([[, userRaw], [, legacyRaw], [, migratedTo]]) => {
        if (!alive) return;

        const localProgress = userRaw ? parseProgress(userRaw) : initial;
        let nextProgress = localProgress;

        if (userRaw) {
          nextProgress = localProgress;
        } else if (legacyRaw && !migratedTo) {
          nextProgress = parseProgress(legacyRaw);
          await AsyncStorage.multiSet([
            [storageKey, legacyRaw],
            [LEGACY_MIGRATION_KEY, currentUser.id],
          ]);
        }

        if (authToken) {
          try {
            const remoteProgress = await fetchProgress(authToken);
            nextProgress = mergeProgress(nextProgress, remoteProgress);
          } catch {}
        }

        setState(nextProgress);
      })
      .catch(() => {})
      .finally(() => {
        if (!alive) return;
        setLoadedKey(storageKey);
        setLoaded(true);
      });

    return () => {
      alive = false;
    };
  }, [authToken, currentUser, storageKey]);

  // 변경 시 현재 로그인 사용자의 저장소에만 저장한다.
  useEffect(() => {
    if (loaded && storageKey && loadedKey === storageKey) {
      AsyncStorage.setItem(storageKey, JSON.stringify(state)).catch(() => {});
      if (authToken) saveProgress(authToken, state).catch(() => {});
    }
  }, [authToken, state, loaded, loadedKey, storageKey]);

  const completeLesson = (lessonId: string, xp: number) =>
    setState((s) => {
      if (s.completedLessons[lessonId]) return s; // 이미 완료 → XP 중복 없음
      return {
        ...s,
        completedLessons: { ...s.completedLessons, [lessonId]: true },
        xp: s.xp + xp,
      };
    });

  const addWeakItem = (label: string) =>
    setState((s) =>
      s.weakItems.includes(label) ? s : { ...s, weakItems: [...s.weakItems, label] }
    );

  const isLessonDone = (lessonId: string) => !!state.completedLessons[lessonId];
  const reset = () => setState(initial);

  return (
    <ProgressContext.Provider
      value={{ ...state, completeLesson, addWeakItem, isLessonDone, reset }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}

function getUserProgressKey(userId: string) {
  return `${STORAGE_PREFIX}/${encodeURIComponent(userId)}`;
}

function parseProgress(raw: string): ProgressState {
  try {
    return normalizeProgress(JSON.parse(raw));
  } catch {
    return initial;
  }
}

function normalizeProgress(value: unknown): ProgressState {
  if (!value || typeof value !== 'object') return initial;
  const progress = value as Partial<ProgressState>;
  return {
    completedLessons:
      progress.completedLessons && typeof progress.completedLessons === 'object'
        ? progress.completedLessons
        : {},
    xp: typeof progress.xp === 'number' && progress.xp > 0 ? progress.xp : 0,
    weakItems: Array.isArray(progress.weakItems) ? progress.weakItems : [],
  };
}

function mergeProgress(local: ProgressState, remote: ProgressState): ProgressState {
  return {
    completedLessons: { ...remote.completedLessons, ...local.completedLessons },
    xp: Math.max(local.xp, remote.xp),
    weakItems: Array.from(new Set([...remote.weakItems, ...local.weakItems])),
  };
}
