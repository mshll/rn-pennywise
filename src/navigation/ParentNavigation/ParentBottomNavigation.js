import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigation, ChildrenNavigation, StoreNavigation, ProfileNavigation, TasksNavigation } from './ParentStackNavigations';
import { Home, Users, Store, CircleUserRound, ListCheck } from '@tamagui/lucide-icons';
import { useTheme, Image, Theme } from 'tamagui';
import { useNavigationState } from '@react-navigation/native';
import { getThemeForRoute } from '../../data/constants';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const theme = useTheme();
  const state = useNavigationState((state) => state);
  const currentRoute = state?.routes[state.index]?.name || 'Home';

  // Check if we're in a modal screen
  const isModal = state?.routes?.some((route) => {
    if (route.state?.routes) {
      return route.state.routes.some((r) => ['AddChildScreen', 'AddChoreScreen', 'AddStoreItemScreen'].includes(r.name));
    }
    return false;
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          backgroundColor: theme.color2.val,
          borderTopWidth: 0.5,
          borderTopColor: theme.borderColor.val,
          paddingTop: 5,
          display: isModal ? 'none' : 'flex',
        },
        tabBarActiveTintColor: theme.color11.val,
        tabBarInactiveTintColor: theme.color7.val,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Children"
        component={ChildrenNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <Users size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <ListCheck size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../../../assets/pennywise-logo.png')}
              animation="bouncy"
              scale={1.5}
              opacity={focused ? 1 : 0.7}
              width={size - 10}
              height={size}
              tintColor={focused ? theme.color11.val : theme.color7.val}
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

const ParentBottomNavigation = () => {
  const state = useNavigationState((state) => state);
  const currentRoute = state?.routes[state.index]?.name || 'Home';
  const currentTheme = getThemeForRoute(currentRoute);

  return (
    <Theme name={currentTheme}>
      <BottomNav />
    </Theme>
  );
};

export default ParentBottomNavigation;
