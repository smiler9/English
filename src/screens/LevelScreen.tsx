import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getLevel } from '../data/levels';
import { theme, LESSON_META } from '../theme';
import { useProgress } from '../progress/ProgressContext';
import { Card, t } from '../components/ui';
import { Lesson } from '../types/curriculum';

type Props = NativeStackScreenProps<RootStackParamList, 'Level'>;

export default function LevelScreen({ route, navigation }: Props) {
  const { levelId } = route.params;
  const level = getLevel(levelId);
  const { isLessonDone } = useProgress();

  if (!level?.units) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={t.body}>콘텐츠 준비 중입니다.</Text>
      </SafeAreaView>
    );
  }

  const openLesson = (unitId: string, lesson: Lesson) => {
    if (lesson.type === 'conversation' && lesson.content.kind === 'conversation') {
      navigation.navigate('Conversation', {
        levelId,
        lessonId: lesson.id,
        xp: lesson.xp,
        scenarioId: lesson.content.scenarioId,
        title: lesson.content.title,
        situation: lesson.content.situation,
      });
    } else {
      navigation.navigate('Lesson', { levelId, unitId, lessonId: lesson.id });
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ 등급 목록</Text>
        </TouchableOpacity>
        <Text style={t.h1}>
          Level {level.id}. {level.title}
        </Text>
        <Text style={[t.dim, { marginBottom: 4 }]}>{level.subtitle} · {level.cefr}</Text>
        <View style={styles.candoBox}>
          {level.cando.map((c) => (
            <Text key={c} style={styles.cando}>
              ✓ {c}
            </Text>
          ))}
        </View>

        {level.units.map((unit) => {
          const done = unit.lessons.filter((l) => isLessonDone(l.id)).length;
          return (
            <View key={unit.id} style={styles.unit}>
              <View style={styles.unitHead}>
                <Text style={styles.unitIcon}>{unit.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.unitTitle}>
                    Unit {unit.order}. {unit.title}
                  </Text>
                  <Text style={t.dim}>{unit.description}</Text>
                </View>
                <Text style={styles.unitProgress}>
                  {done}/{unit.lessons.length}
                </Text>
              </View>

              {unit.lessons.map((lesson) => {
                const meta = LESSON_META[lesson.type];
                const complete = isLessonDone(lesson.id);
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    activeOpacity={0.8}
                    onPress={() => openLesson(unit.id, lesson)}
                  >
                    <Card style={styles.lessonRow}>
                      <Text style={styles.lessonIcon}>{meta.icon}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                        <Text style={t.dim}>
                          {meta.label} · +{lesson.xp} XP
                        </Text>
                      </View>
                      <Text style={[styles.check, complete && styles.checkOn]}>
                        {complete ? '✓' : '○'}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  container: { padding: 16, paddingBottom: 40 },
  back: { color: theme.colors.primary, fontSize: 15, marginBottom: 8 },
  candoBox: {
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.md,
    padding: 12,
    marginVertical: 12,
    gap: 4,
  },
  cando: { color: theme.colors.textDim, fontSize: 13 },
  unit: { marginTop: 18 },
  unitHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  unitIcon: { fontSize: 26 },
  unitTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '700' },
  unitProgress: { color: theme.colors.textDim, fontSize: 13, fontWeight: '700' },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  lessonIcon: { fontSize: 22 },
  lessonTitle: { color: theme.colors.text, fontSize: 15, fontWeight: '600' },
  check: { color: theme.colors.locked, fontSize: 20, fontWeight: '800' },
  checkOn: { color: theme.colors.success },
});
