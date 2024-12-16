import { ScrollView, Text, useTheme, View, YStack } from 'tamagui';
import ChoreCard from '../components/ChoreCard';
import { useState, useRef, useLayoutEffect } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chores as initialChores } from '../data/chores';
import { THEMES } from '../data/constants';

const HEADER_HEIGHT = 60;
const LARGE_TITLE_HEIGHT = 60;
const SCROLL_THRESHOLD = LARGE_TITLE_HEIGHT;

export default function ChoresScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const [chores, setChores] = useState(initialChores);

  useLayoutEffect(() => {
    navigation.setOptions({
      scrollY,
    });
  }, [navigation, scrollY]);

  const handleComplete = (choreId) => {
    setChores(chores.map((chore) => (chore.id === choreId ? { ...chore, status: 'COMPLETED' } : chore)));
  };

  const activeChores = chores.filter((chore) => chore.status === 'INCOMPLETE');
  const completedChores = chores.filter((chore) => chore.status === 'COMPLETED');

  return (
    <Animated.ScrollView
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: theme.color2.val }}
    >
      <YStack f={1} backgroundColor="$color2">
        <YStack f={1} ai="center" jc="flex-start" gap="$4" px="$4" pb="$6">
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
        </YStack>
      </YStack>
    </Animated.ScrollView>
  );
}
