import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { LEVELS } from '../data/levels';
import { getDailyTrainingId } from '../engine/dailyTrainingEngine';
import { theme } from '../theme';
import { useAuth } from '../auth/AuthContext';
import { useProgress } from '../progress/ProgressContext';
import { Pill, t } from '../components/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { currentUser, logout } = useAuth();
  const { xp, isLessonDone } = useProgress();
  const dailyDone = isLessonDone(getDailyTrainingId());

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={t.h1}>English Training</Text>
            <Text style={t.dim}>20단계로 왕초보 → 원어민</Text>
          </View>
          <View style={styles.xpBox}>
            <Text style={styles.xpNum}>{xp}</Text>
            <Text style={styles.xpLabel}>XP</Text>
          </View>
        </View>

        <View style={styles.userBar}>
          <View>
            <Text style={styles.userLabel}>현재 사용자</Text>
            <Text style={styles.userName}>{currentUser?.name}</Text>
          </View>
          <TouchableOpacity onPress={logout} activeOpacity={0.85} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Daily')}
          style={[styles.dailyCard, dailyDone && styles.dailyCardDone]}
        >
          <View style={styles.dailyIcon}>
            <Text style={styles.dailyIconText}>⚡</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dailyTitle}>오늘의 훈련</Text>
            <Text style={styles.dailySub}>
              매일 바뀌는 단어·듣기·말하기·복습 세트
            </Text>
          </View>
          <Text style={styles.dailyStatus}>{dailyDone ? '완료' : '+35 XP'}</Text>
        </TouchableOpacity>

        {LEVELS.map((lvl) => {
          const ready = !!lvl.units?.length;
          return (
            <TouchableOpacity
              key={lvl.id}
              activeOpacity={ready ? 0.8 : 1}
              onPress={() =>
                ready
                  ? navigation.navigate('Level', { levelId: lvl.id })
                  : undefined
              }
              style={[
                styles.levelCard,
                { borderColor: ready ? lvl.color : theme.colors.border },
                !ready && styles.locked,
              ]}
            >
              <View
                style={[styles.levelBadge, { backgroundColor: lvl.color }]}
              >
                <Text style={styles.levelNum}>{lvl.id}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.levelTitle}>{lvl.title}</Text>
                  <Pill text={lvl.cefr} color={lvl.color} />
                </View>
                <Text style={t.dim}>{lvl.subtitle}</Text>
                <Text style={styles.vocab}>
                  누적 단어 {lvl.targetVocab.toLocaleString()}개
                </Text>
              </View>
              <Text style={styles.chevron}>{ready ? '›' : '🔒'}</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.footNote}>
          지금은 Level 1~7 콘텐츠가 준비돼 있어요. 나머지 단계는 구조만 잡혀 있고
          콘텐츠는 순차 확장됩니다.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  container: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  xpBox: { alignItems: 'center' },
  xpNum: { color: theme.colors.warning, fontSize: 24, fontWeight: '800' },
  xpLabel: { color: theme.colors.textDim, fontSize: 12 },
  userBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    marginBottom: 14,
  },
  userLabel: { color: theme.colors.textDim, fontSize: 12, fontWeight: '700' },
  userName: { color: theme.colors.text, fontSize: 16, fontWeight: '900', marginTop: 2 },
  logoutBtn: {
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutText: { color: theme.colors.primary, fontSize: 13, fontWeight: '800' },
  dailyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.warning,
    padding: 14,
    marginBottom: 16,
  },
  dailyCardDone: { borderColor: theme.colors.success },
  dailyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyIconText: { fontSize: 22 },
  dailyTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '900' },
  dailySub: { color: theme.colors.textDim, fontSize: 13, marginTop: 2 },
  dailyStatus: { color: theme.colors.warning, fontSize: 13, fontWeight: '900' },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    gap: 12,
  },
  locked: { opacity: 0.55 },
  levelBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNum: { color: '#0b1020', fontSize: 18, fontWeight: '900' },
  levelTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '700' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vocab: { color: theme.colors.textDim, fontSize: 12, marginTop: 2 },
  chevron: { color: theme.colors.textDim, fontSize: 22, fontWeight: '700' },
  footNote: {
    color: theme.colors.textDim,
    fontSize: 12,
    marginTop: 14,
    lineHeight: 18,
  },
});
