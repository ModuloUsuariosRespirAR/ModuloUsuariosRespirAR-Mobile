import { useAuth } from '../context/authContext';
import { ScrollView, useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, Animated, TextInput, Pressable } from 'react-native';
import { Button, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons';
import { DataTable, Switch } from 'react-native-paper';


import { SelectList } from 'react-native-dropdown-select-list';

const UserList = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const { loadUsers, usersList, token, acessToken } = useAuth();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showAddUsrModal, setShowAddUsrModal] = useState(false);

  const {createNewUser, createdUser} = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = React.useState('');

  const toast = useToast();


  useEffect(() => loadUsers(), []);
 
  const handleAddUser = () => {
    setShowAddUsrModal(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleCloseAddUsrModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setShowAddUsrModal(false);
    });
  };


  const handleCreateUser = async () => {
    if (username === '' || email === '') {
      return toast.show({
        description: 'Todos los campos son obligatorios'
      });
    }

    console.log("token", token)

    try {
      const result = await createNewUser(
        token,
        acessToken,
        username,
        username,
        email,
        "1234"
      );
      if (result === null) {
        toast.show({
          description:
            'El usuario ó contraseña ingresado es incorrecto ó no se encuentra registrado'
        });
      }
    } catch (error) {
      toast.show({
        description: 'Hubo un error, intente nuevamente'
      })
      console.log("error", error)
      ;
    }


    useEffect(() => loadUsers(), []);
  };

  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingHorizontal: 10,
      overflow: 'scroll'
    },
    tableHeader: {
      backgroundColor: '#DCDCDC'
    },
    title: {
      width: 85
    },
    cell: {
      width: 85
    },
    switch: {
      width: 50
    },
    mainContainer: {
      flex: 1
    },
    container: {
      flex: 1,
      alignItems: 'center'
      /* justifyContent: 'center' */
    },
    image: {
      flex: 1,
      justifyContent: 'center'
    },
    mainText: {
      color: '#00CEFE',
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 50
    },
    userNameText: {
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
      marginBottom: 25
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      opacity: fadeAnim
    },
    modalInput: {
      height: 40,
      width: 200,
      marginVertical: 10,
      borderWidth: 1,
      padding: 10
    }
 
  });

  const headers = ['Username', 'Email', 'Habilitado', ''];
  //const headers = ['Username', 'Email', 'Habilitado', 'Fecha Password'];

  return (
    <View style={styles.container}>
      {/* <Text>Lista de usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      /> */}
      <Button
              title="Agregar Usuario"
              color="#00CEFE"
              onPress={handleAddUser}
            />
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            {React.Children.toArray(
              headers.map((header) => (
                <DataTable.Title style={styles.title}>{header}</DataTable.Title>
              ))
            )}
          </DataTable.Header>
          {React.Children.toArray(
            usersList.map((user) => (
              <DataTable.Row>
                <DataTable.Cell style={styles.cell}>
                  <Text>{user.username}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>{user.email}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.switch}>
                  <Switch
                    color={'blue'}
                    value={user.enabled}
                    onValueChange={onToggleSwitch}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                <Text>Edit</Text>

                {/* 
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  
                  <Pressable onPress={() => console.log(user.username + ", edit: " + user.email)}>
                    <Icon name="pencil"/>
                  </Pressable>
                  
                  <Pressable onPress={() => console.log(user.username + ", delete: " + user.email)}>
                    <Icon name="delete-forever"/>
                  </Pressable>

                </View> 
                */}
                  
                </DataTable.Cell>
              </DataTable.Row>
            ))
          )}
        </DataTable>
      </ScrollView>
    

      <Modal
          visible={showAddUsrModal}
          transparent={true}
          onRequestClose={handleCloseAddUsrModal}
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent]}>
              <Text style={styles.loginText}>Agregar Usuario</Text>
              <TextInput
                  style={styles.modalInput}
                  value={username}
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                />
              {/* <TextInput style={styles.modalInput} placeholder="Email" /> */}
              <TextInput
                  style={styles.modalInput}
                  value={email}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />
                            
              <Button
                color="#359AF2"
                title="Agregar"
                onPress={handleCreateUser}
              />
              <Button
                color="#FF0000"
                title="Cancelar"
                onPress={handleCloseAddUsrModal}
              />
            </Animated.View>           
          </View>
        </Modal>
    
    
    </View>
  );
};

export default UserList;
