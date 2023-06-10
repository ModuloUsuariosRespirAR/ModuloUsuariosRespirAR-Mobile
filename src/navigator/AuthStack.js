import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../auth/Login';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
