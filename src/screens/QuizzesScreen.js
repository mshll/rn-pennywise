import { ScrollView, Text, YStack, XStack, Card, Theme, Circle, useTheme } from 'tamagui';
import { useState, useRef, useLayoutEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { quizzes } from '../data/quizzes';
import { QUIZ_LEVELS } from '../data/constants';
import { CoinAmount } from '../utils/components';

const HEADER_HEIGHT = 60;
const LARGE_TITLE_HEIGHT = 60;
const SCROLL_THRESHOLD = LARGE_TITLE_HEIGHT;
const SCREEN_WIDTH = Dimensions.get('window').width;

const QuizCard = ({ quiz, onPress }) => {
  const theme = useTheme();
  const levelInfo = QUIZ_LEVELS[quiz.level];

  return (
    <Theme name={levelInfo.color}>
      <Card
        bg="$color6"
        br="$6"
        p="$3"
        w={SCREEN_WIDTH * 0.8}
        bc="$color4"
        borderBottomWidth={4}
        pressStyle={{ scale: 0.95 }}
        animation="bouncy"
        onPress={onPress}
        mr="$3"
      >
        <YStack gap="$2">
          <XStack jc="space-between" ai="center">
            <Circle bg="$color3" size="$4">
              <Icon name={levelInfo.icon} size={16} color={theme.color.val} />
            </Circle>
            <CoinAmount amount={quiz.rewardAmount} />
          </XStack>
          <Text fontSize="$4" fontWeight="600" fontFamily="$heading" mt="$2">
            {quiz.questionText}
          </Text>
          <Text fontSize="$2" color="$color11" mt="$1">
            {levelInfo.description}
          </Text>
        </YStack>
      </Card>
    </Theme>
  );
};

export default function QuizzesScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      scrollY,
    });
  }, [navigation, scrollY]);

  const quizzesByLevel = Object.keys(QUIZ_LEVELS).reduce((acc, level) => {
    acc[level] = quizzes.filter((q) => q.level === level);
    return acc;
  }, {});

  const handleQuizPress = (quiz) => {
    navigation.navigate('QuizQuestion', { quiz });
  };

  return (
    <Animated.ScrollView
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: theme.color2.val }}
      showsVerticalScrollIndicator={false}
    >
      <YStack f={1} backgroundColor="$color2">
        <YStack f={1} jc="flex-start" gap="$6" pb="$6">
          {Object.entries(quizzesByLevel).map(
            ([level, levelQuizzes]) =>
              levelQuizzes.length > 0 && (
                <YStack key={level} gap="$3">
                  <Theme name={QUIZ_LEVELS[level].color}>
                    <XStack ai="center" gap="$2" px="$4">
                      <Circle size="$4" bg="$color4">
                        <Icon name={QUIZ_LEVELS[level].icon} size={16} color={theme.color.val} />
                      </Circle>
                      <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
                        {level}
                      </Text>
                    </XStack>
                  </Theme>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} px="$4">
                    {levelQuizzes.map((quiz) => (
                      <QuizCard key={quiz.id} quiz={quiz} onPress={() => handleQuizPress(quiz)} />
                    ))}
                  </ScrollView>
                </YStack>
              )
          )}
        </YStack>
      </YStack>
    </Animated.ScrollView>
  );
}
