import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
//import DrawNavigator from './navigator/AppNavigator';
import "react-native-gesture-handler"
import AppNavigator from './navigator/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    
     /*  <View style={styles.container}>
        <Text>ModuloUsuariosRespirAR-Mobile</Text>
        <StatusBar style='auto' />
        <HomeScreen/>
      </View> */
      <NavigationContainer>
        <AppNavigator>          
        </AppNavigator>
      </NavigationContainer>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
