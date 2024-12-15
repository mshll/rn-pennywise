import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme, useTheme } from 'tamagui';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ROUTE_THEMES } from '../../config/theme';

import HomeScreen from '../../screens/HomeScreen';
import ChoresScreen from '../../screens/ChoresScreen';
import QuizzesScreen from '../../screens/QuizzesScreen';
import StoreScreen from '../../screens/StoreScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

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
  // headerLeft: () => (
  //   <Pressable onPress={() => console.log('Add task')} style={{ marginLeft: 16 }}>
  //     <FontAwesome name="plus" size={24} color={theme.color.val} />
  //   </Pressable>
  // ),
});

const createStackNavigator = (screens, theme) => {
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
export const HomeNavigation = createStackNavigator(
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
export const ChoresNavigation = createStackNavigator(
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
export const QuizzesNavigation = createStackNavigator(
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
export const StoreNavigation = createStackNavigator(
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
export const ProfileNavigation = createStackNavigator(
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
