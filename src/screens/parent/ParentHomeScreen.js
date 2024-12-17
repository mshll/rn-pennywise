import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image, Progress } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import { CoinAmount } from '../../utils/components';
import ParentScreenWrapper from '../../components/parent/ParentScreenWrapper';

// Dummy data for children
const dummyChildren = [
  {
    id: 1,
    name: 'Sarah Smith',
    balance: 80,
    activeChores: 3,
    completedChores: 5,
    totalChores: 8,
    avatar: 'https://placecats.com/200/200',
  },
  {
    id: 2,
    name: 'John Smith',
    balance: 120,
    activeChores: 2,
    completedChores: 7,
    totalChores: 9,
    avatar: 'https://placecats.com/201/201',
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

const ChildCard = ({ child, onPress, theme: cardTheme }) => {
  const theme = useTheme();
  const progress = Math.round((child.completedChores / child.totalChores) * 100);

  return (
    <Theme name={cardTheme}>
      <Card bg="$color6" br="$6" p="$4" bc="$color4" borderBottomWidth={4} pressStyle={{ scale: 0.95 }} animation="bouncy" onPress={onPress}>
        <XStack gap="$3" ai="center">
          <Circle size="$6" bg="$color3">
            <Image source={{ uri: child.avatar }} width={48} height={48} borderRadius={24} />
          </Circle>
          <YStack f={1} gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
              {child.name}
            </Text>
            <XStack ai="center" gap="$4">
              <CoinAmount amount={child.balance} size="$3" />
              <XStack ai="center" gap="$1">
                <Icon name="list-check" size={12} color={theme.color11.val} />
                <Text fontSize="$3" color="$color11">
                  {child.completedChores}/{child.totalChores} Tasks
                </Text>
              </XStack>
            </XStack>
            <Progress size="$1" value={progress} bg="$color4">
              <Progress.Indicator animation="bouncy" bg="$color11" />
            </Progress>
          </YStack>
        </XStack>
      </Card>
    </Theme>
  );
};

const ParentHomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [children] = useState(dummyChildren);

  // Calculate total stats
  const totalBalance = children.reduce((sum, child) => sum + child.balance, 0);
  const totalActiveChores = children.reduce((sum, child) => sum + child.activeChores, 0);
  const totalCompletedChores = children.reduce((sum, child) => sum + child.completedChores, 0);
  const totalChores = children.reduce((sum, child) => sum + child.totalChores, 0);

  return (
    <ParentScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack gap="$2" mt="$4">
        <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
          Welcome back! 👋
        </Text>
        <Text fontSize="$4" color="$color11">
          Here's how your children are doing
        </Text>
      </YStack>

      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Overview
        </Text>
        <XStack gap="$3">
          <QuickStatsCard icon="piggy-bank" title="Total Balance" value={<CoinAmount amount={totalBalance} />} theme="pink" />
          <QuickStatsCard icon="list-check" title="Tasks Done" value={`${totalCompletedChores}/${totalChores}`} theme="green" />
        </XStack>
      </YStack>

      <YStack gap="$3">
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
            Children
          </Text>
          <Theme name="green">
            <Button
              size="$3"
              bg="$color4"
              icon={<Icon name="plus" size={12} color={theme.color.val} />}
              onPress={() => navigation.navigate('AddChildScreen')}
            >
              <Text>Add Child</Text>
            </Button>
          </Theme>
        </XStack>

        {children.map((child, index) => (
          <ChildCard
            key={child.id}
            child={child}
            theme={THEMES[index % THEMES.length]}
            onPress={() => navigation.navigate('ChildDetailsScreen', { childId: child.id })}
          />
        ))}
      </YStack>

      {children.length === 0 && (
        <YStack ai="center" jc="center" h={200}>
          <Text fontSize="$4" color="$color11" ta="center">
            You haven't added any children yet.
          </Text>
          <Text fontSize="$4" color="$color11" ta="center">
            Add your first child to get started!
          </Text>
        </YStack>
      )}
    </ParentScreenWrapper>
  );
};

export default ParentHomeScreen;
