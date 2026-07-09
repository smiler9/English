import { Platform } from 'react-native';
import type { ProgressState } from '../progress/ProgressContext';

export interface ServerUser {
  id: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: ServerUser;
  progress: ProgressState;
}

const API_BASE_URL =
  Platform.OS === 'web' ? '/api' : 'https://english.smiler9.ai.kr/api';

export async function registerAccount(name: string, password: string) {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: { name, password },
  });
}

export async function loginAccount(name: string, password: string) {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { name, password },
  });
}

export async function logoutAccount(token: string) {
  return apiRequest<{ ok: boolean }>('/auth/logout', {
    method: 'POST',
    token,
  });
}

export async function fetchProgress(token: string) {
  const data = await apiRequest<{ progress: ProgressState }>('/progress', {
    method: 'GET',
    token,
  });
  return data.progress;
}

export async function saveProgress(token: string, progress: ProgressState) {
  const data = await apiRequest<{ progress: ProgressState }>('/progress', {
    method: 'PUT',
    token,
    body: { progress },
  });
  return data.progress;
}

async function apiRequest<T>(
  path: string,
  options: {
    method: 'GET' | 'POST' | 'PUT';
    token?: string;
    body?: unknown;
  }
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await readPayload(res);
  if (!res.ok) {
    throw new Error(getErrorMessage(payload, `API error ${res.status}`));
  }
  return payload as T;
}

async function readPayload(res: Response) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'error' in payload) {
    const message = (payload as { error?: unknown }).error;
    if (typeof message === 'string') return message;
  }
  return fallback;
}
