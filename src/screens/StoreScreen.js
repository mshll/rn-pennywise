import { ScrollView, Text, View, YStack, XStack } from 'tamagui';
import StoreCard from '../components/StoreCard';
import { useState } from 'react';

export default function StoreScreen() {
  // Mock balance (this would come from a global state or API in the real app)
  const [balance, setBalance] = useState(80);

  const [items, setItems] = useState([
    {
      item_id: 10,
      name: 'SS George Boat',
      description: 'A cute boat that you can use to go on adventures.',
      price: 6,
      image:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9b9219bf-a5e3-41a9-a037-3211e37f9069/dcwgj8e-70a13e5b-23e0-439c-bd35-1fad09d34366.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzliOTIxOWJmLWE1ZTMtNDFhOS1hMDM3LTMyMTFlMzdmOTA2OVwvZGN3Z2o4ZS03MGExM2U1Yi0yM2UwLTQzOWMtYmQzNS0xZmFkMDlkMzQzNjYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ivNCQS98QC0bTulXAsjCV6Og-h8QWCsrjMs7hvIQUJE',
      purchasedAt: null,
    },
    {
      item_id: 11,
      name: 'Clown Costume',
      description: 'A cute clown costume for your next trick or treat!',
      price: 6,
      image: 'https://www.thortful.com/blog/wp-content/uploads/2020/10/Clown-Costume.jpg',
      purchasedAt: null,
    },
    {
      item_id: 12,
      name: 'Balloon Lamp',
      description: 'A balloon lamp that you can use to light up your room!',
      price: 6,
      image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_601/at%2Fnews-culture%2F2019-09%2Fit-red-balloon-lamp',
      purchasedAt: null,
    },
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

  // Separate items into three categories
  const readyToBuyItems = items.filter((item) => !item.purchasedAt && balance >= item.price);
  const keepSavingItems = items.filter((item) => !item.purchasedAt && balance < item.price);
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

  const renderSection = (title, subtitle, items, icon) => {
    if (items.length === 0) return null;
    return (
      <YStack gap="$4" mb="$2">
        <YStack>
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
            {title} {icon}
          </Text>
          {subtitle && (
            <Text fontSize="$3" color="$color11" mt="$2">
              {subtitle}
            </Text>
          )}
        </YStack>
        {renderItemGrid(items)}
      </YStack>
    );
  };

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="$background" zIndex="2">
        <View bg="$color5" height={32} />
        <YStack f={1} bg="$background" borderTopLeftRadius={32} borderTopRightRadius={32} mt={-32}>
          <YStack f={1} jc="flex-start" gap="$4" p="$4">
            <XStack jc="space-between" ai="center" mb="$2">
              <Text fontSize="$6" fontWeight="700" fontFamily="$heading">
                My Rewards
              </Text>
              <YStack ai="flex-end">
                <Text fontSize="$6" fontWeight="700" fontFamily="$heading" color="$color12">
                  {balance} KWD
                </Text>
                <Text fontSize="$2" color="$color11" fontWeight="500">
                  My Piggy Bank
                </Text>
              </YStack>
            </XStack>

            {renderSection(
              'Ready to Buy! 🎉',
              readyToBuyItems.length > 0 ? "You've saved enough coins for these awesome rewards!" : null,
              readyToBuyItems
            )}

            {renderSection(
              'Keep Saving! 🎯',
              keepSavingItems.length > 0 ? 'Almost there! Keep doing your tasks to earn these.' : null,
              keepSavingItems
            )}

            {renderSection('My Rewards 🌟', purchasedItems.length > 0 ? 'Look at all the amazing rewards you earned!' : null, purchasedItems)}

            {items.length === 0 && (
              <YStack ai="center" jc="center" h={200}>
                <Text fontSize="$4" color="$color11" ta="center">
                  Oops! The treasure shop is empty right now!
                </Text>
              </YStack>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
}
