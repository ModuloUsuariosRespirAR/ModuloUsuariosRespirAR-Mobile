import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import UserEdit from '../screens/UserEdit';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export const UserEditStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserEdit" component={UserEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
