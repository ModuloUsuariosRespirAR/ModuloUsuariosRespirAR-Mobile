import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet  } from 'react-native';

const UserEdit = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    // Lógica para guardar usuario aquí
    console.log('Guardar usuario:', username, email);
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
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

export default UserEdit;
