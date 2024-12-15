import { ScrollView, Text, View, YStack } from 'tamagui';

const HomeScreen = () => {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="$background" zIndex="2">
        <View bg="$color5" height={32} />
        <YStack f={1} bg="$background" borderTopLeftRadius={32} borderTopRightRadius={32} mt={-32}>
          <YStack f={1} ai="center" jc="flex-start" gap="$4" p="$4">
            <Text fontSize="$5" fontWeight="600" alignSelf="flex-start">
              Welcome Home
            </Text>
            {/* Add your home screen content here */}
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
