import { View, Text, Card, Theme, XStack, YStack, Button, Sheet, Image, useTheme, Progress } from 'tamagui';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CoinAmount } from '../utils/components';

const CCard = ({ item, onPurchase, balance }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showCantAffordSheet, setShowCantAffordSheet] = useState(false);

  const handlePurchase = () => {
    onPurchase(item.item_id);
    setOpen(false);
  };

  const isPurchased = !!item.purchasedAt;
  const canAfford = balance >= item.price;
  const progressPercentage = Math.floor(Math.min((balance / item.price) * 100, 100));
  const remainingAmount = item.price - balance;
  const remainingBalance = balance - item.price;

  const handlePress = () => {
    if (!isPurchased) {
      if (canAfford) {
        setOpen(true);
      } else {
        setShowCantAffordSheet(true);
      }
    }
  };

  return (
    <Card
      bg={isPurchased ? '$color5' : canAfford ? '$color6' : '$color5'}
      br="$6"
      w="100%"
      bc="$color4"
      borderBottomWidth={4}
      pressStyle={!isPurchased ? { scale: 0.95 } : undefined}
      animation="bouncy"
      onPress={!isPurchased ? handlePress : undefined}
      o={isPurchased ? 0.7 : 1}
      overflow="hidden"
    >
      <YStack>
        <Image source={{ uri: item.image }} width="100%" height={200} resizeMode="cover" />
        <YStack p="$3" gap="$2">
          <XStack jc="space-between" ai="center" gap="$2">
            <Text
              fontSize="$5"
              fontWeight="500"
              textDecorationLine={isPurchased ? 'line-through' : 'none'}
              fontFamily="$heading"
              numberOfLines={1}
              f={1}
              color="$color12"
            >
              {item.name}
            </Text>
            {!canAfford && !isPurchased ? (
              <XStack ai="center" gap="$1">
                <Text fontWeight="600" fontSize="$6" fontFamily="$heading" color="$color11">
                  {balance}/
                </Text>
                <CoinAmount amount={item.price} />
              </XStack>
            ) : (
              <CoinAmount amount={item.price} />
            )}
          </XStack>
          {!isPurchased && !canAfford && (
            <Progress size="$2" value={progressPercentage} bg="$color4" mt="$2">
              <Progress.Indicator animation="bouncy" bg="$color9" />
            </Progress>
          )}
        </YStack>
      </YStack>

      <Sheet modal animation="medium" open={open} onOpenChange={setOpen} dismissOnSnapToBottom snapPointsMode="fit">
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <YStack f={1} gap="$4">
            <Image source={{ uri: item.image }} width="100%" height={200} borderRadius={14} resizeMode="cover" />

            <YStack gap="$2">
              <Text fontSize="$6" fontWeight="600" fontFamily="$heading">
                {item.name}
              </Text>
              <Text fontSize="$3" color="$color11">
                {item.description}
              </Text>
            </YStack>

            <YStack gap="$2" py="$4" borderTopWidth={1} borderBottomWidth={1} borderColor="$color5">
              <XStack jc="space-between" ai="center">
                <Text fontSize="$3" color="$color11">
                  My Piggy Bank
                </Text>
                <CoinAmount amount={balance} clr="$color11" />
              </XStack>
              <XStack jc="space-between" ai="center">
                <Text fontSize="$3" color="$color11">
                  Cost
                </Text>
                <XStack ai="center" gap="$1">
                  <Text fontSize="$3" fontWeight="600" color="$color11">
                    -
                  </Text>
                  <CoinAmount amount={item.price} clr="$color11" />
                </XStack>
              </XStack>
              <XStack jc="space-between" ai="center">
                <Text fontSize="$3" fontWeight="600">
                  Money Left
                </Text>
                <CoinAmount amount={remainingBalance} clr={remainingBalance >= 0 ? '$color12' : '$color10'} />
              </XStack>
            </YStack>

            <YStack gap="$3" w="100%" mb="$6">
              <Button onPress={handlePurchase} size="$6" bg="$color7" fontWeight="600" fontSize="$3">
                Yes, I want to buy it!
              </Button>
              <Button onPress={() => setOpen(false)} size="$6" fontWeight="600" fontSize="$3">
                Cancel
              </Button>
            </YStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>

      <Sheet modal animation="medium" open={showCantAffordSheet} onOpenChange={setShowCantAffordSheet} dismissOnSnapToBottom snapPointsMode="fit">
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <YStack gap="$4" ai="center">
            <Image source={{ uri: item.image }} width="100%" height={200} borderRadius={16} resizeMode="cover" />
            <YStack gap="$2" mb="$8">
              <Text fontSize="$6" fontWeight="600" fontFamily="$heading">
                Almost there! 🎯
              </Text>
              <Text fontSize="$3" color="$color11">
                You need {remainingAmount} KD more to buy the {item.name}. Keep doing your chores and quizzes to earn more money!
              </Text>
            </YStack>
            <YStack gap="$3" w="100%" mb="$6">
              <Button onPress={() => setShowCantAffordSheet(false)} size="$6" bg="$color7" fontWeight="600" fontSize="$3" w="100%">
                I'll keep saving!
              </Button>
            </YStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </Card>
  );
};

const StoreCard = ({ cardTheme, item, onPurchase, balance }) => {
  return (
    <Theme name={cardTheme}>
      <CCard item={item} onPurchase={onPurchase} balance={balance} />
    </Theme>
  );
};

export default StoreCard;
