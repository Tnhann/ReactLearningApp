import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { learningTopics } from '../src/data/learningContent';
import { ProgressProvider, useProgress } from '../src/context/ProgressContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Kullanıcı oturum durumunu kontrol eden bileşen
function AuthStateListener({ children }) {
  const { user, isLoading } = useProgress();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // Kullanıcı oturum açmamışsa auth ekranına yönlendir
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      // Kullanıcı oturum açmışsa ana sayfaya yönlendir
      router.replace('/');
    }
  }, [user, isLoading, segments]);

  return children;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ProgressProvider>
      <AuthStateListener>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: 'React Native Öğrenme',
              }}
            />
            <Stack.Screen
              name="topic/[id]"
              options={({ route }) => {
                const id = route.params?.id;
                const topic = learningTopics.find(t => t.id === id);
                return {
                  title: topic?.title || 'Konu Detayı',
                };
              }}
            />
            <Stack.Screen
              name="auth"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthStateListener>
    </ProgressProvider>
  );
}
