import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { Card, PrimaryButton, t } from '../components/ui';
import { theme } from '../theme';

export default function LoginScreen() {
  const { users, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') {
        await login(name, password);
      } else {
        await register(name, password);
      }
      setName('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인할 수 없어요.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.logo}>ET</Text>
            <Text style={t.h1}>English Training</Text>
            <Text style={styles.subtitle}>
              서버 계정으로 로그인하면 단계 기록, XP, 복습 기록이 기기 밖 DB에 저장됩니다.
            </Text>
          </View>

          <Card style={styles.loginCard}>
            <View style={styles.modeRow}>
              <TouchableOpacity
                onPress={() => setMode('login')}
                style={[styles.modeBtn, mode === 'login' && styles.modeBtnOn]}
              >
                <Text style={[styles.modeText, mode === 'login' && styles.modeTextOn]}>
                  로그인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMode('register')}
                style={[styles.modeBtn, mode === 'register' && styles.modeBtnOn]}
              >
                <Text style={[styles.modeText, mode === 'register' && styles.modeTextOn]}>
                  계정 만들기
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitle}>
              {mode === 'login' ? '서버 계정 로그인' : '새 계정 만들기'}
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="사용자 이름"
              placeholderTextColor={theme.colors.textDim}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호 6글자 이상"
              placeholderTextColor={theme.colors.textDim}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={submit}
              style={styles.input}
            />
            {!!error && <Text style={styles.error}>{error}</Text>}
            <PrimaryButton
              label={busy ? '처리 중...' : mode === 'login' ? '로그인' : '계정 만들고 시작'}
              disabled={busy}
              onPress={submit}
            />
          </Card>

          {users.length > 0 && (
            <View style={styles.usersBlock}>
              <Text style={styles.sectionTitle}>이전에 로그인한 사용자</Text>
              {users
                .slice()
                .sort((a, b) => b.lastLoginAt.localeCompare(a.lastLoginAt))
                .map((user) => (
                  <TouchableOpacity
                    key={user.id}
                    activeOpacity={0.85}
                    onPress={() => setName(user.name)}
                    style={styles.userRow}
                  >
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{user.name.slice(0, 1).toUpperCase()}</Text>
                    </View>
                    <View style={styles.flex}>
                      <Text style={styles.userName}>{user.name}</Text>
                      <Text style={t.dim}>이름 채우기</Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          <Text style={styles.note}>
            기존 로컬 기록은 첫 서버 로그인 후 자동으로 서버 기록과 합쳐집니다.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  flex: { flex: 1 },
  container: { padding: 20, paddingBottom: 36, flexGrow: 1, justifyContent: 'center' },
  header: { marginBottom: 22 },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    color: '#0b1020',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 54,
    marginBottom: 14,
  },
  subtitle: { color: theme.colors.textDim, fontSize: 15, lineHeight: 22, marginTop: 8 },
  loginCard: { gap: 12 },
  modeRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 4,
    gap: 4,
  },
  modeBtn: { flex: 1, alignItems: 'center', borderRadius: theme.radius.sm, paddingVertical: 9 },
  modeBtnOn: { backgroundColor: theme.colors.primary },
  modeText: { color: theme.colors.textDim, fontSize: 14, fontWeight: '800' },
  modeTextOn: { color: '#0b1020' },
  cardTitle: { color: theme.colors.text, fontSize: 18, fontWeight: '800' },
  input: {
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  error: { color: theme.colors.danger, fontSize: 13, fontWeight: '700' },
  usersBlock: { marginTop: 22 },
  sectionTitle: { color: theme.colors.text, fontSize: 15, fontWeight: '800', marginBottom: 10 },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#06231a', fontSize: 17, fontWeight: '900' },
  userName: { color: theme.colors.text, fontSize: 16, fontWeight: '800' },
  chevron: { color: theme.colors.textDim, fontSize: 24, fontWeight: '800' },
  note: { color: theme.colors.textDim, fontSize: 12, lineHeight: 18, marginTop: 16 },
});
