import { ScrollView, Text, View, YStack, XStack } from 'tamagui';
import StoreCard from '../components/StoreCard';
import { useState } from 'react';

export default function StoreScreen() {
  // Mock balance (this would come from a global state or API in the real app)
  const [balance, setBalance] = useState(45);

  const [items, setItems] = useState([
    {
      item_id: 1,
      name: 'Nintendo Switch',
      description: 'A gaming console that lets you play games on TV or on-the-go.',
      price: 100,
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
      purchasedAt: null,
    },
    {
      item_id: 2,
      name: 'Bicycle',
      description: 'A brand new mountain bike for outdoor adventures.',
      price: 75,
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500',
      purchasedAt: null,
    },
    {
      item_id: 3,
      name: 'LEGO Set',
      description: 'Star Wars Millennium Falcon LEGO building set.',
      price: 50,
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500',
      purchasedAt: null,
    },
    {
      item_id: 4,
      name: 'Art Supplies Set',
      description: 'Complete set of art supplies including paints, brushes, and canvas.',
      price: 30,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500',
      purchasedAt: null,
    },
    {
      item_id: 5,
      name: 'Basketball',
      description: 'Official size basketball for indoor or outdoor play.',
      price: 25,
      image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500',
      purchasedAt: null,
    },
  ]);

  const themes = ['red', 'blue', 'green', 'yellow', 'orange', 'pink', 'purple'];

  const handlePurchase = (itemId) => {
    const item = items.find((i) => i.item_id === itemId);
    if (item && balance >= item.price) {
      setBalance((prev) => prev - item.price);
      setItems(items.map((item) => (item.item_id === itemId ? { ...item, purchasedAt: new Date().toISOString() } : item)));
    }
  };

  const availableItems = items
    .filter((item) => !item.purchasedAt)
    .sort((a, b) => {
      const aCanAfford = balance >= a.price;
      const bCanAfford = balance >= b.price;
      if (aCanAfford === bCanAfford) {
        return a.price - b.price; // If both affordable or both unaffordable, sort by price
      }
      return aCanAfford ? -1 : 1; // Affordable items first
    });

  const purchasedItems = items.filter((item) => item.purchasedAt);

  const renderItemGrid = (items) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(
        <XStack key={i} jc="space-between" w="100%" mb="$1">
          <StoreCard item={items[i]} cardTheme={themes[items[i].item_id % themes.length]} onPurchase={handlePurchase} balance={balance} />
          {items[i + 1] && (
            <StoreCard item={items[i + 1]} cardTheme={themes[items[i + 1].item_id % themes.length]} onPurchase={handlePurchase} balance={balance} />
          )}
        </XStack>
      );
    }
    return rows;
  };

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="$background" zIndex="2">
        <View bg="$color5" height={32} />
        <YStack f={1} bg="$background" borderTopLeftRadius={32} borderTopRightRadius={32} mt={-32}>
          <YStack f={1} jc="flex-start" gap="$4" p="$4">
            <XStack jc="space-between" ai="center">
              <Text fontSize="$5" fontWeight="600">
                Available Items
              </Text>
              <YStack ai="flex-end">
                <Text fontSize="$6" fontWeight="700" fontFamily="$heading" color="$color12">
                  {balance} KWD
                </Text>
                <Text fontSize="$2" color="$color11" fontWeight="500">
                  Your Balance
                </Text>
              </YStack>
            </XStack>
            {renderItemGrid(availableItems)}

            {purchasedItems.length > 0 && (
              <>
                <Text fontSize="$5" fontWeight="600" mt="$4">
                  Purchased Items
                </Text>
                {renderItemGrid(purchasedItems)}
              </>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
}
