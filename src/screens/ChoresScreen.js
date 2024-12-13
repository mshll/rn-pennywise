import { Text, YStack } from 'tamagui';
import ChoreCard from '../components/ChoreCard';

export default function ChoresScreen() {
  return (
    <YStack f={1} bg="$background" ai="center" jc="center" gap="$4" p="$4">
      <ChoreCard />
      <ChoreCard theme="blue" />
      <ChoreCard theme="red" />
      <ChoreCard theme="yellow" />
      <ChoreCard theme="purple" />
    </YStack>
  );
}
