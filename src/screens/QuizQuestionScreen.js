import { YStack, XStack, Button, Circle, useTheme, Text, Theme } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_LEVELS } from '../data/constants';
import { CoinAmount } from '../utils/components';
import { useSubmitQuizAttempt } from '../hooks/useQuiz';
import { useEffect } from 'react';

const QuizAttemptScreen = ({ route }) => {
  const { quiz, attempts = [] } = route.params;
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const levelInfo = QUIZ_LEVELS[quiz.level];
  const { mutate: submitAttempt, isLoading } = useSubmitQuizAttempt();

  // Check if quiz is already completed
  const hasCompleted = attempts.some((a) => a.quizQuestionEntity?.id === quiz.id && a.correct);

  // If completed, navigate back
  useEffect(() => {
    if (hasCompleted) {
      navigation.goBack();
    }
  }, [hasCompleted, navigation]);

  const handleOptionSelect = (option) => {
    if (isLoading || hasCompleted) return;

    submitAttempt(
      { questionId: quiz.id, selectedOption: option.toLowerCase() },
      {
        onSuccess: (data) => {
          navigation.replace('QuizResult', {
            quiz,
            result: data,
            selectedOption: option,
          });
        },
      }
    );
  };

  if (hasCompleted) return null;

  return (
    <Theme name={levelInfo.color}>
      <YStack f={1} backgroundColor="$color2" pt={insets.top}>
        {/* Header */}
        <XStack w="100%" jc="space-between" ai="center" px="$4" py="$2">
          <Button size="$4" circular bg="$color4" pressStyle={{ scale: 0.9 }} onPress={() => navigation.goBack()} animation="bouncy">
            <Icon name="chevron-left" size={16} color={theme.color.val} />
          </Button>
          <CoinAmount amount={quiz.rewardAmount} />
        </XStack>

        {/* Question */}
        <YStack px="$4" py="$6" gap="$6" f={1}>
          <Text fontSize="$7" fontWeight="600" fontFamily="$heading">
            {quiz.questionText}
          </Text>

          {/* Options */}
          <YStack gap="$4">
            {['A', 'B', 'C', 'D'].map((option) => (
              <Button
                key={option}
                size="$6"
                bg="$color4"
                pressStyle={{ scale: 0.98 }}
                onPress={() => handleOptionSelect(option)}
                disabled={isLoading}
                animation="bouncy"
              >
                <XStack gap="$3" ai="center">
                  <Circle size="$4" bg="$color3">
                    <Text fontSize="$4" fontFamily="$heading" color="$color11">
                      {option}
                    </Text>
                  </Circle>
                  <Text fontSize="$4" fontFamily="$heading" color="$color12" f={1} ta="left">
                    {quiz[`option_${option.toLowerCase()}`]}
                  </Text>
                </XStack>
              </Button>
            ))}
          </YStack>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default QuizAttemptScreen;
