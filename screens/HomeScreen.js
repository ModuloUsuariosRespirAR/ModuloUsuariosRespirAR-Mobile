import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Text, Button, IconButton } from "@react-native-material/core";
import backgroundImage from "../assets/smartcity.jpg";
import { HStack } from 'react-native-flex-layout';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


const HomeScreen = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Aquí puedes realizar una llamada a la API o ejecutar la lógica necesaria para obtener el recuento de usuarios
    // En este ejemplo, simplemente estableceremos un valor estático
    setUserCount(10);
  }, []);

  const handleAddUser = () => {
    // Aquí puedes implementar la lógica para agregar un usuario
    // Puedes mostrar un modal o navegar a una pantalla de creación de usuarios
    console.log('Agregar usuario');
  };

  const handleEditUser = () => {
    // Aquí puedes implementar la lógica para editar un usuario
    // Puedes mostrar un modal o navegar a una pantalla de edición de usuarios
    console.log('Editar usuario');
  };

  const handleDeleteUser = () => {
    // Aquí puedes implementar la lógica para eliminar un usuario
    // Puedes mostrar un modal de confirmación y luego realizar la eliminación
    console.log('Eliminar usuario');
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      /* justifyContent: 'center' */
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    mainText:{
      color: '#00CEFE',
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 50,
    },
    userNameText:{
      margin: 10,
      fontSize: 18,
      fontWeight: 'bold'
    },
    textContainer: {
      backgroundColor: '#F29D35',
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
      marginHorizontal: 10,
      elevation: 5
    },
    notificationsContainer: {
      marginBottom: 25,
    },

  });



  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <Text style={styles.mainText}>RespirAR</Text>
        <Text style={styles.userNameText}>¡Bienvenido UsuarioName!</Text>
        <View style={styles.container}>

          <HStack m={4} spacing={6}>
            <Button title="Agregar Usuario" color="#F29D35" onPress={handleAddUser} />
            <IconButton icon={props => <Icon name="pencil" {...props} />}  onPress={handleEditUser}/>
            <IconButton icon={props => <Icon name="delete" {...props} />}  onPress={handleEditUser}/>
          </HStack>

          <HStack m={4} spacing={6}>
            <Button style={styles.button} color="#F29D35" title="Agregar Rol" onPress={handleAddUser} />
            <IconButton icon={props => <Icon name="pencil" {...props} />}  onPress={handleEditUser}/>
            <IconButton icon={props => <Icon name="delete" {...props} />}  onPress={handleEditUser}/>
          </HStack>
          
        </View>

        <View style={styles.notificationsContainer}>
          <View style={styles.textContainer}>
            <Text>Usuarios con autorizacion pendiente: {userCount}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Cantidad de usuarios: {userCount}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Cantidad de roles: {userCount}</Text>
          </View>
        </View>

      </ImageBackground>
    </View>
  );
};

export default HomeScreen;