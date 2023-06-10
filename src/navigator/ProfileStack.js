import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Profile from '../screens/Profile';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
