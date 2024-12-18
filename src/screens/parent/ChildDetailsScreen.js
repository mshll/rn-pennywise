import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image, Progress, Avatar, ScrollView } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import { CoinAmount } from '../../utils/components';
import ParentScreenWrapper from '../../components/parent/ParentScreenWrapper';
import TaskCard from '../../components/parent/TaskCard';
import { useParentProfile, useChildChores, useChildStoreItems } from '../../hooks/useParent';

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

  const { data: parentProfile, isLoading: isLoadingProfile } = useParentProfile();
  const { data: chores, isLoading: isLoadingChores } = useChildChores(childId);
  const { data: storeItems, isLoading: isLoadingStoreItems } = useChildStoreItems(childId);

  const child = parentProfile?.children?.find((c) => c.id === childId);

  const isLoading = isLoadingProfile || isLoadingChores || isLoadingStoreItems;

  if (isLoading) {
    return (
      <ParentScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text>Loading...</Text>
        </YStack>
      </ParentScreenWrapper>
    );
  }

  if (!child) {
    return (
      <ParentScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text color="$red10">Child not found</Text>
        </YStack>
      </ParentScreenWrapper>
    );
  }

  const completedChores = chores?.filter((c) => c.status === 'COMPLETED')?.length || 0;
  const totalChores = chores?.length || 0;

  return (
    <ParentScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack ai="center" gap="$4">
        <Avatar circular size="$12" borderWidth={4} borderColor="$color6">
          <Avatar.Image source={require('../../../assets/avatars/avatar1.png')} />
          <Avatar.Fallback backgroundColor="$color6" />
        </Avatar>
        <YStack ai="center" gap="$1">
          <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
            {child.username}
          </Text>
          <Text fontSize="$4" color="$color11">
            {child.email}
          </Text>
        </YStack>
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Overview
        </Text>
        <XStack gap="$3">
          <QuickStatsCard icon="piggy-bank" title="Balance" value={<CoinAmount amount={child.balance} />} theme="pink" />
          <QuickStatsCard icon="list-check" title="Tasks Done" value={`${completedChores}/${totalChores}`} theme="green" />
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

        {chores?.map((chore, index) => (
          <TaskCard key={chore.id} task={chore} theme={THEMES[index % THEMES.length]} />
        ))}

        {(!chores || chores.length === 0) && (
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
                  Create a new reward for {child.username}
                </Text>
              </YStack>
            </Card>
          </Theme>

          {storeItems?.map((item, index) => (
            <StoreItemCard key={item.id} item={item} theme={THEMES[index % THEMES.length]} />
          ))}
        </ScrollView>

        {(!storeItems || storeItems.length === 0) && (
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
