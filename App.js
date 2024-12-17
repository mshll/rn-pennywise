import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, XStack, YStack, Text, Theme, View } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';
import ParentBottomNavigation from './src/navigation/ParentNavigation/ParentBottomNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Fredoka_300Light, Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold } from '@expo-google-fonts/dev';
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/dev';
import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
} from '@expo-google-fonts/dev';
import { useState } from 'react';

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

  // TODO: Replace with actual auth state
  const [isParent] = useState(true);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <NavigationContainer>{isParent ? <ParentBottomNavigation /> : <BottomNavigation />}</NavigationContainer>
        <StatusBar style="auto" />
      </Theme>
    </TamaguiProvider>
  );
}
