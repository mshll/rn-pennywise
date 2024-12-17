import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../../screens/auth/WelcomeScreen";
import ParentSignupScreen from "../../screens/authParents/ParentSignupScreen";
import ParentLoginScreen from "../../screens/authParents/ParentLoginScreen";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ParentSignup" component={ParentSignupScreen} />
      <Stack.Screen name="ParentLogin" component={ParentLoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
