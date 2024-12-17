import { Text, useTheme } from 'tamagui';
import ChoreCard from '../components/ChoreCard';
import { useState } from 'react';
import { chores as initialChores } from '../data/chores';
import { THEMES } from '../data/constants';
import ScreenWrapper from '../components/ScreenWrapper';

const ChoresScreen = () => {
  const theme = useTheme();
  const [chores, setChores] = useState(initialChores);

  const handleComplete = (choreId) => {
    setChores(chores.map((chore) => (chore.id === choreId ? { ...chore, status: 'COMPLETED' } : chore)));
  };

  const activeChores = chores.filter((chore) => chore.status === 'INCOMPLETE');
  const completedChores = chores.filter((chore) => chore.status === 'COMPLETED');

  return (
    <ScreenWrapper>
      <Text fontSize="$5" fontWeight="600" alignSelf="flex-start">
        Today's Tasks
      </Text>
      {activeChores.map((chore) => (
        <ChoreCard key={chore.id} chore={chore} cardTheme={THEMES[chore.id % THEMES.length]} onComplete={handleComplete} />
      ))}

      {completedChores.length > 0 && (
        <>
          <Text fontSize="$5" fontWeight="600" alignSelf="flex-start" mt="$4">
            Completed Tasks 🌟
          </Text>
          {completedChores.map((chore) => (
            <ChoreCard key={chore.id} chore={chore} cardTheme={THEMES[chore.id % THEMES.length]} onComplete={handleComplete} />
          ))}
        </>
      )}
    </ScreenWrapper>
  );
};

export default ChoresScreen;
