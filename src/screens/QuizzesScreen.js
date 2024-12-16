import { Text, YStack, XStack, Card, Theme, Circle, useTheme, ScrollView } from 'tamagui';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { quizzes } from '../data/quizzes';
import { QUIZ_LEVELS } from '../data/constants';
import { CoinAmount } from '../utils/components';
import ScreenWrapper from '../components/ScreenWrapper';

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

const QuizzesScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const quizzesByLevel = Object.keys(QUIZ_LEVELS).reduce((acc, level) => {
    acc[level] = quizzes.filter((q) => q.level === level);
    return acc;
  }, {});

  const handleQuizPress = (quiz) => {
    navigation.navigate('QuizQuestion', { quiz });
  };

  return (
    <ScreenWrapper containerProps={{ gap: '$6' }}>
      {Object.entries(quizzesByLevel).map(
        ([level, levelQuizzes]) =>
          levelQuizzes.length > 0 && (
            <YStack key={level} gap="$3">
              <Theme name={QUIZ_LEVELS[level].color}>
                <XStack ai="center" gap="$2">
                  <Circle size="$4" bg="$color4">
                    <Icon name={QUIZ_LEVELS[level].icon} size={16} color={theme.color.val} />
                  </Circle>
                  <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
                    {level}
                  </Text>
                </XStack>
              </Theme>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {levelQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onPress={() => handleQuizPress(quiz)} />
                ))}
              </ScrollView>
            </YStack>
          )
      )}
    </ScreenWrapper>
  );
};

export default QuizzesScreen;
