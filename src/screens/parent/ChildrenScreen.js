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
          <Circle bg="$color3" size="$3">
            <Icon name="chevron-right" size={12} color={theme.color.val} />
          </Circle>
        </XStack>
      </Card>
    </Theme>
  );
};

const ChildrenScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [children] = useState(dummyChildren);

  return (
    <ParentScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack gap="$2" mt="$4">
        <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
          Children
        </Text>
        <Text fontSize="$4" color="$color11">
          Manage your children's accounts
        </Text>
      </YStack>

      <YStack gap="$3">
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
            All Children
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
        <YStack ai="center" jc="center" h={200} gap="$4">
          <Circle size="$8" bg="$color4">
            <Icon name="users" size={32} color={theme.color.val} />
          </Circle>
          <YStack ai="center" gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" ta="center">
              No Children Yet
            </Text>
            <Text fontSize="$3" color="$color11" ta="center">
              Add your first child to start managing their tasks and rewards!
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

export default ChildrenScreen;
