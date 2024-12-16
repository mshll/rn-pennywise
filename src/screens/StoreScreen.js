import { Text, YStack, useTheme } from 'tamagui';
import StoreCard from '../components/StoreCard';
import { useState } from 'react';
import { storeItems as initialItems } from '../data/storeItems';
import { THEMES, INITIAL_BALANCE } from '../data/constants';
import ScreenWrapper from '../components/ScreenWrapper';

const StoreScreen = () => {
  const theme = useTheme();

  // Mock balance (this would come from a global state or API in the real app)
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [items, setItems] = useState(initialItems);

  const handlePurchase = (itemId) => {
    const item = items.find((i) => i.item_id === itemId);
    if (item && balance >= item.price) {
      setBalance((prev) => prev - item.price);
      setItems(items.map((item) => (item.item_id === itemId ? { ...item, purchasedAt: new Date().toISOString() } : item)));
    }
  };

  // Separate items into categories
  const readyToBuyItems = items.filter((item) => !item.purchasedAt && balance >= item.price);
  const keepSavingItems = items.filter((item) => !item.purchasedAt && balance < item.price);
  const purchasedItems = items.filter((item) => item.purchasedAt);

  const renderItems = (items) => {
    return items.map((item) => (
      <StoreCard key={item.item_id} item={item} cardTheme={THEMES[item.item_id % THEMES.length]} onPurchase={handlePurchase} balance={balance} />
    ));
  };

  const renderSection = (title, subtitle, items, icon) => {
    if (items.length === 0) return null;
    return (
      <YStack gap="$4" mb="$4">
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
        <YStack gap="$3">{renderItems(items)}</YStack>
      </YStack>
    );
  };

  return (
    <ScreenWrapper>
      {renderSection('Ready to Buy! 🎉', readyToBuyItems.length > 0 ? "You've saved enough coins for these awesome rewards!" : null, readyToBuyItems)}

      {renderSection('Keep Saving! 🎯', keepSavingItems.length > 0 ? 'Almost there! Keep doing your tasks to earn these.' : null, keepSavingItems)}

      {renderSection('My Rewards 🌟', purchasedItems.length > 0 ? 'Look at all the amazing rewards you earned!' : null, purchasedItems)}

      {items.length === 0 && (
        <YStack ai="center" jc="center" h={200}>
          <Text fontSize="$4" color="$color11" ta="center">
            Oops! The treasure shop is empty right now!
          </Text>
        </YStack>
      )}
    </ScreenWrapper>
  );
};

export default StoreScreen;
