import { Text, YStack, XStack, Card, Theme, Circle, useTheme, Progress, ScrollView } from 'tamagui';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { QUIZ_LEVELS } from '../data/constants';
import { CoinAmount } from '../utils/components';
import ScreenWrapper from '../components/ScreenWrapper';
import { useQuizQuestions, useAllAttempts, useTotalQuizRewards } from '../hooks/useQuiz';

const SCREEN_WIDTH = Dimensions.get('window').width;

const QuizCard = ({ quiz, attempts = [], onPress }) => {
  const theme = useTheme();
  const levelInfo = QUIZ_LEVELS[quiz.level];

  // Calculate quiz statistics
  const quizAttempts = attempts.filter((a) => a.quizQuestionEntity?.id === quiz.id);
  const totalAttempts = quizAttempts.length;
  const hasCompleted = quizAttempts.some((a) => a.correct);

  return (
    <Theme name={levelInfo.color}>
      <Card
        bg="$color6"
        br="$6"
        p="$4"
        w={SCREEN_WIDTH * 0.8}
        bc="$color4"
        borderBottomWidth={4}
        pressStyle={hasCompleted ? undefined : { scale: 0.95 }}
        animation="bouncy"
        onPress={hasCompleted ? undefined : onPress}
        mr="$3"
        o={hasCompleted ? 0.7 : 1}
      >
        <YStack gap="$3">
          {/* Header */}
          <XStack jc="space-between" ai="center">
            <XStack ai="center" gap="$2">
              <Circle bg="$color3" size="$4">
                <Icon name={levelInfo.icon} size={16} color={theme.color.val} />
              </Circle>
              <Text fontSize="$3" color="$color11" fontFamily="$heading">
                {quiz.level}
              </Text>
            </XStack>
            {hasCompleted ? (
              <XStack ai="center" gap="$1">
                <Icon name="check-circle" size={14} color={theme.color11.val} />
                <Text fontSize="$3" color="$color11" fontFamily="$heading">
                  Completed
                </Text>
              </XStack>
            ) : (
              <CoinAmount amount={quiz.rewardAmount} />
            )}
          </XStack>

          {/* Question */}
          <Text fontSize="$5" fontWeight="600" fontFamily="$heading" numberOfLines={2} mb="$2">
            {quiz.questionText}
          </Text>

          {/* Stats */}
          <XStack jc="flex-end" ai="center" mt="auto">
            <Text fontSize="$2" color="$color11" fontFamily="$body">
              {totalAttempts} {totalAttempts === 1 ? 'attempt' : 'attempts'}
            </Text>
          </XStack>
        </YStack>
      </Card>
    </Theme>
  );
};

const StatsCard = ({ icon, title, value, theme: cardTheme }) => {
  const theme = useTheme();
  return (
    <Theme name={cardTheme}>
      <Card f={1} bg="$color6" br="$6" p="$3" bc="$color4" borderBottomWidth={4}>
        <YStack gap="$2">
          <Circle size="$3" bg="$color3">
            <Icon name={icon} size={14} color={theme.color.val} />
          </Circle>
          <Text fontSize="$2" color="$color11">
            {title}
          </Text>
          <Text fontSize="$6" fontWeight="600" fontFamily="$heading">
            {value}
          </Text>
        </YStack>
      </Card>
    </Theme>
  );
};

const QuizzesScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuizQuestions();
  const { data: attempts, isLoading: isLoadingAttempts } = useAllAttempts();
  const { data: totalRewards, isLoading: isLoadingRewards } = useTotalQuizRewards();

  const isLoading = isLoadingQuizzes || isLoadingAttempts || isLoadingRewards;

  if (isLoading) {
    return (
      <YStack f={1} ai="center" jc="center" backgroundColor="$color2">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  // Calculate overall statistics
  const totalQuizzes = quizzes?.length || 0;
  const totalAttempts = attempts?.length || 0;
  const completedQuizzes = new Set(attempts?.filter((a) => a.correct).map((a) => a.quizQuestionEntity?.id)).size;
  const totalRewardsEarned = attempts?.reduce((sum, attempt) => sum + (attempt.rewardEarned || 0), 0).toFixed(2) || 0;
  const overallSuccessRate = totalAttempts > 0 ? (attempts?.filter((a) => a.correct).length / totalAttempts) * 100 : 0;

  const quizzesByLevel = Object.keys(QUIZ_LEVELS).reduce((acc, level) => {
    // Sort quizzes: incomplete first, then completed
    const levelQuizzes = quizzes?.filter((q) => q.level === level) || [];
    const sortedQuizzes = levelQuizzes.sort((a, b) => {
      const aCompleted = attempts?.some((attempt) => attempt.quizQuestionEntity?.id === a.id && attempt.correct) || false;
      const bCompleted = attempts?.some((attempt) => attempt.quizQuestionEntity?.id === b.id && attempt.correct) || false;
      return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
    });
    acc[level] = sortedQuizzes;
    return acc;
  }, {});

  const handleQuizPress = (quiz) => {
    navigation.navigate('QuizQuestion', {
      quiz,
      attempts: attempts?.filter((a) => a.questionId === quiz.id) || [],
    });
  };

  return (
    <ScreenWrapper containerProps={{ gap: '$6' }}>
      {/* Overall Stats */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
          Your Progress
        </Text>
        <XStack gap="$3">
          <StatsCard icon="brain" title="Completed" value={`${completedQuizzes}/${totalQuizzes}`} theme="blue" />
          <StatsCard icon="trophy" title="Success Rate" value={`${Math.round(overallSuccessRate)}%`} theme="green" />
        </XStack>
        <XStack gap="$3">
          <StatsCard icon="star" title="Total Attempts" value={totalAttempts} theme="orange" />
          <StatsCard icon="coins" title="Total Rewards" value={<CoinAmount amount={totalRewardsEarned} />} theme="purple" />
        </XStack>
      </YStack>

      {/* Quizzes by Level */}
      {Object.entries(quizzesByLevel).map(
        ([level, levelQuizzes]) =>
          levelQuizzes.length > 0 && (
            <YStack key={level} gap="$3">
              <Theme name={QUIZ_LEVELS[level].color}>
                <XStack ai="center" gap="$2">
                  <Circle size="$4" bg="$color4">
                    <Icon name={QUIZ_LEVELS[level].icon} size={16} color={theme.color.val} />
                  </Circle>
                  <YStack gap="$1" f={1}>
                    <XStack ai="center" gap="$2">
                      <Text fontSize="$5" fontWeight="600" fontFamily="$heading">
                        {level}
                      </Text>
                      <Text fontSize="$3" color="$color11" fontFamily="$heading">
                        {levelQuizzes.filter((quiz) => attempts?.some((a) => a.quizQuestionEntity?.id === quiz.id && a.correct)).length}/
                        {levelQuizzes.length}
                      </Text>
                    </XStack>
                    <Text fontSize="$3" color="$color11">
                      {QUIZ_LEVELS[level].description}
                    </Text>
                  </YStack>
                </XStack>
              </Theme>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {levelQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} attempts={attempts} onPress={() => handleQuizPress(quiz)} />
                ))}
              </ScrollView>
            </YStack>
          )
      )}

      {(!quizzes || quizzes.length === 0) && (
        <YStack ai="center" jc="center" h={200} gap="$4">
          <Circle size="$8" bg="$color4">
            <Icon name="brain" size={32} color={theme.color.val} />
          </Circle>
          <YStack ai="center" gap="$2">
            <Text fontSize="$5" fontWeight="600" fontFamily="$heading" ta="center">
              No Quizzes Available
            </Text>
            <Text fontSize="$3" color="$color11" ta="center">
              Check back later for new quizzes!
            </Text>
          </YStack>
        </YStack>
      )}
    </ScreenWrapper>
  );
};

export default QuizzesScreen;
