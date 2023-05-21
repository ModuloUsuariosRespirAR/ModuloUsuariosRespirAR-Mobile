import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet  } from 'react-native';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lógica para obtener la lista de usuarios aquí
    // En este ejemplo, estableceremos usuarios de prueba estáticos
    setUsers([
      { id: 1, name: 'Usuario 1' },
      { id: 2, name: 'Usuario 2' },
      { id: 3, name: 'Usuario 3' },
    ]);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      //marginTop: 25,
    }
  });


  return (
    <View style={styles.container}>
      <Text>Lista de usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default UserList;
