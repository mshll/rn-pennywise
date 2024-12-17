import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image, Progress, Avatar, ScrollView } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import { CoinAmount } from '../../utils/components';
import ParentScreenWrapper from '../../components/ParentScreenWrapper';
import TaskCard from '../../components/TaskCard';

// Dummy data for child details
const dummyChild = {
  id: 1,
  name: 'Sarah Smith',
  balance: 80,
  activeChores: 3,
  completedChores: 5,
  totalChores: 8,
  avatar: 'https://placecats.com/200/200',
  email: 'sarah@example.com',
  birthYear: 2012,
  username: 'sarahsmith',
};

// Dummy data for chores
const dummyChores = [
  {
    id: 1,
    title: 'Clean Room',
    description: 'Make your bed and organize your toys',
    reward_amount: 10,
    status: 'INCOMPLETE',
    icon: 'broom',
  },
  {
    id: 2,
    title: 'Do Homework',
    description: "Complete today's math homework",
    reward_amount: 15,
    status: 'COMPLETED',
    icon: 'book',
  },
];

// Dummy data for store items
const dummyStoreItems = [
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
];

const QuickStatsCard = ({ icon, title, value, theme: cardTheme }) => {
  const theme = useTheme();
  return (
    <Theme name={cardTheme}>
      <Card f={1} bg="$color6" br="$6" p="$3" bc="$color4" borderBottomWidth={4}>
        <YStack gap="$2">
          <Circle size="$3" bg="$color3">
            <Icon name={icon} size={14} color={theme.color.val} />
          </Circle>
          <Text fontSize="$2" color="$color11">
            {title}
          </Text>
          <Text fontSize="$6" fontWeight="600" fontFamily="$heading">
            {value}
          </Text>
        </YStack>
      </Card>
    </Theme>
  );
};

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

const ChildDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { childId } = route.params;
  const [child] = useState(dummyChild);
  const [chores] = useState(dummyChores);
  const [storeItems] = useState(dummyStoreItems);

  return (
    <ParentScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack ai="center" gap="$4">
        <Avatar circular size="$12" borderWidth={4} borderColor="$color6">
          <Avatar.Image source={{ uri: child.avatar }} />
          <Avatar.Fallback backgroundColor="$color6" />
        </Avatar>
        <YStack ai="center" gap="$1">
          <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
            {child.name}
          </Text>
          <Text fontSize="$4" color="$color11">
            @{child.username}
          </Text>
        </YStack>
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Overview
        </Text>
        <XStack gap="$3">
          <QuickStatsCard icon="piggy-bank" title="Balance" value={<CoinAmount amount={child.balance} />} theme="pink" />
          <QuickStatsCard icon="list-check" title="Tasks Done" value={`${child.completedChores}/${child.totalChores}`} theme="green" />
        </XStack>
      </YStack>

      <YStack gap="$3">
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
            Tasks
          </Text>
          <Theme name="green">
            <Button
              size="$3"
              bg="$color4"
              icon={<Icon name="plus" size={12} color={theme.color.val} />}
              onPress={() => navigation.navigate('AddChoreScreen', { childId })}
            >
              <Text>Add Task</Text>
            </Button>
          </Theme>
        </XStack>

        {chores.map((chore, index) => (
          <TaskCard key={chore.id} task={chore} theme={THEMES[index % THEMES.length]} />
        ))}

        {chores.length === 0 && (
          <Card bg="$color4" br="$6" p="$4">
            <Text fontSize="$3" color="$color11" ta="center">
              No tasks assigned yet
            </Text>
          </Card>
        )}
      </YStack>

      <YStack gap="$3">
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
            Rewards
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
              onPress={() => navigation.navigate('AddStoreItemScreen', { childId })}
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

          {storeItems.map((item, index) => (
            <StoreItemCard key={item.item_id} item={item} theme={THEMES[index % THEMES.length]} />
          ))}
        </ScrollView>

        {storeItems.length === 0 && (
          <Card bg="$color4" br="$6" p="$4">
            <Text fontSize="$3" color="$color11" ta="center">
              No rewards added yet
            </Text>
          </Card>
        )}
      </YStack>
    </ParentScreenWrapper>
  );
};

export default ChildDetailsScreen;
