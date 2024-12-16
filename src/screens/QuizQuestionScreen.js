import { YStack, XStack, Button, Circle, useTheme, Image, Text, Theme } from 'tamagui';
import { useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import { QUIZ_LEVELS } from '../data/constants';
import { CoinAmount } from '../utils/components';

export default function QuizQuestionScreen({ route }) {
  const { quiz } = route.params;
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const levelInfo = QUIZ_LEVELS[quiz.level];

  const selectedOptionRef = useRef(null);
  const showResultRef = useRef(false);
  const buttonsRef = useRef({
    a: new Animated.Value(0),
    b: new Animated.Value(0),
    c: new Animated.Value(0),
    d: new Animated.Value(0),
  });

  const handleOptionSelect = (option) => {
    if (showResultRef.current) return;

    selectedOptionRef.current = option;
    showResultRef.current = true;

    // Animate all buttons
    Object.keys(buttonsRef.current).forEach((key) => {
      Animated.timing(buttonsRef.current[key], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const getButtonStyle = (option) => {
    return {
      backgroundColor: buttonsRef.current[option].interpolate({
        inputRange: [0, 1],
        outputRange: [
          theme.color4.val,
          option === selectedOptionRef.current
            ? option === quiz.correctOption
              ? theme.green8.val
              : theme.red8.val
            : option === quiz.correctOption
            ? theme.green8.val
            : theme.color4.val,
        ],
      }),
    };
  };

  return (
    <Theme name={levelInfo.color}>
      <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
        <XStack w="100%" jc="flex-end" ai="center" py="$2">
          <Button size="$4" circular bg="$color4" pressStyle={{ scale: 0.9 }} onPress={() => navigation.goBack()} animation="bouncy">
            <Icon name="xmark" size={16} color={theme.color.val} />
          </Button>
        </XStack>

        <YStack f={1} gap="$4">
          <XStack w="100%" jc="center" ai="center" mb="$4">
            <Circle size="$12" bg="$color4">
              <Icon name={levelInfo.icon} size={42} color={theme.color.val} />
            </Circle>
          </XStack>

          <YStack gap="$2" mb="$6">
            <Text fontSize="$7" fontWeight="600" fontFamily="$heading" ta="center">
              {quiz.questionText}
            </Text>
            <XStack ai="center" jc="center" gap="$2">
              <Text fontSize="$4" color="$color11">
                {quiz.level}
              </Text>
              <Text fontSize="$4" color="$color11">
                •
              </Text>
              <CoinAmount amount={quiz.rewardAmount} color="$color11" size="$4" />
            </XStack>
          </YStack>

          <YStack gap="$4" f={1}>
            {['a', 'b', 'c', 'd'].map((option) => (
              <Animated.View key={option}>
                <Button
                  size="$6"
                  pressStyle={!showResultRef.current ? { scale: 0.98 } : {}}
                  onPress={() => handleOptionSelect(option)}
                  disabled={showResultRef.current}
                  animation="bouncy"
                >
                  <Text fontFamily="$heading" fontSize="$4" color={showResultRef.current ? '$color1' : '$color12'}>
                    {quiz[`option_${option}`]}
                  </Text>
                </Button>
              </Animated.View>
            ))}

            {showResultRef.current && (
              <YStack gap="$4" ai="center" mt="$6">
                <Text
                  fontSize="$8"
                  fontWeight="600"
                  fontFamily="$heading"
                  color={selectedOptionRef.current === quiz.correctOption ? '$green10' : '$red10'}
                >
                  {selectedOptionRef.current === quiz.correctOption ? '🎉 Correct!' : '😅 Try Again!'}
                </Text>
                <Button
                  onPress={() => navigation.goBack()}
                  size="$6"
                  bg={selectedOptionRef.current === quiz.correctOption ? '$green8' : '$color8'}
                  w="100%"
                  animation="bouncy"
                >
                  <Text color="$color1" fontSize="$4" fontFamily="$heading">
                    {selectedOptionRef.current === quiz.correctOption ? "Let's do another one!" : 'Try another question!'}
                  </Text>
                </Button>
              </YStack>
            )}
          </YStack>
        </YStack>
      </YStack>
    </Theme>
  );
}
