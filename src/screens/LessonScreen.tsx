import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getLevel } from '../data/levels';
import { theme } from '../theme';
import { useProgress } from '../progress/ProgressContext';
import { PrimaryButton, Card, t } from '../components/ui';
import { speak } from '../utils/speak';
import {
  Lesson,
  QuizQuestion,
  VocabContent,
  GrammarContent,
  BuildContent,
  ListeningContent,
  SpeakingContent,
} from '../types/curriculum';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default function LessonScreen({ route, navigation }: Props) {
  const { levelId, unitId, lessonId } = route.params;
  const { completeLesson, addWeakItem } = useProgress();

  const level = getLevel(levelId);
  const unit = level?.units?.find((u) => u.id === unitId);
  const lesson = unit?.lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={t.body}>레슨을 찾을 수 없어요.</Text>
      </SafeAreaView>
    );
  }

  const finish = () => {
    completeLesson(lesson.id, lesson.xp);
    navigation.goBack();
  };
  const exit = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>{lesson.title}</Text>
        <Text style={styles.xpTag}>+{lesson.xp}</Text>
      </View>
      <Body lesson={lesson} onFinish={finish} onExit={exit} onWeak={addWeakItem} />
    </SafeAreaView>
  );
}

function Body({
  lesson,
  onFinish,
  onExit,
  onWeak,
}: {
  lesson: Lesson;
  onFinish: () => void;
  onExit: () => void;
  onWeak: (s: string) => void;
}) {
  const c = lesson.content;
  switch (c.kind) {
    case 'vocab':
      return <VocabView content={c} onFinish={onFinish} />;
    case 'grammar':
      return <GrammarView content={c} onFinish={onFinish} />;
    case 'build':
      return <BuildView content={c} onFinish={onFinish} />;
    case 'listening':
      return <ListeningView content={c} onFinish={onFinish} onWeak={onWeak} />;
    case 'speaking':
      return <SpeakingView content={c} onFinish={onFinish} />;
    case 'review':
      return <QuizView questions={c.questions} onFinish={onFinish} onWeak={onWeak} />;
    case 'test':
      return (
        <QuizView
          questions={c.questions}
          passScore={c.passScore}
          onFinish={onFinish}
          onExit={onExit}
          onWeak={onWeak}
        />
      );
    default:
      return null;
  }
}

