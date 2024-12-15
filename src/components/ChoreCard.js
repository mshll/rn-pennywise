import { View, Text, Card, Theme, XStack, Circle, YStack, Button, Sheet, Adapt, Dialog, useTheme } from 'tamagui';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

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
      <XStack jc="space-between" ai="center" gap="$2">
        <Circle bg="$color3" size="$4">
          {isCompleted ? <Icon name="check" size={16} color={theme.color.val} /> : <Icon name={chore.icon} size={16} color={theme.color.val} />}
        </Circle>
        <YStack f={1} gap="$1">
          <Text fontSize="$4" fontWeight="600" textDecorationLine={isCompleted ? 'line-through' : 'none'} fontFamily="$heading">
            {chore.title}
          </Text>
          <Text textDecorationLine={isCompleted ? 'line-through' : 'none'}>{chore.description}</Text>
        </YStack>
        <View>
          <Text fontWeight="600" fontSize="$3" fontFamily="$heading">
            {chore.reward_amount} KWD
          </Text>
        </View>
      </XStack>

      <Sheet modal animation="medium" open={open} onOpenChange={setOpen} snapPoints={[60]}>
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <YStack f={1} jc="space-between">
            <YStack gap="$4" ai="center">
              <Circle size="$12" bg="$color3">
                <Icon name={chore.icon} size={42} color={theme.color.val} />
              </Circle>

              <YStack gap="$4" ai="center">
                <Text fontSize="$6" fontWeight="600" ta="center" fontFamily="$heading">
                  {chore.title}
                </Text>
                <Text fontSize="$3" color="$color8" ta="center">
                  {chore.description}
                </Text>
                <Text fontSize="$5" fontWeight="600" color="$color12" fontFamily="$heading">
                  {chore.reward_amount} KWD
                </Text>
              </YStack>
            </YStack>

            <YStack gap="$4" ai="center" w="100%" pt="$2">
              <YStack gap="$3" w="100%" pb="$4">
                <Button onPress={handleConfirm} w="100%" size="$5" bg="$color7" fontWeight="600" fontSize="$2">
                  Complete Task
                </Button>
                <Button variant="outlined" onPress={() => setOpen(false)} w="100%" size="$5" borderColor="$color7" fontWeight="600" fontSize="$2">
                  Cancel
                </Button>
              </YStack>
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
