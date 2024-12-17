import { Text, YStack, XStack, Card, Theme, Circle, useTheme } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CoinAmount } from '../../utils/components';
import { useState } from 'react';

const TaskCard = ({ task: chore, theme: cardTheme, onComplete }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isCompleted = chore.status === 'COMPLETED';

  const handleConfirm = () => {
    onComplete(chore.id);
    setOpen(false);
  };

  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} pressStyle={{ scale: 0.95 }} animation="bouncy">
        <XStack gap="$3" ai="center">
          <Circle size="$6" bg="$color3">
            <Icon name={chore.icon} size={24} color={theme.color.val} />
          </Circle>
          <YStack f={1} gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" textDecorationLine={isCompleted ? 'line-through' : 'none'}>
              {chore.title}
            </Text>
            <Text fontSize="$3" color="$color11" numberOfLines={2} textDecorationLine={isCompleted ? 'line-through' : 'none'}>
              {chore.description}
            </Text>
            <CoinAmount amount={chore.reward_amount} size="$3" />
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
