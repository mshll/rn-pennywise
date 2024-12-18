import { Text, YStack, XStack, Card, Theme, Circle, useTheme } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CoinAmount } from '../../utils/components';

const TaskCard = ({ task, theme: cardTheme }) => {
  const theme = useTheme();

  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4}>
        <XStack gap="$4">
          <Circle size="$6" bg="$color3">
            <Icon name={task.icon || 'list-check'} size={24} color={theme.color.val} />
          </Circle>
          <YStack f={1} gap="$1">
            <Text fontSize="$4" fontWeight="600" fontFamily="$heading">
              {task.title}
            </Text>
            <Text fontSize="$2" color="$color11">
              {task.description}
            </Text>
            <XStack mt="$2" jc="space-between" ai="center">
              <CoinAmount amount={task.rewardAmount} size="$3" />
              <Theme name={task.status === 'COMPLETED' ? 'green' : 'gray'}>
                <XStack bg="$color3" px="$2" py="$1" br="$4" gap="$1" ai="center">
                  <Icon name={task.status === 'COMPLETED' ? 'check' : 'clock'} size={12} color={theme.color.val} />
                  <Text fontSize="$2" color="$color11">
                    {task.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                  </Text>
                </XStack>
              </Theme>
            </XStack>
          </YStack>
        </XStack>
      </Card>
    </Theme>
  );
};

export default TaskCard;
