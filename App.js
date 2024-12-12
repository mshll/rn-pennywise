import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, XStack, YStack, Text, Theme, View } from 'tamagui';
import tamaguiConfig from './tamagui.config';

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <Theme name="purple">
          <StatusBar style="auto" />
          <View f={1}>
            <YStack f={1} bg="$background" ai="center" jc="center">
              <XStack space="$4" ai="center">
                <Text fontSize="$6" fontWeight="bold">
                  Welcome to Tamagui + Expo
                </Text>
              </XStack>
            </YStack>
          </View>
        </Theme>
      </Theme>
    </TamaguiProvider>
  );
}
