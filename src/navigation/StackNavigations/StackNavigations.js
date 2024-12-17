import { createStackNavigator } from '@react-navigation/stack';
import { Theme, useTheme, XStack, Text, Image, Avatar, YStack } from 'tamagui';
import { Pressable, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTE_THEMES, INITIAL_BALANCE } from '../../data/constants';
import { CoinAmount } from '../../utils/components';

import HomeScreen from '../../screens/HomeScreen';
import ChoresScreen from '../../screens/ChoresScreen';
import QuizzesScreen from '../../screens/QuizzesScreen';
import QuizQuestionScreen from '../../screens/QuizQuestionScreen';
import StoreScreen from '../../screens/StoreScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createStackNavigator();

const HEADER_HEIGHT = 60;
const LARGE_TITLE_HEIGHT = 120;
const SCROLL_THRESHOLD = LARGE_TITLE_HEIGHT;

const CoinBalance = ({ balance = INITIAL_BALANCE, theme }) => (
  <XStack ai="center" gap="5" backgroundColor="$color6" py="7" px="$3" borderRadius="$5">
    <CoinAmount amount={balance} src={require('../../../assets/images/piggy.png')} />
  </XStack>
);

const CustomHeader = ({ navigation, route, options, back }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const title = options?.title ?? route?.name;
  const scrollY = options.scrollY || new Animated.Value(0);
  const isProfileScreen = route.name === 'ProfileScreen';

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const smallTitleOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const largeTitleHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [LARGE_TITLE_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const borderRadius = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [36, 0],
    extrapolate: 'clamp',
  });

  return (
    <YStack backgroundColor={theme.color5.val} pt={insets.top}>
      <YStack backgroundColor={theme.color5.val}>
        <XStack height={HEADER_HEIGHT} ai="center" jc="space-between" px="$3">
          <XStack ai="center" gap="$3" f={1}>
            {isProfileScreen ? (
              <Image source={require('../../../assets/pennywise-logo.png')} width={40} height={40} resizeMode="contain" tintColor={theme.color.val} />
            ) : (
              <Avatar circular size="$4" borderWidth={'$1'} borderColor={theme.color6.val}>
                <Avatar.Image source={{ uri: 'https://placecatss.com/200/200' }} />
                <Avatar.Fallback backgroundColor="$color6" />
              </Avatar>
            )}
            <Animated.Text
              style={{
                opacity: smallTitleOpacity,
                color: theme.color.val,
                fontSize: 20,
                fontFamily: 'Fredoka_600SemiBold',
              }}
            >
              {title}
            </Animated.Text>
          </XStack>
          <CoinBalance theme={theme} />
        </XStack>

        <Animated.View
          style={{
            height: largeTitleHeight,
            opacity: titleOpacity,
            justifyContent: 'flex-end',
            backgroundColor: theme.color5.val,
          }}
        >
          <Animated.View style={{ paddingHorizontal: 16, paddingBottom: 10, justifyContent: 'flex-end', flex: 1 }}>
            <Text color={theme.color.val} fontSize={42} fontFamily="Fredoka_600SemiBold">
              {title}
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              height: 30,
              backgroundColor: theme.color2.val,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              width: '100%',
            }}
          />
        </Animated.View>
      </YStack>
    </YStack>
  );
};

const createScreenOptions = (theme) => ({
  header: (props) => <CustomHeader {...props} />,
  headerMode: 'screen',
  cardStyle: { backgroundColor: theme.background.val },
  headerTransparent: false,
});

const createStackNav = (screens, theme) => {
  const NavigatorComponent = () => {
    const themeHook = useTheme();
    return (
      <Stack.Navigator
        screenOptions={{
          ...createScreenOptions(themeHook),
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {screens.map(({ name, component: Component, title, options = {} }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={Component}
            options={{
              title: title || name,
              ...options,
            }}
          />
        ))}
      </Stack.Navigator>
    );
  };

  return () => (
    <Theme name={theme}>
      <NavigatorComponent />
    </Theme>
  );
};

// Home Stack
export const HomeNavigation = createStackNav(
  [
    {
      name: 'HomeScreen',
      component: HomeScreen,
      title: 'Home',
    },
    // Add more screens for Home stack here
  ],
  ROUTE_THEMES.Home
);

// Chores Stack
export const ChoresNavigation = createStackNav(
  [
    {
      name: 'ChoresScreen',
      component: ChoresScreen,
      title: 'Tasks',
    },
    // Add more screens for Chores stack here
  ],
  ROUTE_THEMES.Chores
);

// Quizzes Stack
export const QuizzesNavigation = createStackNav(
  [
    {
      name: 'QuizzesScreen',
      component: QuizzesScreen,
      title: 'Quizzes',
    },
    {
      name: 'QuizQuestion',
      component: QuizQuestionScreen,
      options: {
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_bottom',
        animationEnabled: true,
      },
    },
  ],
  ROUTE_THEMES.Quizzes
);

// Store Stack
export const StoreNavigation = createStackNav(
  [
    {
      name: 'StoreScreen',
      component: StoreScreen,
      title: 'Store',
    },
    // Add more screens for Store stack here
  ],
  ROUTE_THEMES.Store
);

// Profile Stack
export const ProfileNavigation = createStackNav(
  [
    {
      name: 'ProfileScreen',
      component: ProfileScreen,
      title: 'Profile',
    },
    // Add more screens for Profile stack here
  ],
  ROUTE_THEMES.Profile
);
