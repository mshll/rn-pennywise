import { Text, YStack, useTheme } from 'tamagui';
import StoreCard from '../components/StoreCard';
import { THEMES } from '../data/constants';
import ScreenWrapper from '../components/ScreenWrapper';
import { useChildProfile, useChildStoreItems, useBuyStoreItem } from '../hooks/useChild';

const StoreScreen = () => {
  const theme = useTheme();
  const { data: profile, isLoading: isLoadingProfile } = useChildProfile();
  const { data: items, isLoading: isLoadingItems } = useChildStoreItems();
  const { mutate: buyItem } = useBuyStoreItem();

  const handlePurchase = (itemId) => {
    buyItem(itemId);
  };

  if (isLoadingProfile || isLoadingItems) {
    return (
      <YStack f={1} ai="center" jc="center" backgroundColor="$color2">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  // Separate items into categories
  const readyToBuyItems = items?.filter((item) => !item.purchasedAt && profile?.balance >= item.price) || [];
  const keepSavingItems = items?.filter((item) => !item.purchasedAt && profile?.balance < item.price) || [];
  const purchasedItems = items?.filter((item) => item.purchasedAt) || [];

  const renderItems = (items) => {
    return items.map((item) => (
      <StoreCard
        key={item.id}
        item={{
          ...item,
          item_id: item.id, // Map API id to item_id for StoreCard compatibility
          price: item.price,
          purchasedAt: item.purchasedAt,
        }}
        cardTheme={THEMES[item.id % THEMES.length]}
        onPurchase={handlePurchase}
        balance={profile?.balance || 0}
      />
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
      {renderSection('Ready to Buy! 🎉', readyToBuyItems.length > 0 ? "You've saved enough money for these awesome rewards!" : null, readyToBuyItems)}

      {renderSection('Keep Saving! 🎯', keepSavingItems.length > 0 ? 'Almost there! Keep doing your tasks to earn these.' : null, keepSavingItems)}

      {renderSection('My Rewards 🌟', purchasedItems.length > 0 ? 'Look at all the amazing rewards you earned!' : null, purchasedItems)}

      {items?.length === 0 && (
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
