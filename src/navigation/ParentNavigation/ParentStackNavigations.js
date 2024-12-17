import { createStackNavigator } from '@react-navigation/stack';
import { Theme, useTheme } from 'tamagui';
import { ROUTE_THEMES } from '../../data/constants';

import ParentHomeScreen from '../../screens/parent/ParentHomeScreen';
import ChildrenScreen from '../../screens/parent/ChildrenScreen';
import AddChildScreen from '../../screens/parent/AddChildScreen';
import ChildDetailsScreen from '../../screens/parent/ChildDetailsScreen';
import AddChoreScreen from '../../screens/parent/AddChoreScreen';
import AddStoreItemScreen from '../../screens/parent/AddStoreItemScreen';
import ParentStoreScreen from '../../screens/parent/ParentStoreScreen';
import ParentProfileScreen from '../../screens/parent/ParentProfileScreen';
import ParentTasksScreen from '../../screens/parent/ParentTasksScreen';

const Stack = createStackNavigator();

const createScreenOptions = (theme) => ({
  headerStyle: {
    backgroundColor: theme.color2.val,
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.borderColor.val,
  },
  headerTitleStyle: {
    color: theme.color.val,
    fontSize: 20,
    fontFamily: 'Fredoka_600SemiBold',
  },
  headerTintColor: theme.color.val,
  headerBackTitleVisible: false,
  cardStyle: { backgroundColor: theme.background.val },
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
      name: 'ParentHomeScreen',
      component: ParentHomeScreen,
      title: 'Home',
    },
    {
      name: 'ChildDetailsScreen',
      component: ChildDetailsScreen,
      title: 'Child Details',
    },
    {
      name: 'AddChildScreen',
      component: AddChildScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    {
      name: 'AddChoreScreen',
      component: AddChoreScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    {
      name: 'AddStoreItemScreen',
      component: AddStoreItemScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
  ],
  ROUTE_THEMES.ParentHome
);

// Children Stack
export const ChildrenNavigation = createStackNav(
  [
    {
      name: 'ChildrenScreen',
      component: ChildrenScreen,
      title: 'Children',
    },
    {
      name: 'AddChildScreen',
      component: AddChildScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    {
      name: 'ChildDetailsScreen',
      component: ChildDetailsScreen,
      title: 'Child Details',
    },
    {
      name: 'AddChoreScreen',
      component: AddChoreScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    {
      name: 'AddStoreItemScreen',
      component: AddStoreItemScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
  ],
  ROUTE_THEMES.ParentChildren
);

// Store Stack
export const StoreNavigation = createStackNav(
  [
    {
      name: 'ParentStoreScreen',
      component: ParentStoreScreen,
      title: 'Store',
    },
    {
      name: 'AddStoreItemScreen',
      component: AddStoreItemScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    {
      name: 'ChildDetailsScreen',
      component: ChildDetailsScreen,
      title: 'Child Details',
    },
  ],
  ROUTE_THEMES.ParentStore
);

// Profile Stack
export const ProfileNavigation = createStackNav(
  [
    {
      name: 'ParentProfileScreen',
      component: ParentProfileScreen,
      title: 'Profile',
    },
    {
      name: 'AddChildScreen',
      component: AddChildScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    {
      name: 'ChildDetailsScreen',
      component: ChildDetailsScreen,
      title: 'Child Details',
    },
  ],
  ROUTE_THEMES.ParentProfile
);

// Tasks Stack
export const TasksNavigation = createStackNav(
  [
    {
      name: 'ParentTasksScreen',
      component: ParentTasksScreen,
      title: 'Tasks',
    },
    {
      name: 'AddChoreScreen',
      component: AddChoreScreen,
      options: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    {
      name: 'ChildDetailsScreen',
      component: ChildDetailsScreen,
      title: 'Child Details',
    },
  ],
  ROUTE_THEMES.ParentChores
);
