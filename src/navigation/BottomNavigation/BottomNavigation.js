import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigation, ChoresNavigation, QuizzesNavigation, StoreNavigation, ProfileNavigation } from '../StackNavigations/StackNavigations';
import { BookText, CircleUserRound, Home, List, Store } from '@tamagui/lucide-icons';
import { useTheme, Image, Theme } from 'tamagui';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          backgroundColor: theme.color5.val,
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
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../../../assets/logo.png')}
              animation="bouncy"
              scale={focused ? 1.4 : 1}
              opacity={focused ? 1 : 0.7}
              width={size - 10}
              height={size}
            />
          ),
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

const BottomNavigation = () => {
  return (
    <Theme name="green">
      <BottomNav />
    </Theme>
  );
};

export default BottomNavigation;
