import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import backgroundImage from '../assets/smartcity.jpg';
import { useTogglePasswordShow } from '../hooks/useTooglePasswordShow';
import { Icon, useToast } from 'native-base';
import { useAuth } from '../context/authContext';

const Login = () => {
  const { loginUser, setIsLoading } = useAuth();
  const [username, setUsername] = useState('admin@test.com');
  const [password, setPassword] = useState('1234');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordShow();
  const toast = useToast();

  const handleLogin = async () => {
    if (username === '' || password === '') {
      return toast.show({
        description: 'Todos los campos son obligatorios'
      });
    }
    setIsLoading(true);
    try {
      const result = await loginUser({
        data: { username: username, password: password }
      });
      if (result === null) {
        toast.show({
          description:
            'El usuario ó contraseña ingresado es incorrecto ó no se encuentra registrado'
        });
      }
    } catch (error) {
      toast.show({
        description: 'Hubo un error, intente nuevamente'
      });
    }
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    mainText: {
      color: '#00CEFE',
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loginContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 5
    },
    loginText: {
      backgroundColor: '#359AF2',
      color: '#fff',
      padding: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    input: {
      height: 40,
      width: 200,
      margin: 15,
      marginTop: 0,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5
    },
    button: {
      margin: 10,
      borderRadius: 10
    },
    image: {
      flex: 1,
      justifyContent: 'center'
    },
    inputLabel: {
      fontWeight: 'bold',
      marginTop: 5,
      paddingLeft: 15
    },
    passContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputContainer: {
      backgroundColor: 'white',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      width: 200,

      borderWidth: 1,
      padding: 10,
      borderRadius: 5
    },
    inputPass: {
      width: '90%'
    }
  });

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.mainText}>RespirAR</Text>
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>INICIA SESIÓN</Text>
            <SafeAreaView>
              <View>
                <Text style={styles.inputLabel}>Usuario</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  placeholder="Email"
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View style={styles.passContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputPass}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    textContentType="password"
                    placeholder="Password"
                    secureTextEntry={passwordVisibility}
                  />
                  <Pressable onPress={handlePasswordVisibility}>
                    <Icon
                      as={<Ionicons name={rightIcon} />}
                      size={5}
                      color="muted.400"
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.button}>
                <Button
                  color="#359AF2"
                  title="Iniciar sesión"
                  onPress={handleLogin}
                />
              </View>
            </SafeAreaView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
