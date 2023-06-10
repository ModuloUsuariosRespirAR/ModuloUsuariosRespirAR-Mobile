import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from '../screens/Home';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
