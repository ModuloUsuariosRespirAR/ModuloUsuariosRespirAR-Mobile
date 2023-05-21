import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from "@react-native-material/core";


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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });


  return (
    <View style={styles.container}>
      <Text>¡Bienvenido a la pantalla principal!</Text>
      <Text>Cantidad de usuarios: {userCount}</Text>
      <Button title="Agregar usuario" onPress={handleAddUser} />
      <Button title="Editar usuario" onPress={handleEditUser} />
      <Button title="Eliminar usuario" onPress={handleDeleteUser} />
    </View>
  );
};

export default HomeScreen;