import { YStack, useTheme } from 'tamagui';
import { useRef, useLayoutEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HEADER_HEIGHT = 60;
export const LARGE_TITLE_HEIGHT = 60;
export const SCROLL_THRESHOLD = LARGE_TITLE_HEIGHT;

const ScreenWrapper = ({ children, containerProps = {}, scrollViewProps = {} }) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

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
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      <YStack f={1} gap="$4" px="$4" pb="$6" minHeight={Dimensions.get('window').height} {...containerProps}>
        {children}
      </YStack>
    </Animated.ScrollView>
  );
};

export default ScreenWrapper;
