import { View, Text, Card, Theme, XStack, YStack, Button, Sheet, Image, useTheme, Progress } from 'tamagui';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

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
      bg={isPurchased ? '$color4' : canAfford ? '$color6' : '$color3'}
      br="$6"
      w="48%"
      bc="$color4"
      borderBottomWidth={4}
      pressStyle={!isPurchased ? { scale: 0.95 } : undefined}
      animation="bouncy"
      onPress={!isPurchased ? handlePress : undefined}
      o={isPurchased ? 0.7 : canAfford ? 1 : 1}
      overflow="hidden"
    >
      <Image source={{ uri: item.image }} width="100%" height={120} resizeMode="cover" />
      <YStack p="$3" gap="$2">
        <Text fontSize="$3" fontWeight="600" textDecorationLine={isPurchased ? 'line-through' : 'none'} fontFamily="$heading" numberOfLines={1}>
          {item.name}
        </Text>
        <Text fontSize="$2" textDecorationLine={isPurchased ? 'line-through' : 'none'} numberOfLines={2} color="$color11" h={36}>
          {item.description}
        </Text>
        <YStack>
          <XStack jc="space-between" ai="center">
            <Text fontWeight="600" fontSize="$4" fontFamily="$heading" color={canAfford ? '$color12' : '$color10'}>
              {item.price} KWD
            </Text>
            {!isPurchased && !canAfford && (
              <Text fontSize="$2" color="$color11">
                -{remainingAmount} KWD
              </Text>
            )}
          </XStack>
          {!isPurchased && !canAfford && (
            <Progress size="$1" value={progressPercentage} bg="$color1" mt="$2" height="8">
              <Progress.Indicator animation="bouncy" bg="$color9" />
            </Progress>
          )}
        </YStack>
      </YStack>

      <Sheet modal animation="medium" open={open} onOpenChange={setOpen} dismissOnSnapToBottom snapPointsMode="fit">
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <YStack f={1} jc="space-between">
            <YStack gap="$4" ai="center">
              <Image source={{ uri: item.image }} width={200} height={200} borderRadius={16} resizeMode="cover" />

              <YStack gap="$4" ai="center">
                <Text fontSize="$6" fontWeight="600" ta="center" fontFamily="$heading">
                  {item.name}
                </Text>
                <Text fontSize="$3" color="$color8" ta="center">
                  {item.description}
                </Text>

                <YStack gap="$2" ai="center">
                  <Text fontSize="$3" color="$color11" ta="center">
                    Your money now: {balance} KWD
                  </Text>
                  <Text fontSize="$3" color="$color11" ta="center">
                    Item price: -{item.price} KWD
                  </Text>
                  <Text fontSize="$3" fontWeight="600" color={remainingBalance >= 0 ? '$color12' : '$color10'} ta="center">
                    Money left: {remainingBalance} KWD
                  </Text>
                </YStack>
              </YStack>
            </YStack>

            <YStack gap="$4" ai="center" w="100%" pt="$2">
              <YStack gap="$3" w="100%" pb="$4">
                <Button onPress={handlePurchase} w="100%" size="$5" bg="$color7" fontWeight="600" fontSize="$2" fontFamily="$heading">
                  Yes, I want to buy this!
                </Button>
                <Button onPress={() => setOpen(false)} w="100%" size="$5" fontWeight="600" fontSize="$2" fontFamily="$heading">
                  No, maybe later
                </Button>
              </YStack>
            </YStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>

      <Sheet modal animation="medium" open={showCantAffordSheet} onOpenChange={setShowCantAffordSheet} dismissOnSnapToBottom snapPointsMode="fit">
        <Sheet.Overlay />
        <Sheet.Frame padding="$4" paddingBottom="$10">
          <YStack gap="$4" ai="center">
            <Image source={{ uri: item.image }} width="100%" height={250} borderRadius={16} resizeMode="cover" />
            <YStack gap="$4" mb="$8">
              <Text fontSize="$6" fontWeight="600" fontFamily="$heading" ta="center">
                Keep saving! 🎯
              </Text>
              <Text fontSize="$4" ta="center">
                You need {remainingAmount} KWD more to buy the {item.name}. Keep doing your chores and quizzes to earn more money!
              </Text>
            </YStack>
            <Button size="$4" theme="active" fontWeight="500" onPress={() => setShowCantAffordSheet(false)} fontFamily="$heading" w="100%">
              Got it!
            </Button>
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
