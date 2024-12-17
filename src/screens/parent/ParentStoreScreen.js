import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image, ScrollView } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import { CoinAmount } from '../../utils/components';
import ParentScreenWrapper from '../../components/ParentScreenWrapper';

// Dummy data for children and their store items
const dummyData = [
  {
    childId: 1,
    name: 'Sarah Smith',
    avatar: 'https://placecats.com/200/200',
    items: [
      {
        item_id: 1,
        name: 'Extra Screen Time',
        description: '30 minutes of extra screen time',
        price: 50,
        image: 'https://placecats.com/300/200',
      },
      {
        item_id: 2,
        name: 'Ice Cream Trip',
        description: 'A trip to the ice cream shop',
        price: 100,
        image: 'https://placecats.com/301/200',
      },
    ],
  },
  {
    childId: 2,
    name: 'John Smith Jr.',
    avatar: 'https://placecats.com/201/201',
    items: [
      {
        item_id: 3,
        name: 'Movie Night',
        description: 'Watch any movie of your choice',
        price: 75,
        image: 'https://placecats.com/302/200',
      },
      {
        item_id: 4,
        name: 'Pizza Party',
        description: 'Have a pizza party with friends',
        price: 150,
        image: 'https://placecats.com/303/200',
      },
    ],
  },
];

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

const ChildStoreSection = ({ child, onAddItem }) => {
  const theme = useTheme();

  return (
    <YStack gap="$3">
      <XStack gap="$2" ai="center">
        <Circle size="$6" bg="$color4">
          <Image source={{ uri: child.avatar }} width={48} height={48} borderRadius={24} />
        </Circle>
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          {child.name}'s Rewards
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
            onPress={() => onAddItem(child.childId)}
          >
            <YStack ai="center" gap="$2">
              <Circle size="$8" bg="$color3">
                <Icon name="plus" size={32} color={theme.color.val} />
              </Circle>
              <Text fontSize="$4" fontWeight="600" fontFamily="$heading" ta="center">
                Add Reward
              </Text>
              <Text fontSize="$2" color="$color11" ta="center">
                Create a new reward for {child.name}
              </Text>
            </YStack>
          </Card>
        </Theme>

        {child.items.map((item, index) => (
          <StoreItemCard key={item.item_id} item={item} theme={THEMES[index % THEMES.length]} />
        ))}
      </ScrollView>
    </YStack>
  );
};

const ParentStoreScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [data] = useState(dummyData);

  const handleAddItem = (childId) => {
    navigation.navigate('AddStoreItemScreen', { childId });
  };

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

      {data.map((child) => (
        <ChildStoreSection key={child.childId} child={child} onAddItem={handleAddItem} />
      ))}

      {data.length === 0 && (
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
