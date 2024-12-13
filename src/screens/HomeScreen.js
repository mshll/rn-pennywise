import { View, YStack, XStack, Text } from 'tamagui';
import { getToken } from 'tamagui';

const HomeScreen = () => {
  return (
    <View f={1}>
      <YStack f={1} bg="$background" ai="center" jc="center">
        <XStack space="$4" ai="center">
          <Text fontSize="$6" fontWeight="bold">
            Pennywise Homescreen
          </Text>
        </XStack>
      </YStack>
    </View>
  );
};

export default HomeScreen;
