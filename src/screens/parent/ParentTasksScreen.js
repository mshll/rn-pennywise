import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image, Progress } from 'tamagui';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import { CoinAmount } from '../../utils/components';
import ParentScreenWrapper from '../../components/ParentScreenWrapper';
import TaskCard from '../../components/TaskCard';

// Dummy data for tasks
const dummyTasks = [
  {
    childId: 1,
    childName: 'Sarah Smith',
    childAvatar: 'https://placecats.com/200/200',
    tasks: [
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
    ],
  },
  {
    childId: 2,
    childName: 'John Smith Jr.',
    childAvatar: 'https://placecats.com/201/201',
    tasks: [
      {
        id: 3,
        title: 'Feed the Dog',
        description: 'Give Rex his dinner',
        reward_amount: 5,
        status: 'INCOMPLETE',
        icon: 'dog',
      },
      {
        id: 4,
        title: 'Practice Piano',
        description: '30 minutes of piano practice',
        reward_amount: 20,
        status: 'INCOMPLETE',
        icon: 'music',
      },
    ],
  },
];

const ChildTasksSection = ({ child }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const completedTasks = child.tasks.filter((task) => task.status === 'COMPLETED').length;
  const totalTasks = child.tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <YStack gap="$3">
      <XStack jc="space-between" ai="center">
        <XStack gap="$2" ai="center">
          <Circle size="$6" bg="$color4">
            <Image source={{ uri: child.childAvatar }} width={48} height={48} borderRadius={24} />
          </Circle>
          <YStack>
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
              {child.childName}
            </Text>
            <Text fontSize="$3" color="$color11">
              {completedTasks}/{totalTasks} Tasks Done
            </Text>
          </YStack>
        </XStack>
        <Theme name="green">
          <Button
            size="$3"
            bg="$color4"
            icon={<Icon name="plus" size={12} color={theme.color.val} />}
            onPress={() => navigation.navigate('AddChoreScreen', { childId: child.childId })}
          >
            <Text>Add Task</Text>
          </Button>
        </Theme>
      </XStack>

      <Progress size="$1" value={progress} bg="$color4">
        <Progress.Indicator animation="bouncy" bg="$color11" />
      </Progress>

      <YStack gap="$2">
        {child.tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} theme={THEMES[index % THEMES.length]} />
        ))}
      </YStack>
    </YStack>
  );
};

const ParentTasksScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [data] = useState(dummyTasks);

  return (
    <ParentScreenWrapper containerProps={{ gap: '$6' }}>
      <YStack gap="$2" mt="$4">
        <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
          Tasks
        </Text>
        <Text fontSize="$4" color="$color11">
          Manage your children's tasks
        </Text>
      </YStack>

      {data.map((child) => (
        <ChildTasksSection key={child.childId} child={child} />
      ))}

      {data.length === 0 && (
        <YStack ai="center" jc="center" h={200} gap="$4">
          <Circle size="$8" bg="$color4">
            <Icon name="list-check" size={32} color={theme.color.val} />
          </Circle>
          <YStack ai="center" gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" ta="center">
              No Children Yet
            </Text>
            <Text fontSize="$3" color="$color11" ta="center">
              Add your first child to start creating tasks!
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

export default ParentTasksScreen;
