import { YStack, XStack, Button, Text, Theme } from 'tamagui';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CoinAmount } from '../utils/components';

const QuizResultScreen = ({ route }) => {
  const { quiz, result, selectedOption } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Theme name={result.correct ? 'green' : 'red'}>
      <YStack f={1} backgroundColor="$color2" pt={insets.top}>
        <YStack f={1} px="$4" py="$6" gap="$6" ai="center" jc="center">
          {/* Icon */}
          <Icon name={result.correct ? 'circle-check' : 'circle-xmark'} size={100} color="$color" />

          {/* Result Text */}
          <YStack ai="center" gap="$4">
            <Text fontSize="$9" fontWeight="800" fontFamily="$heading" color="$color">
              {result.correct ? 'Correct!' : 'Wrong Answer'}
            </Text>

            {result.correct && result.rewardAmount > 0 && (
              <XStack ai="center" gap="$2" py="$2" px="$4" br="$6" backgroundColor="$color4">
                <Text color="$color" fontSize="$6" fontFamily="$heading">
                  You earned
                </Text>
                <CoinAmount amount={result.rewardAmount} size="$6" />
              </XStack>
            )}
          </YStack>

          {/* Question & Answer */}
          <YStack gap="$4" ai="center" backgroundColor="$color4" p="$4" br="$6" w="100%">
            <Text fontSize="$5" fontFamily="$body" color="$color" ta="center">
              {quiz.questionText}
            </Text>

            <YStack ai="center" gap="$1">
              <Text fontSize="$4" fontFamily="$body" color="$color11">
                Your answer:
              </Text>
              <Text fontSize="$4" fontFamily="$heading" color="$color" ta="center" px="$2">
                {quiz[`option_${selectedOption.toLowerCase()}`]}
              </Text>
            </YStack>
          </YStack>

          {/* Continue Button */}
          <Button size="$6" backgroundColor="$color4" w="100%" onPress={() => navigation.popToTop()} animation="bouncy" mt="$4">
            <Text fontSize="$5" fontFamily="$heading" color="$color">
              Continue
            </Text>
          </Button>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default QuizResultScreen;
