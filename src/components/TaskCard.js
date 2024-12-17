import { Text, YStack, XStack, Card, Theme, Circle, useTheme } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CoinAmount } from '../utils/components';

const TaskCard = ({ task, theme: cardTheme }) => {
  const theme = useTheme();
  const isCompleted = task.status === 'COMPLETED';

  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} pressStyle={{ scale: 0.95 }} animation="bouncy">
        <XStack gap="$3" ai="center">
          <Circle size="$6" bg="$color3">
            <Icon name={task.icon} size={24} color={theme.color.val} />
          </Circle>
          <YStack f={1} gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" textDecorationLine={isCompleted ? 'line-through' : 'none'}>
              {task.title}
            </Text>
            <Text fontSize="$3" color="$color11" numberOfLines={2} textDecorationLine={isCompleted ? 'line-through' : 'none'}>
              {task.description}
            </Text>
            <CoinAmount amount={task.reward_amount} size="$3" />
          </YStack>
          <Circle bg={isCompleted ? '$green8' : '$color3'} size="$3">
            <Icon name={isCompleted ? 'check' : 'hourglass'} size={12} color={theme.color.val} />
          </Circle>
        </XStack>
      </Card>
    </Theme>
  );
};

export default TaskCard;
