import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme';

export function PrimaryButton({
  label,
  onPress,
  disabled,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'success' | 'ghost';
}) {
  const bg =
    variant === 'success'
      ? theme.colors.success
      : variant === 'ghost'
      ? 'transparent'
      : theme.colors.primary;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        { backgroundColor: disabled ? theme.colors.locked : bg },
        variant === 'ghost' && styles.ghostBorder,
      ]}
    >
      <Text
        style={[
          styles.btnText,
          variant === 'success' && { color: '#06231a' },
          variant === 'ghost' && { color: theme.colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Pill({ text, color }: { text: string; color?: string }) {
  return (
    <View style={[styles.pill, color ? { backgroundColor: color } : null]}>
      <Text style={styles.pillText}>{text}</Text>
    </View>
  );
}

export function ScreenTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.screenTitle}>{children}</Text>;
}

export const t: Record<string, TextStyle> = {
  h1: { color: theme.colors.text, fontSize: 26, fontWeight: '800' },
  h2: { color: theme.colors.text, fontSize: 20, fontWeight: '700' },
  body: { color: theme.colors.text, fontSize: 16 },
  dim: { color: theme.colors.textDim, fontSize: 14 },
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 16,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  ghostBorder: { borderWidth: 1, borderColor: theme.colors.border },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pill: {
    backgroundColor: theme.colors.primaryDim,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
    alignSelf: 'flex-start',
  },
  pillText: { color: theme.colors.text, fontSize: 12, fontWeight: '700' },
  screenTitle: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
});
