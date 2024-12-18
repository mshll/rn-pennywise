import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Image, Progress } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CoinAmount } from '../../utils/components';
import { AVATARS } from '../../data/avatars';
import { useChildChores } from '../../hooks/useParent';

const ChildCard = ({ child, onPress, theme: cardTheme, showProgress = true }) => {
  const theme = useTheme();
  const { data: chores, isLoading } = useChildChores(child.id);

  const completedChores = chores?.filter((c) => c.status === 'COMPLETED')?.length || 0;
  const totalChores = chores?.length || 0;
  const progress = totalChores > 0 ? Math.round((completedChores / totalChores) * 100) : 0;

  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} pressStyle={{ scale: 0.95 }} animation="bouncy" onPress={onPress}>
        <XStack gap="$3" ai="center">
          <Circle bw="$1.5" bc="$color3">
            <Image source={AVATARS[child.avatarUrl] || AVATARS.DEFAULT} width="$6" height="$6" borderRadius={24} />
          </Circle>
          <YStack f={1} gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
              {child.username}
            </Text>
            <XStack ai="center" gap="$4">
              <CoinAmount amount={child.balance} size="$3" />
              {showProgress && (
                <XStack ai="center" gap="$1">
                  <Icon name="list-check" size={12} color={theme.color11.val} />
                  <Text fontSize="$3" color="$color11">
                    {isLoading ? 'Loading...' : `${completedChores}/${totalChores} Tasks`}
                  </Text>
                </XStack>
              )}
            </XStack>
            {showProgress && (
              <Progress size="$1" value={progress} bg="$color4">
                <Progress.Indicator animation="bouncy" bg="$color11" />
              </Progress>
            )}
          </YStack>
          <Circle bg="$color3" size="$3">
            <Icon name="chevron-right" size={12} color={theme.color.val} />
          </Circle>
        </XStack>
      </Card>
    </Theme>
  );
};

export default ChildCard;
