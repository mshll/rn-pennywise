import { Brain } from '@tamagui/lucide-icons';
import { View, Text, Card, Theme, XStack, Circle, YStack, H2, H4 } from 'tamagui';
const ChoreCard = ({ theme }) => {
  return (
    <Theme name={theme} shallow>
      <Card bg="$color6" br="$5" p="$3" w="100%" bc="$color4" borderBottomWidth={4}>
        <XStack jc="space-between" ai="center" gap="$2">
          <Circle bg="$color3" size="$4">
            <Brain />
          </Circle>
          <YStack f={1} gap="$1">
            <Text fontSize="$5" fontWeight="bold">
              Chore
            </Text>
            <Text>Description</Text>
          </YStack>
          <View>
            <Text fontWeight="bold">10 KWD</Text>
          </View>
        </XStack>
      </Card>
    </Theme>
  );
};
export default ChoreCard;
