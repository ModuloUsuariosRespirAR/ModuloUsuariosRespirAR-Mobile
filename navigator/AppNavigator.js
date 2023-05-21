import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import UserList from "../screens/UserList";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        //Aca se reemplza por el stack navigator de cada componente
        component={HomeScreen}
        options={{
          tabBarLabel: "Inicio",
          /* tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ), */
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="User List"
        component={UserList}
        options={{
          headerShown: false,
          tabBarLabel: "Lista Usuarios",
          /* tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ), */
        }}
      />
      <Tab.Screen
        name="Login / Logout"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Login/Logout",
          /* tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ), */
        }}
      />
    </Tab.Navigator>
  );
}