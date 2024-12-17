import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme, Text, YStack, Spinner } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';
import ParentBottomNavigation from './src/navigation/ParentNavigation/ParentBottomNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  // ---
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  // ---
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
} from '@expo-google-fonts/dev';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { getRole, getToken } from './src/api/storage';
import AuthNavigation from './src/navigation/AuthNavigation.js/AuthNavigation';
import { ToastProvider } from './src/components/Toast';

const queryClient = new QueryClient();

const LoadingScreen = () => (
  <YStack f={1} ai="center" jc="center" backgroundColor="$color2">
    <Spinner size="large" color="$color11" />
  </YStack>
);

const Navigation = () => {
  const { user, setUser, role, setRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          setUser(token);
          const userRole = await getRole();
          if (userRole) setRole(userRole);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setRole]);

  if (isLoading) return <LoadingScreen />;
  if (!user) return <AuthNavigation />;
  if (!role) return <LoadingScreen />;
  return role === 'PARENT' ? <ParentBottomNavigation /> : <BottomNavigation />;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    // ---
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    // ---
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name="light">
          <ToastProvider>
            <AuthProvider>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
            </AuthProvider>
          </ToastProvider>
          <StatusBar style="auto" />
        </Theme>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
