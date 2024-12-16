import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Theme, useTheme, XStack, Text, Image, Avatar } from 'tamagui';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ROUTE_THEMES } from '../../config/theme';

import HomeScreen from '../../screens/HomeScreen';
import ChoresScreen from '../../screens/ChoresScreen';
import QuizzesScreen from '../../screens/QuizzesScreen';
import StoreScreen from '../../screens/StoreScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const CoinBalance = ({ balance = 80, theme }) => (
  <XStack ai="center" gap="5" backgroundColor="$color6" py="7" px="$3" borderRadius="$5">
    <Text fontWeight="600" fontSize="$5" fontFamily="$heading" color="$color">
      {balance}
    </Text>
    <Image source={require('../../../assets/images/piggy.png')} width={24} height={24} resizeMode="contain" />
  </XStack>
);

const createScreenOptions = (theme, title) => ({
  title,
  headerStyle: {
    backgroundColor: theme.color5.val,
  },
  headerTitleStyle: {
    color: theme.color.val,
    fontSize: 20,
    fontFamily: 'Fredoka_600SemiBold',
  },
  headerLargeTitle: true,
  headerLargeStyle: {
    backgroundColor: theme.color5.val,
  },
  headerLargeTitleStyle: {
    color: theme.color.val,
    fontSize: 38,
    fontFamily: 'Fredoka_600SemiBold',
  },
  headerTransparent: false,
  headerLargeTitleShadowVisible: false,
  headerRight: () => <CoinBalance theme={theme} />,
  headerLeft: () => (
    <Avatar circular size="$4" mr="$3" borderWidth={'$1'} borderColor={theme.color6.val}>
      <Avatar.Image source={{ uri: 'https://placecats.com/200/200' }} objectFit="cover" />
      <Avatar.Fallback backgroundColor="$color6" />
    </Avatar>
  ),
});

const createStackNav = (screens, theme) => {
  const NavigatorComponent = () => {
    const themeHook = useTheme();
    return (
      <Stack.Navigator screenOptions={createScreenOptions(themeHook, screens[0].title)}>
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
    // Add more screens for Quizzes stack here
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
