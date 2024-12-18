import { Text, useTheme, YStack } from 'tamagui';
import ChoreCard from '../components/ChoreCard';
import { THEMES } from '../data/constants';
import ScreenWrapper from '../components/ScreenWrapper';
import { useChildChores, useUpdateChoreStatus } from '../hooks/useChild';

const ChoresScreen = () => {
  const theme = useTheme();
  const { data: chores, isLoading, error } = useChildChores();
  const { mutate: updateChoreStatus } = useUpdateChoreStatus();

  const handleComplete = (choreId) => {
    updateChoreStatus({ choreId, status: 'COMPLETED' });
  };

  if (isLoading) {
    return (
      <YStack f={1} ai="center" jc="center" backgroundColor="$color2">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack f={1} ai="center" jc="center" backgroundColor="$color2" p="$4">
        <Text color="$red10" ta="center">
          Error loading tasks: {error?.response?.data?.message || error.message}
        </Text>
        <Text color="$red10" ta="center" fontSize="$2" mt="$2">
          Status: {error?.response?.status}
        </Text>
      </YStack>
    );
  }

  const activeChores = chores?.filter((chore) => chore.status === 'PENDING') || [];
  const completedChores = chores?.filter((chore) => chore.status === 'COMPLETED') || [];

  return (
    <ScreenWrapper>
      <Text fontSize="$5" fontWeight="600" alignSelf="flex-start">
        Today's Tasks
      </Text>
      {activeChores.map((chore) => (
        <ChoreCard
          key={chore.id}
          chore={{
            ...chore,
            reward_amount: chore.rewardAmount, // Map API field to component field
            icon: chore.icon || 'list-check', // Provide default icon if null
          }}
          cardTheme={THEMES[chore.id % THEMES.length]}
          onComplete={handleComplete}
        />
      ))}

      {completedChores.length > 0 && (
        <>
          <Text fontSize="$5" fontWeight="600" alignSelf="flex-start" mt="$4">
            Completed Tasks 🌟
          </Text>
          {completedChores.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={{
                ...chore,
                reward_amount: chore.rewardAmount, // Map API field to component field
                icon: chore.icon || 'list-check', // Provide default icon if null
              }}
              cardTheme={THEMES[chore.id % THEMES.length]}
              onComplete={handleComplete}
            />
          ))}
        </>
      )}

      {!activeChores.length && !completedChores.length && (
        <YStack ai="center" jc="center" h={200} gap="$4">
          <Text fontSize="$4" color="$color11" ta="center">
            No tasks assigned yet!
          </Text>
        </YStack>
      )}
    </ScreenWrapper>
  );
};

export default ChoresScreen;
