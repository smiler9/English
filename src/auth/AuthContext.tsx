import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthResponse,
  ServerUser,
  loginAccount,
  logoutAccount,
  registerAccount,
} from '../api/server';

interface RecentUser {
  id: string;
  name: string;
  lastLoginAt: string;
}

interface SavedSession {
  token: string;
  user: ServerUser;
}

interface AuthContextValue {
  currentUser: ServerUser | null;
  authToken: string | null;
  users: RecentUser[];
  loaded: boolean;
  login: (name: string, password: string) => Promise<AuthResponse>;
  register: (name: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const SESSION_KEY = '@english_training/auth/session/v2';
const RECENT_USERS_KEY = '@english_training/auth/recent_users/v2';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SavedSession | null>(null);
  const [users, setUsers] = useState<RecentUser[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;

    Promise.all([AsyncStorage.getItem(SESSION_KEY), AsyncStorage.getItem(RECENT_USERS_KEY)])
      .then(([sessionRaw, usersRaw]) => {
        if (!alive) return;
        setSession(parseSession(sessionRaw));
        setUsers(parseRecentUsers(usersRaw));
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoaded(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  const login = async (name: string, password: string) => {
    const result = await loginAccount(name, password);
    await saveSession(result);
    return result;
  };

  const register = async (name: string, password: string) => {
    const result = await registerAccount(name, password);
    await saveSession(result);
    return result;
  };

  const saveSession = async (result: AuthResponse) => {
    const nextSession = { token: result.token, user: result.user };
    const nextUsers = upsertRecentUser(users, result.user);

    await AsyncStorage.multiSet([
      [SESSION_KEY, JSON.stringify(nextSession)],
      [RECENT_USERS_KEY, JSON.stringify(nextUsers)],
    ]);

    setSession(nextSession);
    setUsers(nextUsers);
  };

  const logout = async () => {
    const token = session?.token;
    await AsyncStorage.removeItem(SESSION_KEY);
    setSession(null);
    if (token) logoutAccount(token).catch(() => {});
  };

  const value = useMemo(
    () => ({
      currentUser: session?.user ?? null,
      authToken: session?.token ?? null,
      users,
      loaded,
      login,
      register,
      logout,
    }),
    [session, users, loaded]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

function upsertRecentUser(users: RecentUser[], user: ServerUser) {
  const nextUser = { id: user.id, name: user.name, lastLoginAt: new Date().toISOString() };
  return [nextUser, ...users.filter((item) => item.id !== user.id)].slice(0, 8);
}

function parseSession(raw: string | null): SavedSession | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<SavedSession>;
    if (
      parsed &&
      typeof parsed.token === 'string' &&
      parsed.user &&
      typeof parsed.user.id === 'string' &&
      typeof parsed.user.name === 'string'
    ) {
      return { token: parsed.token, user: parsed.user };
    }
  } catch {}
  return null;
}

function parseRecentUsers(raw: string | null): RecentUser[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isRecentUser) : [];
  } catch {
    return [];
  }
}

function isRecentUser(value: unknown): value is RecentUser {
  if (!value || typeof value !== 'object') return false;
  const user = value as Partial<RecentUser>;
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.lastLoginAt === 'string'
  );
}
