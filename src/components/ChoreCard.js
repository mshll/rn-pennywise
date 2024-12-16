import { View, Text, Card, Theme, XStack, Circle, YStack, Button, Sheet, Adapt, Dialog, useTheme, Image } from 'tamagui';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

const CoinAmount = ({ amount, color = '$color', size = '$4' }) => (
  <XStack ai="center" gap="3">
    <Text fontWeight="600" fontSize={size} fontFamily="$heading" color={color}>
      {amount}
    </Text>
    <Image source={require('../../assets/images/coin.png')} width={24} height={24} resizeMode="contain" tintColor={color} />
  </XStack>
);

const CCard = ({ chore, onComplete }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onComplete(chore.id);
    setOpen(false);
  };

  const isCompleted = chore.status === 'COMPLETED';

  return (
    <Card
      bg={isCompleted ? '$color4' : '$color6'}
      br="$6"
      p="$3"
      w="100%"
      bc="$color4"
      borderBottomWidth={4}
      pressStyle={isCompleted ? undefined : { scale: 0.95 }}
      animation="bouncy"
      onPress={isCompleted ? undefined : () => setOpen(true)}
      o={isCompleted ? 0.7 : 1}
    >
      <XStack jc="space-between" ai="center" gap="7">
        <Circle bg="$color3" size="$4">
          {isCompleted ? <Icon name="check" size={16} color={theme.color.val} /> : <Icon name={chore.icon} size={16} color={theme.color.val} />}
        </Circle>
        <YStack f={1} gap="$1">
          <Text fontSize="$4" fontWeight="500" textDecorationLine={isCompleted ? 'line-through' : 'none'} fontFamily="$heading">
            {chore.title}
          </Text>
          {/* <Text textDecorationLine={isCompleted ? 'line-through' : 'none'}>{chore.description}</Text> */}
        </YStack>
        <View>
          <CoinAmount amount={chore.reward_amount} />
        </View>
      </XStack>

      <Sheet modal animation="medium" open={open} onOpenChange={setOpen} dismissOnSnapToBottom snapPointsMode="fit">
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <YStack f={1} gap="$4">
            <XStack w="100%" jc="center" ai="center">
              <Circle size="$12" bg="$color4">
                <Icon name={chore.icon} size={42} color={theme.color.val} />
              </Circle>
            </XStack>

            <YStack gap="$2">
              <Text fontSize="$6" fontWeight="600" fontFamily="$heading">
                {chore.title}
              </Text>
              <Text fontSize="$3" color="$color11">
                {chore.description}
              </Text>
            </YStack>

            <YStack gap="$2" py="$4" borderTopWidth={1} borderBottomWidth={1} borderColor="$color5">
              <XStack jc="space-between" ai="center">
                <Text fontSize="$3" color="$color11">
                  Your Reward
                </Text>
                <CoinAmount amount={chore.reward_amount} color="$color12" size="$3" />
              </XStack>
            </YStack>

            <YStack gap="$3" w="100%" mb="$6">
              <Button onPress={handleConfirm} size="$6" bg="$color7" fontWeight="600" fontSize="$3">
                Hooray! I did it! 🎉
              </Button>
              <Button onPress={() => setOpen(false)} size="$6" fontWeight="600" fontSize="$3">
                Not yet, still working on it!
              </Button>
            </YStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </Card>
  );
};

const ChoreCard = ({ cardTheme, chore, onComplete }) => {
  return (
    <Theme name={cardTheme}>
      <CCard chore={chore} onComplete={onComplete} />
    </Theme>
  );
};

export default ChoreCard;
