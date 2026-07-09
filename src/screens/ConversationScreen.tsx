import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import { useProgress } from '../progress/ProgressContext';
import { PrimaryButton, t } from '../components/ui';
import { speak } from '../utils/speak';
import {
  getConversationEngine,
  ChatTurn,
  EngineReply,
} from '../engine/conversationEngine';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversation'>;

interface Msg extends ChatTurn {
  translation?: string;
}

export default function ConversationScreen({ route, navigation }: Props) {
  const { levelId, lessonId, xp, scenarioId, title, situation } = route.params;
  const { completeLesson, addWeakItem } = useProgress();
  const engine = getConversationEngine();
  const ctx = { scenarioId, situation, level: levelId };

  const [messages, setMessages] = useState<Msg[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [correction, setCorrection] = useState<EngineReply['correction']>();
  const [input, setInput] = useState('');
  const [done, setDone] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  // 대화 시작
  useEffect(() => {
    engine.start(ctx).then((r) => {
      setMessages([{ role: 'bot', text: r.text, translation: r.translation }]);
      setSuggestions(r.suggestions ?? []);
      speak(r.text);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || done) return;
    const history: ChatTurn[] = messages.map((m) => ({ role: m.role, text: m.text }));
    setMessages((m) => [...m, { role: 'user', text: clean }]);
    setInput('');
    setSuggestions([]);

    const r = await engine.reply(ctx, history, clean);
    setCorrection(r.correction);
    if (r.correction) addWeakItem(r.correction.original);
    setMessages((m) => [
      ...m,
      { role: 'bot', text: r.text, translation: r.translation },
    ]);
    setSuggestions(r.suggestions ?? []);
    speak(r.text);
    if (r.done) setDone(true);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const finish = () => {
    completeLesson(lessonId, xp);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.xpTag}>+{xp}</Text>
      </View>

      <View style={styles.situationBox}>
        <Text style={styles.situationText}>🎬 {situation}</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView ref={scrollRef} contentContainerStyle={styles.chat}>
          {messages.map((m, i) => (
            <View
              key={i}
              style={[
                styles.bubbleRow,
                m.role === 'user' ? styles.rowRight : styles.rowLeft,
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => m.role === 'bot' && speak(m.text)}
                style={[
                  styles.bubble,
                  m.role === 'user' ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={styles.bubbleText}>{m.text}</Text>
                {!!m.translation && (
                  <Text style={styles.bubbleKo}>{m.translation}</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}

          {correction && !done && (
            <View style={styles.correction}>
              <Text style={styles.correctionTitle}>✏️ 교정</Text>
              <Text style={styles.correctionLine}>
                {correction.original} → <Text style={{ color: theme.colors.success }}>{correction.corrected}</Text>
              </Text>
              <Text style={t.dim}>{correction.note}</Text>
            </View>
          )}
        </ScrollView>

        {done ? (
          <View style={styles.footer}>
            <Text style={styles.doneText}>대화 완료! 🎉</Text>
            <PrimaryButton label="완료하고 나가기" variant="success" onPress={finish} />
          </View>
        ) : (
          <View style={styles.footer}>
            {suggestions.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestRow}
              >
                {suggestions.map((s) => (
                  <TouchableOpacity key={s} style={styles.suggestChip} onPress={() => send(s)}>
                    <Text style={styles.suggestText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="영어로 답해보세요..."
                placeholderTextColor={theme.colors.textDim}
                onSubmitEditing={() => send(input)}
                returnKeyType="send"
              />
              <TouchableOpacity style={styles.sendBtn} onPress={() => send(input)}>
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
  close: { color: theme.colors.textDim, fontSize: 22, width: 40 },
  topTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },
  xpTag: { color: theme.colors.warning, fontWeight: '800', width: 40, textAlign: 'right' },
  situationBox: { backgroundColor: theme.colors.cardAlt, padding: 12 },
  situationText: { color: theme.colors.textDim, fontSize: 13, lineHeight: 18 },
  chat: { padding: 16, gap: 10 },
  bubbleRow: { flexDirection: 'row' },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16 },
  botBubble: { backgroundColor: theme.colors.card, borderTopLeftRadius: 4 },
  userBubble: { backgroundColor: theme.colors.primary, borderTopRightRadius: 4 },
  bubbleText: { color: theme.colors.text, fontSize: 16 },
  bubbleKo: { color: theme.colors.textDim, fontSize: 12, marginTop: 4 },
  correction: {
    backgroundColor: theme.colors.cardAlt,
    borderRadius: theme.radius.md,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.warning,
    gap: 2,
  },
  correctionTitle: { color: theme.colors.warning, fontWeight: '700', fontSize: 13 },
  correctionLine: { color: theme.colors.text, fontSize: 15 },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: 10,
  },
  suggestRow: { gap: 8, paddingBottom: 2 },
  suggestChip: {
    backgroundColor: theme.colors.primaryDim,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
  },
  suggestText: { color: theme.colors.text, fontSize: 14 },
  inputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: theme.colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: { color: '#fff', fontSize: 18 },
  doneText: { color: theme.colors.success, fontSize: 16, fontWeight: '700', textAlign: 'center' },
});
