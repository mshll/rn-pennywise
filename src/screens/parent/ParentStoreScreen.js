import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image, ScrollView } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import { CoinAmount } from '../../utils/components';
import ParentScreenWrapper from '../../components/parent/ParentScreenWrapper';
import { useParentProfile, useChildStoreItems } from '../../hooks/useParent';
import { AVATARS } from '../../data/avatars';

const StoreItemCard = ({ item, theme: cardTheme }) => {
  const theme = useTheme();

  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" bc="$color4" borderBottomWidth={4} w={200} mr="$3" overflow="hidden">
        <Image source={{ uri: item.image }} width="100%" height={120} />
        <YStack p="$3" gap="$1">
          <Text fontSize="$4" fontWeight="600" fontFamily="$heading" numberOfLines={1}>
            {item.name}
          </Text>
          <Text fontSize="$2" color="$color11" numberOfLines={2}>
            {item.description}
          </Text>
          <CoinAmount amount={item.price} size="$3" mt="$2" />
        </YStack>
      </Card>
    </Theme>
  );
};

const ChildStoreSection = ({ child }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { data: storeItems, isLoading } = useChildStoreItems(child.id);

  return (
    <YStack gap="$3">
      <XStack gap="$2" ai="center">
        <Circle bw="$1.5" bc="$color3">
          <Image source={AVATARS[child.avatarUrl] || AVATARS.DEFAULT} width="$6" height="$6" borderRadius={24} />
        </Circle>
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          {child.username}'s Rewards
        </Text>
      </XStack>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Theme name="purple">
          <Card
            bg="$color6"
            br="$6"
            p="$4"
            bc="$color4"
            borderBottomWidth={4}
            w={200}
            mr="$3"
            pressStyle={{ scale: 0.95 }}
            animation="bouncy"
            onPress={() => navigation.navigate('AddStoreItemScreen', { childId: child.id })}
          >
            <YStack ai="center" gap="$2">
              <Circle size="$8" bg="$color3">
                <Icon name="plus" size={32} color={theme.color.val} />
              </Circle>
              <Text fontSize="$4" fontWeight="600" fontFamily="$heading" ta="center">
                Add Reward
              </Text>
              <Text fontSize="$2" color="$color11" ta="center">
                Create a new reward for {child.username}
              </Text>
            </YStack>
          </Card>
        </Theme>

        {isLoading ? (
          <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} w={200} mr="$3">
            <YStack ai="center" jc="center" h={120}>
              <Text>Loading...</Text>
            </YStack>
          </Card>
        ) : (
          storeItems?.map((item, index) => <StoreItemCard key={item.id} item={item} theme={THEMES[index % THEMES.length]} />)
        )}

        {!isLoading && (!storeItems || storeItems.length === 0) && (
          <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} w={200} mr="$3">
            <YStack ai="center" jc="center" h={120}>
              <Text fontSize="$3" color="$color11" ta="center">
                No rewards yet
              </Text>
            </YStack>
          </Card>
        )}
      </ScrollView>
    </YStack>
  );
};

const ParentStoreScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { data: parentProfile, isLoading, error } = useParentProfile();

  if (isLoading) {
    return (
      <ParentScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text>Loading...</Text>
        </YStack>
      </ParentScreenWrapper>
    );
  }

  if (error) {
    return (
      <ParentScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text color="$red10">Error loading profile</Text>
        </YStack>
      </ParentScreenWrapper>
    );
  }

  return (
    <ParentScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack gap="$2" mt="$4">
        <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
          Store
        </Text>
        <Text fontSize="$4" color="$color11">
          Manage rewards for your children
        </Text>
      </YStack>

      {parentProfile?.children?.map((child) => (
        <ChildStoreSection key={child.id} child={child} />
      ))}

      {(!parentProfile?.children || parentProfile.children.length === 0) && (
        <YStack ai="center" jc="center" h={200} gap="$4">
          <Circle size="$8" bg="$color4">
            <Icon name="store" size={32} color={theme.color.val} />
          </Circle>
          <YStack ai="center" gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" ta="center">
              No Children Yet
            </Text>
            <Text fontSize="$3" color="$color11" ta="center">
              Add your first child to start creating rewards!
            </Text>
          </YStack>
          <Theme name="green">
            <Button
              size="$4"
              bg="$color4"
              icon={<Icon name="plus" size={14} color={theme.color.val} />}
              onPress={() => navigation.navigate('AddChildScreen')}
            >
              <Text>Add Your First Child</Text>
            </Button>
          </Theme>
        </YStack>
      )}
    </ParentScreenWrapper>
  );
};

export default ParentStoreScreen;
