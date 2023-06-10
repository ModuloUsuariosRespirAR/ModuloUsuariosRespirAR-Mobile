import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import UserList from '../screens/UserList';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const UserListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserList" component={UserList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
