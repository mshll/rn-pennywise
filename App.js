import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, XStack, YStack, Text, Theme, View } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <Theme name="green">
          <NavigationContainer>
            <BottomNavigation />
          </NavigationContainer>
          <StatusBar style="auto" />
        </Theme>
      </Theme>
    </TamaguiProvider>
  );
}
