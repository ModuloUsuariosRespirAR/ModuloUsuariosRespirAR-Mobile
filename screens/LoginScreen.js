import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ImageBackground  } from 'react-native';
import backgroundImage from "../assets/smartcity.jpg";

const LoginScreen = () => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí
    console.log('Iniciar sesión:', username, password);
  };
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    mainText:{
      color: '#00CEFE',
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 50,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 5,
    },
    loginText: {
      backgroundColor: '#359AF2',
      color: '#fff',
      padding: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      borderRadius: 10,
    },
    input: {
      height: 40,
      width: 200,
      margin: 15,
      marginTop: 0,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    }, 
    button: {
      margin: 10,
      borderRadius: 10
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    inputLabel: {
      fontWeight: 'bold',
      marginTop: 5,
      paddingLeft: 15,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <Text style={styles.mainText}>RespirAR</Text>
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>INICIA SESIÓN</Text>
            <SafeAreaView>
              <View>
                <Text style={styles.inputLabel}>Usuario</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeUsername}
                  value={username}
                  placeholder="Email"
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="Password"
                />
              </View>
              <View style={styles.button}>
                <Button color="#359AF2" title="Iniciar sesión" onPress={handleLogin} />
              </View>
            </SafeAreaView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
