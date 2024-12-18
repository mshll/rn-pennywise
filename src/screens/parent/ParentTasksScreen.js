import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Button, Image } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { THEMES } from '../../data/constants';
import ParentScreenWrapper from '../../components/parent/ParentScreenWrapper';
import TaskCard from '../../components/parent/TaskCard';
import { useParentProfile, useChildChores } from '../../hooks/useParent';

const ChildChoresSection = ({ child }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { data: chores, isLoading } = useChildChores(child.id);

  return (
    <YStack gap="$3">
      <XStack jc="space-between" ai="center">
        <XStack gap="$2" ai="center">
          <Circle size="$6" bg="$color4">
            <Image source={require('../../../assets/avatars/avatar1.png')} width={48} height={48} borderRadius={24} />
          </Circle>
          <YStack>
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
              {child.username}
            </Text>
          </YStack>
        </XStack>
        <Theme name="green">
          <Button
            size="$3"
            bg="$color4"
            icon={<Icon name="plus" size={12} color={theme.color.val} />}
            onPress={() => navigation.navigate('AddChoreScreen', { childId: child.id })}
          >
            <Text>Add Task</Text>
          </Button>
        </Theme>
      </XStack>

      {isLoading ? (
        <Card bg="$color4" br="$6" p="$4">
          <Text fontSize="$3" color="$color11" ta="center">
            Loading...
          </Text>
        </Card>
      ) : (
        <>
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
        </>
      )}
    </YStack>
  );
};

const ParentTasksScreen = () => {
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
          Tasks
        </Text>
        <Text fontSize="$4" color="$color11">
          Manage your children's tasks
        </Text>
      </YStack>

      {parentProfile?.children?.map((child) => (
        <ChildChoresSection key={child.id} child={child} />
      ))}

      {(!parentProfile?.children || parentProfile.children.length === 0) && (
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
