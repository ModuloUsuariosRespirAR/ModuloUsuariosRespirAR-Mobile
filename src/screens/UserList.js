import { useAuth } from '../context/authContext';
import { ScrollView, useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Animated,
  TextInput,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DataTable, Switch, Button } from 'react-native-paper';

import { SelectList } from 'react-native-dropdown-select-list';

const UserList = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const {
    loadUsers,
    usersList,
    token,
    acessToken,
    createNewUser,
    userModification,
    userDeletation,

  } = useAuth();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const [selectedUser, setSelectedUser] = useState(null);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [showAddUsrModal, setShowAddUsrModal] = useState(false);
  const [showEditUsrModal, setShowEditUsrModal] = useState(false);
  const [showDeleteUsrModal, setShowDeleteUsrModal] = useState(false);


  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = React.useState('');

  const [editIsSwitchOn, setEditIsSwitchOn] = React.useState(true);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const toast = useToast();

  useEffect(() => loadUsers(), []);

  const showModalAddUser = () => {
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

    try {
      const result = await createNewUser(
        token,
        acessToken,
        username,
        email
      );
      if (result === null) {
        toast.show({
          description:
            'El usuario ó contraseña ingresado es incorrecto ó no se encuentra registrado'
        });
      }else if (result.status === 200){
        console.log("creo entro")
        toast.show({
          description:
            'Usuario Creado'
        });
        console.log("creo salio")
        handleCloseAddUsrModal();
        return;
      }
    } catch (error) {
      toast.show({
        description: 'Hubo un error, intente nuevamente'
      });
      console.log('error', error);
    }

    //Actualizar lista de usuarios funcion

    handleCloseAddUsrModal();
  };

  const showModalEditUser = (userData) => {
    setSelectedUser(userData);

    setEditIsSwitchOn(userData.enabled)
    setEditDisplayName(userData.displayName);
    setEditUsername(userData.username);
    setEditEmail(userData.email);
    setEditPassword(userData.password);

    console.log(userData);

    setShowEditUsrModal(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleCloseEditUsrModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setShowEditUsrModal(false);
    });
  };

  const showModalDeleteUser = (userData) => {
    setSelectedUser(userData);

    console.log(userData);

    setShowDeleteUsrModal(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleCloseDeleteUsrModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setShowDeleteUsrModal(false);
    });
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
      width: 50
    },
    emailTitle : {
      width: 100
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
      paddingTop: 20,
      marginTop: 40,
      paddingHorizontal: 10,
      overflow: 'scroll'
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
    },
    loginText: {
      fontWeight: "bold",
    }
  });

  const headers = ['Username', 'Email', 'Editar', 'Borrar'];

  const handleEditUser = () => {
    console.log('Datos del usuario Edit:', selectedUser);
    // Aquí puedes realizar cualquier otra acción que necesites con los datos del usuario
    userModification(token, acessToken, selectedUser.id, editUsername, editIsSwitchOn);
    handleCloseEditUsrModal()
  };

  const handleDeleteUser = () => {
    console.log('Datos del usuario Delete:', selectedUser);
    // Aquí puedes realizar cualquier otra acción que necesites con los datos del usuario
    userDeletation(token, acessToken, selectedUser.id);
    handleCloseDeleteUsrModal()
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        title="Agregar Usuario"
        buttonColor="#00CEFE"
        icon="plus"
        onPress={showModalAddUser}
      >
        Agregar Usuario
      </Button>
      <ScrollView horizontal>
        <DataTable style={[{ marginTop: 10 }]}>
          <DataTable.Header style={styles.tableHeader}>
            {React.Children.toArray(
              headers.map((header) => (
                <DataTable.Title style={header === "Email" ? styles.emailTitle : styles.title}>
                  {header}</DataTable.Title>
              ))
            )}
          </DataTable.Header>
          {React.Children.toArray(
            usersList.map((user) => (
              <DataTable.Row key={user.id}>
                <DataTable.Cell style={styles.cell}>
                  <Text>{user.username}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>{user.email}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.cell, { flexDirection: 'row', justifyContent: 'center' }]}>
                  {/*                   
                  {user.editable && (
                  //Componente a renderizar si cumple condicion de usuario, rol, etc
                  )} 
                  */}

                  
                    <Pressable onPress={() => showModalEditUser(user)}>
                      <View style={{ paddingLeft: 10 }}>
                        <Icon name="pencil" size={18} color="black" />
                      </View>
                    </Pressable>

                    

                    
                  
                </DataTable.Cell>
                <DataTable.Cell style={[styles.cell, { flexDirection: 'row', justifyContent: 'center' }]}>
                  {/*                   
                  {user.editable && (
                  //Componente a renderizar si cumple condicion de usuario, rol, etc
                  )} 
                  */}
                  <Pressable onPress={() => showModalDeleteUser(user)}>
                      <View >
                        <Icon name="trash" size={18} color="black" />
                      </View>
                    </Pressable>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          )}
        </DataTable>
      </ScrollView>

      {/* Modal Creacion de usuario */}
      <Modal
        visible={showAddUsrModal}
        transparent={true}
        onRequestClose={handleCloseAddUsrModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent]}>
            <Text style={styles.loginText}>Agregar Usuario</Text>
            <Text>User Name</Text>
            <TextInput
              style={styles.modalInput}
              value={username}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
            />
            <Text>Email</Text>
            <TextInput
              style={styles.modalInput}
              value={email}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />

            <Button
              mode="contained"
              buttonColor="#359AF2"
              title="Agregar"
              onPress={handleCreateUser}
            >
              Agregar
            </Button>
            <Button
              mode="contained"
              buttonColor="#FF0000"
              title="Cancelar"
              onPress={handleCloseAddUsrModal}
            >
              Cancelar
            </Button>
          </Animated.View>
        </View>
      </Modal>

      {/* Modal Edicion de usuario */}
      <Modal
        visible={showEditUsrModal}
        transparent={true}
        onRequestClose={handleCloseEditUsrModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent]}>
            <Text style={styles.loginText}>Editar Usuario</Text>
            <Text>User Name</Text>
            <TextInput
              style={styles.modalInput}
              value={editUsername}
              placeholder="Username"
              onChangeText={(text) => setEditUsername(text)}
            />
            <Text>Email</Text>
            <TextInput
              style={styles.modalInput}
              value={editEmail}
              placeholder="Email"
              onChangeText={(text) => setEditEmail(text)}
              editable={false}
            />

            <Text>Habilitado</Text>
            <Switch
              color={'blue'}
              value={editIsSwitchOn}
              onValueChange={setEditIsSwitchOn}
            />

            
            <Button
              mode="contained"
              buttonColor="#359AF2"
              title="Agregar"
              onPress={handleEditUser}
            >

              Guardar
            </Button>
            <Button
              mode="contained"
              buttonColor="#FF0000"
              title="Cancelar"
              onPress={handleCloseEditUsrModal}
            >
              Cancelar
            </Button>
          </Animated.View>
        </View>
      </Modal>

      {/* Modal Eliminar usuario */}
      <Modal
        visible={showDeleteUsrModal}
        transparent={true}
        onRequestClose={handleCloseDeleteUsrModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent]}>
            <Text style={styles.loginText}>Eliminar Usuario?</Text>
            <Text>{selectedUser?.username}</Text>
            <Text>{selectedUser?.email}</Text>
            <Button
              mode="contained"
              buttonColor="#359AF2"
              title="Agregar"
              onPress={handleDeleteUser}
            >
              Eliminar
            </Button>
            <Button
              mode="contained"
              buttonColor="#FF0000"
              title="Cancelar"
              onPress={handleCloseDeleteUsrModal}
            >
              Cancelar
            </Button>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default UserList;
