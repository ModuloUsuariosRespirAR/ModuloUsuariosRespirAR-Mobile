import React, { useState } from 'react';
import { registerRootComponent } from 'expo';
import { NativeBaseProvider } from 'native-base';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './context/authContext';
import { TabBarComponent } from './layout/TabBar';
import { AuthStack } from './navigator/AuthStack';
import theme from './theme/Theme';

const RootNavigator = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NativeBaseProvider theme={theme}>
      {user && isLoggedIn ? <TabBarComponent /> : <AuthStack />}
    </NativeBaseProvider>
  );
};

const AppComponent = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default registerRootComponent(AppComponent);
