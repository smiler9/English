import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createDailyTraining } from '../engine/dailyTrainingEngine';
import { RootStackParamList } from '../navigation/types';
import { useProgress } from '../progress/ProgressContext';
import { BuildItem, ListeningItem, QuizQuestion } from '../types/curriculum';
import { Card, PrimaryButton, t } from '../components/ui';
import { theme } from '../theme';
import { speak } from '../utils/speak';

type Props = NativeStackScreenProps<RootStackParamList, 'Daily'>;

type AnswerState = Record<string, number>;
type RevealState = Record<string, boolean>;

export default function DailyScreen({ navigation }: Props) {
  const progress = useProgress();
  const { completedLessons, weakItems, completeLesson, isLessonDone, addWeakItem } = progress;
  const training = useMemo(
    () => createDailyTraining({ completedLessons, weakItems }),
    [completedLessons, weakItems]
  );
  const [answers, setAnswers] = useState<AnswerState>({});
  const [revealed, setRevealed] = useState<RevealState>({});
  const done = isLessonDone(training.id);

  const choose = (key: string, selected: number, answerIndex: number, weakLabel: string) => {
    if (answers[key] !== undefined) return;
    setAnswers((current) => ({ ...current, [key]: selected }));
    if (selected !== answerIndex) addWeakItem(weakLabel);
  };

  const toggleReveal = (key: string) =>
    setRevealed((current) => ({ ...current, [key]: !current[key] }));

  const finish = () => {
    completeLesson(training.id, training.xp);
    navigation.goBack();
  };

  const startConversation = () => {
    if (!training.conversation) return;
    navigation.navigate('Conversation', {
      levelId: training.levelId,
      lessonId: `${training.id}-conversation`,
      xp: 15,
      scenarioId: training.conversation.scenarioId,
      title: training.conversation.title,
      situation: training.conversation.situation,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ 홈</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>오늘의 훈련</Text>
        <Text style={styles.xpTag}>+{training.xp}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.dateText}>{training.dateKey}</Text>
          <Text style={styles.heroTitle}>Level {training.levelId} Daily Training</Text>
          <Text style={styles.heroSub}>
            단어 {training.vocab.length} · 조립 {training.build.length} · 듣기{' '}
            {training.listening.length} · 말하기 {training.speaking.length} · 복습{' '}
            {training.review.length}
          </Text>
        </View>

        <Card style={styles.section}>
          <SectionTitle icon="📘" title="오늘의 단어" />
          {training.vocab.map((word) => (
            <View key={`${word.en}:${word.ko}`} style={styles.vocabRow}>
              <TouchableOpacity onPress={() => speak(word.en)} style={styles.soundButton}>
                <Text style={styles.soundText}>🔊</Text>
              </TouchableOpacity>
              <View style={styles.flex}>
                <Text style={styles.wordEn}>{word.en}</Text>
                <Text style={styles.wordKo}>{word.ko}</Text>
                <Text style={styles.example}>{word.example}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card style={styles.section}>
          <SectionTitle icon="🔨" title="문장 조립" />
          {training.build.map((item, index) => (
            <BuildCard
              key={`${item.ko}:${index}`}
              item={item}
              index={index}
              revealed={!!revealed[`build-${index}`]}
              onToggle={() => toggleReveal(`build-${index}`)}
            />
          ))}
        </Card>

        <Card style={styles.section}>
          <SectionTitle icon="🎧" title="듣기" />
          {training.listening.map((item, index) => (
            <QuestionCard
              key={`${item.audioText}:${index}`}
              id={`listening-${index}`}
              prompt={item.question}
              options={item.options}
              answerIndex={item.answerIndex}
              selected={answers[`listening-${index}`]}
              onChoose={(selected) =>
                choose(`listening-${index}`, selected, item.answerIndex, item.audioText)
              }
              audioText={item.audioText}
            />
          ))}
        </Card>

        <Card style={styles.section}>
          <SectionTitle icon="🎤" title="따라 말하기" />
          {training.speaking.map((prompt) => (
            <TouchableOpacity
              key={`${prompt.en}:${prompt.ko}`}
              style={styles.speakingRow}
              onPress={() => speak(prompt.en)}
              activeOpacity={0.8}
            >
              <Text style={styles.soundText}>🔊</Text>
              <View style={styles.flex}>
                <Text style={styles.speakingEn}>{prompt.en}</Text>
                <Text style={t.dim}>{prompt.ko}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        <Card style={styles.section}>
          <SectionTitle icon="🔁" title="복습 퀴즈" />
          {training.review.map((question, index) => (
            <QuestionCard
              key={`${question.prompt}:${index}`}
              id={`review-${index}`}
              prompt={question.prompt}
              options={question.options}
              answerIndex={question.answerIndex}
              selected={answers[`review-${index}`]}
              onChoose={(selected) =>
                choose(`review-${index}`, selected, question.answerIndex, question.prompt)
              }
              explanation={question.explanation}
            />
          ))}
        </Card>

        {training.conversation && (
          <Card style={styles.section}>
            <SectionTitle icon="💬" title="오늘의 AI 대화" />
            <Text style={styles.conversationTitle}>{training.conversation.title}</Text>
            <Text style={[t.dim, styles.conversationSituation]}>
              {training.conversation.situation}
            </Text>
            <PrimaryButton label="대화 시작" onPress={startConversation} />
          </Card>
        )}

        <View style={styles.finishBox}>
          <PrimaryButton
            label={done ? '오늘 훈련 완료됨' : '오늘 훈련 완료'}
            variant="success"
            disabled={done}
            onPress={finish}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionText}>{title}</Text>
    </View>
  );
}

function BuildCard({
  item,
  index,
  revealed,
  onToggle,
}: {
  item: BuildItem;
  index: number;
  revealed: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={styles.practiceCard}>
      <Text style={styles.questionNumber}>{index + 1}</Text>
      <Text style={styles.prompt}>{item.ko}</Text>
      <View style={styles.chipRow}>
        {item.bank.map((word, wordIndex) => (
          <View key={`${word}:${wordIndex}`} style={styles.chip}>
            <Text style={styles.chipText}>{word}</Text>
          </View>
        ))}
      </View>
      {revealed && <Text style={styles.answerText}>{item.answer.join(' ')}</Text>}
      <TouchableOpacity onPress={onToggle} style={styles.smallAction}>
        <Text style={styles.smallActionText}>{revealed ? '정답 숨기기' : '정답 보기'}</Text>
      </TouchableOpacity>
    </View>
  );
}

function QuestionCard({
  id,
  prompt,
  options,
  answerIndex,
  selected,
  onChoose,
  audioText,
  explanation,
}: {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  selected?: number;
  onChoose: (selected: number) => void;
  audioText?: ListeningItem['audioText'];
  explanation?: QuizQuestion['explanation'];
}) {
  return (
    <View style={styles.practiceCard}>
      <View style={styles.questionHead}>
        <Text style={styles.prompt}>{prompt}</Text>
        {audioText && (
          <TouchableOpacity onPress={() => speak(audioText)} style={styles.soundButton}>
            <Text style={styles.soundText}>🔊</Text>
          </TouchableOpacity>
        )}
      </View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={`${id}:${option}`}
          onPress={() => onChoose(index)}
          disabled={selected !== undefined}
          activeOpacity={0.8}
        >
          <View style={[styles.option, optionStyle(index, selected, answerIndex)]}>
            <Text style={styles.optionText}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {selected !== undefined && explanation && <Text style={styles.explanation}>{explanation}</Text>}
    </View>
  );
}

function optionStyle(index: number, selected: number | undefined, answerIndex: number) {
  if (selected === undefined) return null;
  if (index === answerIndex) return styles.optionCorrect;
  if (index === selected) return styles.optionWrong;
  return styles.optionMuted;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  back: { color: theme.colors.primary, fontSize: 15, width: 64 },
  topTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '800' },
  xpTag: { color: theme.colors.warning, fontWeight: '800', width: 64, textAlign: 'right' },
  container: { padding: 16, paddingBottom: 36 },
  hero: {
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 12,
  },
  dateText: { color: theme.colors.warning, fontSize: 13, fontWeight: '800', marginBottom: 4 },
  heroTitle: { color: theme.colors.text, fontSize: 22, fontWeight: '900' },
  heroSub: { color: theme.colors.textDim, fontSize: 13, lineHeight: 19, marginTop: 6 },
  section: { marginBottom: 12 },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionIcon: { fontSize: 22 },
  sectionText: { color: theme.colors.text, fontSize: 18, fontWeight: '800' },
  vocabRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  soundButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundText: { fontSize: 17 },
  flex: { flex: 1 },
  wordEn: { color: theme.colors.text, fontSize: 17, fontWeight: '800' },
  wordKo: { color: theme.colors.primary, fontSize: 14, fontWeight: '700', marginTop: 2 },
  example: { color: theme.colors.textDim, fontSize: 13, marginTop: 4 },
  practiceCard: {
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.sm,
    padding: 12,
    marginBottom: 10,
  },
  questionNumber: { color: theme.colors.textDim, fontSize: 12, fontWeight: '800' },
  prompt: { color: theme.colors.text, fontSize: 16, fontWeight: '700', lineHeight: 22 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  chip: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  chipText: { color: theme.colors.text, fontSize: 14, fontWeight: '700' },
  answerText: { color: theme.colors.success, fontSize: 15, fontWeight: '800', marginTop: 10 },
  smallAction: { alignSelf: 'flex-start', marginTop: 10 },
  smallActionText: { color: theme.colors.primary, fontSize: 14, fontWeight: '800' },
  questionHead: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 },
  option: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    marginTop: 8,
  },
  optionCorrect: { backgroundColor: theme.colors.success, borderColor: theme.colors.success },
  optionWrong: { backgroundColor: theme.colors.danger, borderColor: theme.colors.danger },
  optionMuted: { opacity: 0.5 },
  optionText: { color: theme.colors.text, fontSize: 15, fontWeight: '700' },
  explanation: { color: theme.colors.textDim, fontSize: 13, lineHeight: 19, marginTop: 10 },
  speakingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.sm,
    padding: 12,
    marginBottom: 8,
  },
  speakingEn: { color: theme.colors.text, fontSize: 16, fontWeight: '800', marginBottom: 3 },
  conversationTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '800' },
  conversationSituation: { marginTop: 6, marginBottom: 14, lineHeight: 19 },
  finishBox: { marginTop: 4 },
});
