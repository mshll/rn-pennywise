import { Text, YStack, XStack, Button, Theme, Circle, useTheme, Image } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Welcome = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Theme name="pink">
      <YStack f={1} backgroundColor="$color2" pt={insets.top} px="$4">
        <YStack f={1} ai="center" jc="center" gap="$8">
          {/* Logo */}
          <YStack ai="center" gap="$4">
            <Image source={require('../../assets/pennywise-logo.png')} width={120} height={120} resizeMode="contain" tintColor={theme.color.val} />
            <YStack ai="center" gap="$2">
              <Text fontSize="$8" fontWeight="600" fontFamily="$heading" ta="center">
                Welcome to PennyWise
              </Text>
              <Text fontSize="$4" color="$color11" ta="center">
                Teaching kids about money through fun and rewards!
              </Text>
            </YStack>
          </YStack>

          {/* Features */}
          <YStack gap="$4" w="100%">
            <XStack ai="center" gap="$3">
              <Circle size="$4" bg="$color4">
                <Icon name="piggy-bank" size={20} color={theme.color.val} />
              </Circle>
              <Text fontSize="$4" fontWeight="500" fontFamily="$heading">
                Earn rewards for completing tasks
              </Text>
            </XStack>
            <XStack ai="center" gap="$3">
              <Circle size="$4" bg="$color4">
                <Icon name="brain" size={20} color={theme.color.val} />
              </Circle>
              <Text fontSize="$4" fontWeight="500" fontFamily="$heading">
                Learn about money through quizzes
              </Text>
            </XStack>
            <XStack ai="center" gap="$3">
              <Circle size="$4" bg="$color4">
                <Icon name="store" size={20} color={theme.color.val} />
              </Circle>
              <Text fontSize="$4" fontWeight="500" fontFamily="$heading">
                Spend wisely in the reward store
              </Text>
            </XStack>
          </YStack>

          {/* Buttons */}
          <YStack gap="$4" w="100%" mt="$8">
            <Theme name="blue">
              <Button size="$6" bg="$color4" pressStyle={{ scale: 0.95 }} animation="bouncy" onPress={() => navigation.navigate('Login')}>
                <Text fontSize="$5" fontFamily="$body">
                  Sign In
                </Text>
              </Button>
            </Theme>

            <Theme name="green">
              <Button size="$6" bg="$color4" pressStyle={{ scale: 0.95 }} animation="bouncy" onPress={() => navigation.navigate('Signup')}>
                <Text fontSize="$5" fontFamily="$body">
                  Create Parent Account
                </Text>
              </Button>
            </Theme>
          </YStack>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default Welcome;
