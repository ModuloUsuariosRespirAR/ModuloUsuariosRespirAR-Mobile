import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RoleList from '../screens/RoleList';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const RoleListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleList" component={RoleList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};