import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet  } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí
    console.log('Iniciar sesión:', username, password);
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });


  return (
    <View style={styles.container}>
      <Text>Iniciar sesión</Text>
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
