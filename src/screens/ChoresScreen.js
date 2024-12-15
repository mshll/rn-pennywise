import { ScrollView, Text, View, YStack } from 'tamagui';
import ChoreCard from '../components/ChoreCard';
import { useState } from 'react';

export default function ChoresScreen() {
  const [chores, setChores] = useState([
    {
      id: 1,
      reward_amount: 1.5,
      status: 'INCOMPLETE',
      title: 'Clean the living room',
      description: 'Vacuum, dust, and organize the living room area.',
      icon: 'broom',
    },
    {
      id: 2,
      reward_amount: 1.0,
      status: 'INCOMPLETE',
      title: 'Wash the dishes',
      description: 'Clean all dishes in the sink and dry them.',
      icon: 'sink',
    },
    {
      id: 3,
      reward_amount: 0.25,
      status: 'INCOMPLETE',
      title: 'Take out the trash',
      description: 'Empty all trash bins and take them to the curb.',
      icon: 'trash',
    },
    {
      id: 4,
      reward_amount: 2.0,
      status: 'INCOMPLETE',
      title: 'Do the laundry',
      description: 'Wash, dry, and fold all clothes.',
      icon: 'shirt',
    },
    {
      id: 5,
      reward_amount: 5.0,
      status: 'INCOMPLETE',
      title: 'Mow the lawn',
      description: 'Trim the grass in the front and backyard.',
      icon: 'leaf',
    },
    {
      id: 6,
      reward_amount: 1.5,
      status: 'INCOMPLETE',
      title: 'Water the plants',
      description: 'Water all indoor and outdoor plants.',
      icon: 'seedling',
    },
    {
      id: 7,
      reward_amount: 2.0,
      status: 'INCOMPLETE',
      title: 'Organize the garage',
      description: 'Sort and tidy up items in the garage.',
      icon: 'warehouse',
    },
    {
      id: 8,
      reward_amount: 3.0,
      status: 'INCOMPLETE',
      title: 'Sweep the patio',
      description: 'Sweep and clean the outdoor patio area.',
      icon: 'pump-soap',
    },
    {
      id: 9,
      reward_amount: 1.0,
      status: 'INCOMPLETE',
      title: 'Wash the car',
      description: 'Clean the exterior and interior of the car.',
      icon: 'car',
    },
    {
      id: 10,
      reward_amount: 2.5,
      status: 'INCOMPLETE',
      title: 'Clean the bathroom',
      description: 'Scrub the toilet, sink, and shower.',
      icon: 'toilet',
    },
  ]);

  const themes = ['red', 'blue', 'green', 'yellow', 'orange', 'pink', 'purple'];

  const handleComplete = (choreId) => {
    setChores(chores.map((chore) => (chore.id === choreId ? { ...chore, status: 'COMPLETED' } : chore)));
  };

  const activeChores = chores.filter((chore) => chore.status === 'INCOMPLETE');
  const completedChores = chores.filter((chore) => chore.status === 'COMPLETED');

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="$background" zIndex="2">
        <View bg="$color5" height={32} />
        <YStack f={1} bg="$background" borderTopLeftRadius={32} borderTopRightRadius={32} mt={-32}>
          <YStack f={1} ai="center" jc="flex-start" gap="$4" p="$4">
            <Text fontSize="$5" fontWeight="600" alignSelf="flex-start">
              Today's Fun Tasks
            </Text>
            {activeChores.map((chore) => (
              <ChoreCard key={chore.id} chore={chore} cardTheme={themes[chore.id % themes.length]} onComplete={handleComplete} />
            ))}

            {completedChores.length > 0 && (
              <>
                <Text fontSize="$5" fontWeight="600" alignSelf="flex-start" mt="$4">
                  Completed Tasks 🌟
                </Text>
                {completedChores.map((chore) => (
                  <ChoreCard key={chore.id} chore={chore} cardTheme={themes[chore.id % themes.length]} onComplete={handleComplete} />
                ))}
              </>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
}
