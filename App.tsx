import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './src/navigation/types';
import { AuthProvider, useAuth } from './src/auth/AuthContext';
import { ProgressProvider } from './src/progress/ProgressContext';
import { theme } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import DailyScreen from './src/screens/DailyScreen';
import LevelScreen from './src/screens/LevelScreen';
import LessonScreen from './src/screens/LessonScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: theme.colors.bg },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <AppShell />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function AppShell() {
  const { currentUser, loaded } = useAuth();

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!currentUser) return <LoginScreen />;

  return (
    <ProgressProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Daily" component={DailyScreen} />
          <Stack.Screen name="Level" component={LevelScreen} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
          <Stack.Screen name="Conversation" component={ConversationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProgressProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bg,
  },
  loadingText: { color: theme.colors.textDim, fontSize: 14, fontWeight: '700' },
});
