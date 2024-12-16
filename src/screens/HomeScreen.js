import { ScrollView, Text, YStack, useTheme } from 'tamagui';
import { Animated } from 'react-native';
import { useRef, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 60;
const LARGE_TITLE_HEIGHT = 60;
const SCROLL_THRESHOLD = LARGE_TITLE_HEIGHT;

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  const paddingTop = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [HEADER_HEIGHT + LARGE_TITLE_HEIGHT + insets.top, HEADER_HEIGHT + insets.top],
    extrapolate: 'clamp',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      scrollY,
    });
  }, [navigation, scrollY]);

  return (
    <Animated.ScrollView
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: theme.color2.val }}
    >
      <YStack f={1} backgroundColor="$color2">
        <YStack f={1} ai="center" jc="flex-start" gap="$4" px="$4" pb="$6">
          <Text>Home</Text>
        </YStack>
      </YStack>
    </Animated.ScrollView>
  );
};

export default HomeScreen;
