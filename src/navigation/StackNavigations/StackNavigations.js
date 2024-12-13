import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'tamagui';

import HomeScreen from '../../screens/HomeScreen';
import ChoresScreen from '../../screens/ChoresScreen';
import QuizzesScreen from '../../screens/QuizzesScreen';
import StoreScreen from '../../screens/StoreScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createStackNavigator();

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

export function HomeNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions(theme)}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

export function ChoresNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions(theme)}>
      <Stack.Screen name="ChoresScreen" component={ChoresScreen} options={{ title: 'Chores' }} />
    </Stack.Navigator>
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
