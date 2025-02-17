import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AppState } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router'; // Import useRouter
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'; // Import useState
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Für sichere Speicherung

import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider } from './context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appState, setAppState] = useState(null);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Zustand für Login-Status
  const router = useRouter(); // Initialisiere den Router

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState?.current?.match(/inactive|background/) && nextAppState === 'active') {
        // App wurde in den Vordergrund geholt
      } else if (appState?.current === 'active' && nextAppState.match(/inactive|background/)) {
        // App geht in den Hintergrund oder wird geschlossen
        try {
          await AsyncStorage.setItem('appClosed', 'true');
        } catch (error) {
          console.error('Fehler beim Speichern des Flags:', error);
        }
      }
      setAppState({ current: nextAppState });
    };
  
    AppState.addEventListener('change', handleAppStateChange);
    // return () => {
    //   AppState.removeEventListener('change', handleAppStateChange);
    // };
  }, [appState]);
  

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const appClosed = await AsyncStorage.getItem('appClosed');
        if (appClosed === 'true') {
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('appClosed');
          setIsLoggedIn(false); // Erzwinge die Neuanmeldung
        } else {
          const token = await AsyncStorage.getItem('authToken');
          setIsLoggedIn(token !== null);
        }
      } catch (error) {
        console.log("error", error);
        
      }
    }
    checkLoginStatus();
  }, []);
  

  useEffect(() => {
    if (loaded && isLoggedIn !== null) {
      SplashScreen.hideAsync();
      if (!isLoggedIn) {
        router.replace('/Login'); // Navigiere zum Login-Screen, wenn nicht angemeldet
      }
    }
  }, [loaded, isLoggedIn]);


  if (!loaded || isLoggedIn === null) {  // Zeige nichts an, bis alles geladen ist
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserProvider>
  );
}