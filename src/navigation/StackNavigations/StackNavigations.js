import { createStackNavigator } from '@react-navigation/stack';
import { getToken, Theme, useTheme } from 'tamagui';
import { Button } from 'tamagui';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../../screens/HomeScreen';
import ChoresScreen from '../../screens/ChoresScreen';
import QuizzesScreen from '../../screens/QuizzesScreen';
import StoreScreen from '../../screens/StoreScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = (theme) => ({
  headerStyle: {
    backgroundColor: theme.background.val,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    color: theme.color.val,
  },
  headerTitleAlign: 'center',
});

const styledScreenOptions = (theme) => ({
  title: 'Chores',
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
  headerLeft: () => (
    <Pressable onPress={() => console.log('Add task')} style={{ marginLeft: 16 }}>
      <FontAwesome name="plus" size={24} color={theme.color.val} />
    </Pressable>
  ),
});

export function HomeNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions(theme)}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

const ChoresNav = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={styledScreenOptions(theme)}>
      <Stack.Screen
        name="ChoresScreen"
        component={ChoresScreen}
        options={{
          title: 'Chores',
        }}
      />
    </Stack.Navigator>
  );
};
export function ChoresNavigation() {
  return (
    <Theme name="green">
      <ChoresNav />
    </Theme>
  );
}

export function QuizzesNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions(theme)}>
      <Stack.Screen name="QuizzesScreen" component={QuizzesScreen} options={{ title: 'Quizzes' }} />
    </Stack.Navigator>
  );
}

export function StoreNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions(theme)}>
      <Stack.Screen name="StoreScreen" component={StoreScreen} options={{ title: 'Store' }} />
    </Stack.Navigator>
  );
}

export function ProfileNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions(theme)}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}
