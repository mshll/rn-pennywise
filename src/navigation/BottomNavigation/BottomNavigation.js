import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigation, ChoresNavigation, QuizzesNavigation, StoreNavigation, ProfileNavigation } from '../StackNavigations/StackNavigations';
import { useTheme } from 'tamagui';
import { BookText, CircleUserRound, Home, List, Store } from '@tamagui/lucide-icons';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopWidth: 0.5,
          borderTopColor: theme.borderColor.val,
          paddingTop: 5,
        },
        tabBarActiveTintColor: theme.color.val,
        tabBarInactiveTintColor: theme.placeholderColor.val,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Quizzes"
        component={QuizzesNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <BookText size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Chores"
        component={ChoresNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <List size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <Store size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <CircleUserRound size={size - 3} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