/* ── 단어 ─────────────────────────────── */
function VocabView({ content, onFinish }: { content: VocabContent; onFinish: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {content.words.map((w) => (
        <Card key={w.en} style={styles.vocabCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.vocabEn}>{w.en}</Text>
            <TouchableOpacity onPress={() => speak(w.en)} style={styles.speakBtn}>
              <Text style={styles.speakIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
          {!!w.ipa && <Text style={styles.ipa}>{w.ipa}</Text>}
          <Text style={styles.vocabKo}>{w.ko}</Text>
          <TouchableOpacity onPress={() => speak(w.example)}>
            <Text style={styles.example}>“{w.example}”</Text>
          </TouchableOpacity>
          <Text style={t.dim}>{w.exampleKo}</Text>
        </Card>
      ))}
      <PrimaryButton label="다 외웠어요" onPress={onFinish} />
    </ScrollView>
  );
}

/* ── 문법 ─────────────────────────────── */
function GrammarView({ content, onFinish }: { content: GrammarContent; onFinish: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Card style={{ marginBottom: 12 }}>
        <Text style={styles.grammarPoint}>{content.point}</Text>
        <Text style={[t.body, { marginTop: 8, lineHeight: 22 }]}>
          {content.explanation}
        </Text>
      </Card>
      {content.examples.map((ex, i) => (
        <TouchableOpacity key={i} onPress={() => speak(ex.en)}>
          <Card style={styles.exampleCard}>
            <Text style={styles.exampleEn}>{ex.en} 🔊</Text>
            <Text style={t.dim}>{ex.ko}</Text>
          </Card>
        </TouchableOpacity>
      ))}
      {content.tips?.map((tip) => (
        <Text key={tip} style={styles.tip}>
          💡 {tip}
        </Text>
      ))}
      <PrimaryButton label="이해했어요" onPress={onFinish} />
    </ScrollView>
  );
}

/* ── 문장 조립 ─────────────────────────── */
function BuildView({ content, onFinish }: { content: BuildContent; onFinish: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<'none' | 'ok' | 'no'>('none');
  const item = content.items[idx];

  const pick = (w: string, i: number) =>
    setPicked((p) => [...p, indexKey(w, i)]);
  const unpick = (key: string) =>
    setPicked((p) => p.filter((k) => k !== key));

  const check = () => {
    const answer = picked.map(stripKey).join(' ');
    const ok = answer === item.answer.join(' ');
    setResult(ok ? 'ok' : 'no');
  };

  const next = () => {
    if (idx + 1 >= content.items.length) return onFinish();
    setIdx(idx + 1);
    setPicked([]);
    setResult('none');
  };

  return (
    <View style={styles.scroll}>
      <Text style={styles.buildKo}>{item.ko}</Text>

      <View style={styles.answerZone}>
        {picked.map((key) => (
          <TouchableOpacity key={key} onPress={() => unpick(key)} disabled={result !== 'none'}>
            <View style={styles.chipPicked}>
              <Text style={styles.chipText}>{stripKey(key)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bankZone}>
        {item.bank.map((w, i) =>
          picked.includes(indexKey(w, i)) ? null : (
            <TouchableOpacity key={indexKey(w, i)} onPress={() => pick(w, i)} disabled={result !== 'none'}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{w}</Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </View>

      {result === 'ok' && <Text style={styles.ok}>정답이에요! 🎉</Text>}
      {result === 'no' && (
        <Text style={styles.no}>아쉬워요. 정답: {item.answer.join(' ')}</Text>
      )}

      <View style={{ marginTop: 'auto' }}>
        {result === 'none' ? (
          <PrimaryButton label="확인" onPress={check} disabled={picked.length === 0} />
        ) : (
          <PrimaryButton
            label={idx + 1 >= content.items.length ? '완료' : '다음 문장'}
            variant="success"
            onPress={next}
          />
        )}
      </View>
    </View>
  );
}

/* ── 듣기 ─────────────────────────────── */
function ListeningView({
  content,
  onFinish,
  onWeak,
}: {
  content: ListeningContent;
  onFinish: () => void;
  onWeak: (s: string) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const item = content.items[idx];

  const choose = (i: number) => {
    setChosen(i);
    if (i !== item.answerIndex) onWeak(item.audioText);
  };
  const next = () => {
    if (idx + 1 >= content.items.length) return onFinish();
    setIdx(idx + 1);
    setChosen(null);
  };

  return (
    <View style={styles.scroll}>
      <TouchableOpacity style={styles.playBig} onPress={() => speak(item.audioText)}>
        <Text style={styles.playBigIcon}>🔊</Text>
        <Text style={t.dim}>눌러서 다시 듣기</Text>
      </TouchableOpacity>
      <Text style={[t.h2, { marginBottom: 12 }]}>{item.question}</Text>
      {item.options.map((opt, i) => (
        <OptionRow
          key={i}
          label={opt}
          state={optionState(i, chosen, item.answerIndex)}
          onPress={() => chosen === null && choose(i)}
        />
      ))}
      <View style={{ marginTop: 'auto' }}>
        {chosen !== null && (
          <PrimaryButton
            label={idx + 1 >= content.items.length ? '완료' : '다음'}
            variant="success"
            onPress={next}
          />
        )}
      </View>
    </View>
  );
}

/* ── 따라 말하기 ───────────────────────── */
function SpeakingView({ content, onFinish }: { content: SpeakingContent; onFinish: () => void }) {
  const [idx, setIdx] = useState(0);
  const item = content.prompts[idx];
  const next = () => (idx + 1 >= content.prompts.length ? onFinish() : setIdx(idx + 1));

  return (
    <View style={styles.scroll}>
      <Text style={styles.counter}>
        {idx + 1} / {content.prompts.length}
      </Text>
      <Card style={styles.speakCard}>
        <Text style={styles.speakEn}>{item.en}</Text>
        {!!item.ipa && <Text style={styles.ipa}>{item.ipa}</Text>}
        <Text style={[t.dim, { marginTop: 6 }]}>{item.ko}</Text>
      </Card>
      <TouchableOpacity style={styles.playBig} onPress={() => speak(item.en)}>
        <Text style={styles.playBigIcon}>🔊</Text>
        <Text style={t.dim}>듣고 따라 말해보세요</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 'auto' }}>
        <PrimaryButton
          label={idx + 1 >= content.prompts.length ? '완료' : '따라 말했어요'}
          variant="success"
          onPress={next}
        />
      </View>
    </View>
  );
}

/* ── 퀴즈 (복습/테스트 공용) ───────────── */
function QuizView({
  questions,
  passScore,
  onFinish,
  onExit,
  onWeak,
}: {
  questions: QuizQuestion[];
  passScore?: number;
  onFinish: () => void;
  onExit?: () => void;
  onWeak: (s: string) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];

  const choose = (i: number) => {
    setChosen(i);
    if (i === q.answerIndex) setCorrect((c) => c + 1);
    else onWeak(q.prompt);
  };
  const next = () => {
    if (idx + 1 >= questions.length) return setDone(true);
    setIdx(idx + 1);
    setChosen(null);
  };
  const retry = () => {
    setIdx(0);
    setChosen(null);
    setCorrect(0);
    setDone(false);
  };

  if (done) {
    const score = Math.round((correct / questions.length) * 100);
    const passed = passScore === undefined || score >= passScore;
    return (
      <View style={[styles.scroll, { justifyContent: 'center' }]}>
        <Text style={styles.bigScore}>{score}점</Text>
        <Text style={[t.body, { textAlign: 'center', marginBottom: 20 }]}>
          {questions.length}문제 중 {correct}개 정답
          {passScore !== undefined
            ? passed
              ? ` · 통과! (기준 ${passScore}점)`
              : ` · 아쉬워요 (기준 ${passScore}점)`
            : ''}
        </Text>
        {passed ? (
          <PrimaryButton label="완료" variant="success" onPress={onFinish} />
        ) : (
          <View style={styles.resultActions}>
            <PrimaryButton label="다시 도전" onPress={retry} />
            {onExit && <PrimaryButton label="나가기" variant="ghost" onPress={onExit} />}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.scroll}>
      <Text style={styles.counter}>
        {idx + 1} / {questions.length}
      </Text>
      <Text style={[t.h2, { marginBottom: 16 }]}>{q.prompt}</Text>
      {q.options.map((opt, i) => (
        <OptionRow
          key={i}
          label={opt}
          state={optionState(i, chosen, q.answerIndex)}
          onPress={() => chosen === null && choose(i)}
        />
      ))}
      {chosen !== null && q.explanation && (
        <Text style={styles.tip}>💡 {q.explanation}</Text>
      )}
      <View style={{ marginTop: 'auto' }}>
        {chosen !== null && (
          <PrimaryButton
            label={idx + 1 >= questions.length ? '결과 보기' : '다음'}
            variant="success"
            onPress={next}
          />
        )}
      </View>
    </View>
  );
}

/* ── 공용 옵션 버튼 ─────────────────────── */
function OptionRow({
  label,
  state,
  onPress,
}: {
  label: string;
  state: 'idle' | 'correct' | 'wrong' | 'muted';
  onPress: () => void;
}) {
  const bg =
    state === 'correct'
      ? theme.colors.success
      : state === 'wrong'
      ? theme.colors.danger
      : theme.colors.card;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.option, { backgroundColor: bg }, state === 'muted' && { opacity: 0.5 }]}>
        <Text
          style={[
            styles.optionText,
            (state === 'correct' || state === 'wrong') && { color: '#0b1020', fontWeight: '800' },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function optionState(
  i: number,
  chosen: number | null,
  answer: number
): 'idle' | 'correct' | 'wrong' | 'muted' {
  if (chosen === null) return 'idle';
  if (i === answer) return 'correct';
  if (i === chosen) return 'wrong';
  return 'muted';
}

// build 칩 중복 단어 구분용 키 (예: "you#1")
const indexKey = (w: string, i: number) => `${w}#${i}`;
const stripKey = (k: string) => k.split('#')[0];

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
  close: { color: theme.colors.textDim, fontSize: 22, width: 40 },
  topTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
  xpTag: { color: theme.colors.warning, fontWeight: '800', width: 40, textAlign: 'right' },
  scroll: { padding: 16, flexGrow: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vocabCard: { marginBottom: 10 },
  vocabEn: { color: theme.colors.text, fontSize: 22, fontWeight: '800' },
  vocabKo: { color: theme.colors.primary, fontSize: 16, fontWeight: '700', marginTop: 2 },
  ipa: { color: theme.colors.textDim, fontSize: 13, fontStyle: 'italic' },
  example: { color: theme.colors.text, fontSize: 15, marginTop: 8 },
  speakBtn: { padding: 6 },
  speakIcon: { fontSize: 22 },
  grammarPoint: { color: theme.colors.warning, fontSize: 18, fontWeight: '800' },
  exampleCard: { marginBottom: 8 },
  exampleEn: { color: theme.colors.text, fontSize: 16, fontWeight: '600' },
  tip: { color: theme.colors.textDim, fontSize: 13, marginVertical: 10, lineHeight: 19 },
  buildKo: { color: theme.colors.text, fontSize: 20, fontWeight: '700', marginBottom: 16 },
  answerZone: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    minHeight: 56,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
    paddingBottom: 12,
    marginBottom: 20,
  },
  bankZone: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: theme.colors.cardAlt,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipPicked: {
    backgroundColor: theme.colors.primaryDim,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
  },
  chipText: { color: theme.colors.text, fontSize: 16, fontWeight: '600' },
  ok: { color: theme.colors.success, fontSize: 16, fontWeight: '700', marginTop: 16 },
  no: { color: theme.colors.danger, fontSize: 15, fontWeight: '600', marginTop: 16 },
  playBig: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: 28,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  playBigIcon: { fontSize: 40 },
  option: {
    padding: 16,
    borderRadius: theme.radius.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  optionText: { color: theme.colors.text, fontSize: 16, fontWeight: '600' },
  counter: { color: theme.colors.textDim, fontSize: 14, marginBottom: 10 },
  speakCard: { alignItems: 'center', paddingVertical: 24, marginBottom: 16 },
  speakEn: { color: theme.colors.text, fontSize: 24, fontWeight: '800', textAlign: 'center' },
  bigScore: { color: theme.colors.warning, fontSize: 56, fontWeight: '900', textAlign: 'center' },
  resultActions: { gap: 10 },
});
