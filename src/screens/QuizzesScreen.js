import { ScrollView, Text, YStack, XStack, Card, Theme, Circle, useTheme, Image } from 'tamagui';
import { useState, useRef, useLayoutEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';

const HEADER_HEIGHT = 60;
const LARGE_TITLE_HEIGHT = 60;
const SCROLL_THRESHOLD = LARGE_TITLE_HEIGHT;
const SCREEN_WIDTH = Dimensions.get('window').width;

const LEVELS = {
  Beginner: { icon: 'seedling', color: 'green', description: "Let's start learning!" },
  Intermediate: { icon: 'tree', color: 'blue', description: 'Growing your knowledge!' },
  Advanced: { icon: 'crown', color: 'orange', description: 'You are getting better!' },
  Expert: { icon: 'star', color: 'purple', description: 'Almost a master!' },
  Master: { icon: 'trophy', color: 'pink', description: 'The ultimate challenge!' },
};

const CoinAmount = ({ amount, color = '$color', size = '$4' }) => (
  <XStack ai="center" gap="3">
    <Text fontWeight="600" fontSize={size} fontFamily="$heading" color={color}>
      {amount}
    </Text>
    <Image source={require('../../assets/images/coin.png')} width={24} height={24} resizeMode="contain" tintColor={color} />
  </XStack>
);

const QuizCard = ({ quiz, onPress }) => {
  const theme = useTheme();
  const levelInfo = LEVELS[quiz.level];

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
  const [quizzes] = useState([
    {
      id: 1,
      questionText: 'What is money used for?',
      option_a: 'To buy toys',
      option_b: 'To play games',
      option_c: 'To travel',
      option_d: 'All of the above',
      correctOption: 'd',
      level: 'Beginner',
      rewardAmount: 0.3,
    },
    {
      id: 2,
      questionText: 'What should you do with your money?',
      option_a: 'Spend it all',
      option_b: 'Save some of it',
      option_c: 'Give it away',
      option_d: 'Lose it',
      correctOption: 'b',
      level: 'Beginner',
      rewardAmount: 0.3,
    },
    {
      id: 3,
      questionText: 'What is a budget?',
      option_a: 'A type of candy',
      option_b: 'A plan for spending money',
      option_c: 'A toy',
      option_d: 'A game',
      correctOption: 'b',
      level: 'Intermediate',
      rewardAmount: 0.5,
    },
    {
      id: 4,
      questionText: 'Why do we need to save money?',
      option_a: 'For emergencies',
      option_b: 'For future purchases',
      option_c: 'For important goals',
      option_d: 'All of the above',
      correctOption: 'd',
      level: 'Advanced',
      rewardAmount: 0.8,
    },
    {
      id: 5,
      questionText: 'What is interest?',
      option_a: 'Extra money you earn on savings',
      option_b: 'A type of food',
      option_c: 'A game rule',
      option_d: 'A toy brand',
      correctOption: 'a',
      level: 'Expert',
      rewardAmount: 1,
    },
    {
      id: 6,
      questionText: 'What is investing?',
      option_a: 'Spending all your money',
      option_b: 'Putting money away to grow',
      option_c: 'Losing money',
      option_d: 'Giving money away',
      correctOption: 'b',
      level: 'Master',
      rewardAmount: 1.5,
    },
    {
      id: 7,
      questionText: 'What is a piggy bank used for?',
      option_a: 'Playing with toys',
      option_b: 'Storing food',
      option_c: 'Saving money',
      option_d: 'Drawing pictures',
      correctOption: 'c',
      level: 'Beginner',
      rewardAmount: 0.3,
    },
    {
      id: 8,
      questionText: 'What is the difference between needs and wants?',
      option_a: 'They are the same thing',
      option_b: 'Needs are essential, wants are extra',
      option_c: 'Wants are more important',
      option_d: 'Neither matters',
      correctOption: 'b',
      level: 'Intermediate',
      rewardAmount: 0.5,
    },
    {
      id: 9,
      questionText: 'What is a bank account?',
      option_a: 'A safe place to keep money',
      option_b: 'A type of toy',
      option_c: 'A video game',
      option_d: 'A book',
      correctOption: 'a',
      level: 'Intermediate',
      rewardAmount: 0.5,
    },
    {
      id: 10,
      questionText: 'What happens when you spend more than you have?',
      option_a: 'You get free money',
      option_b: 'You go into debt',
      option_c: 'Nothing happens',
      option_d: 'You win a prize',
      correctOption: 'b',
      level: 'Advanced',
      rewardAmount: 0.8,
    },
    {
      id: 11,
      questionText: 'What is compound interest?',
      option_a: 'Interest on your interest',
      option_b: 'A type of candy',
      option_c: 'A new game',
      option_d: 'A savings account',
      correctOption: 'a',
      level: 'Expert',
      rewardAmount: 1,
    },
    {
      id: 12,
      questionText: 'What is diversification?',
      option_a: 'Spending all money in one place',
      option_b: 'Spreading investments around',
      option_c: 'Losing money quickly',
      option_d: 'Taking big risks',
      correctOption: 'b',
      level: 'Master',
      rewardAmount: 1.5,
    },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      scrollY,
    });
  }, [navigation, scrollY]);

  const quizzesByLevel = Object.keys(LEVELS).reduce((acc, level) => {
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
                  <Theme name={LEVELS[level].color}>
                    <XStack ai="center" gap="$2" px="$4">
                      <Circle size="$4" bg="$color4">
                        <Icon name={LEVELS[level].icon} size={16} color={theme.color.val} />
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
