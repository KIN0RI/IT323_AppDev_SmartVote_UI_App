import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="face-verification" />
        <Stack.Screen name="student-dashboard" />
        <Stack.Screen name="vote" />
        <Stack.Screen name="vote-analysis" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="voter-log" />
        <Stack.Screen name="manage-candidates" />
        <Stack.Screen name="election-settings" />
        <Stack.Screen name="results" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
