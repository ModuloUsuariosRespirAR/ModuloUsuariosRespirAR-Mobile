import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
  TextInput,
  Animated
} from 'react-native';
import { Text, Button, IconButton } from '@react-native-material/core';
import backgroundImage from '../assets/smartcity.jpg';
import { HStack } from 'react-native-flex-layout';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useAuth } from '../context/authContext';

const Home = () => {
  const { user, usersList, rolesList } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedRole, setSelectedRole] = React.useState('');

  const [showAddUsrModal, setShowAddUsrModal] = useState(false);
  const [showEditUsrModal, setShowEditUsrModal] = useState(false);

  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);

  useEffect(() => {
    setUserCount(10);
  }, []);

  const handleAddUser = () => {
    setShowAddUsrModal(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleEditUser = () => {
    setShowEditUsrModal(true);
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

  const handleCloseEditUsrModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setShowEditUsrModal(false);
    });
  };

  const handleCloseModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setShowModal(false);
    });
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    container: {
      flex: 1,
      alignItems: 'center'
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

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.mainText}>RespirAR</Text>
        <Text style={styles.userNameText}>
          ¡Bienvenido {user.user.username}!
        </Text>

        {/*  <View style={styles.container}>
          <HStack m={4} spacing={6}>
            <Button
              title="Agregar Usuario"
              color="#00CEFE"
              onPress={handleAddUser}
            />
            <IconButton
              icon={(props) => <Icon name="pencil" {...props} />}
              onPress={handleEditUser}
            />
            <IconButton
              icon={(props) => <Icon name="delete" {...props} />}
              onPress={handleDeleteUser}
            />
          </HStack>

          <HStack m={4} spacing={6}>
            <Button
              style={styles.button}
              color="#00CEFE"
              title="Agregar Rol"
              onPress={handleAddUser}
            />
            <IconButton
              icon={(props) => <Icon name="pencil" {...props} />}
              onPress={handleEditUser}
            />
            <IconButton
              icon={(props) => <Icon name="delete" {...props} />}
              onPress={handleDeleteUser}
            />
          </HStack>
        </View> */}

        <View style={styles.notificationsContainer}>
          <View style={styles.textContainer}>
            <Text>Cantidad de usuarios: {usersList.length}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Cantidad de roles: {rolesList.length}</Text>
          </View>
        </View>

        {/*         <Modal visible={showModal} transparent={true} onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent]}>
              <Text style={styles.loginText}>INICIA SESIÓN</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Usuario"
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Contraseña"
              />
              <Button color="#359AF2" title="Guardar" onPress={handleCloseModal} />
              <Button color="#FF0000" title="Cancelar" onPress={handleCloseModal} />
            </Animated.View>
          </View>
        </Modal> */}

        {/*         <Modal
          visible={showAddUsrModal}
          transparent={true}
          onRequestClose={handleCloseAddUsrModal}
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent]}>
              <Text style={styles.loginText}>Agregar Usuario</Text>
              <TextInput style={styles.modalInput} placeholder="Usuario" />
              <TextInput style={styles.modalInput} placeholder="Contraseña" />
              <Button
                color="#359AF2"
                title="Agregar"
                onPress={handleCloseAddUsrModal}
              />
              <Button
                color="#FF0000"
                title="Cancelar"
                onPress={handleCloseAddUsrModal}
              />
            </Animated.View>
          </View>
        </Modal>

        <Modal
          visible={showEditUsrModal}
          transparent={true}
          onRequestClose={handleCloseEditUsrModal}
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent]}>
              <Text style={styles.loginText}>Editar Usuario</Text>
              <TextInput style={styles.modalInput} placeholder="Usuario" />
              <TextInput style={styles.modalInput} placeholder="Contraseña" />
              <Text>Agregar Rol</Text>
              <SelectList
                setSelected={(val) => setSelectedRole(val)}
                data={
                  (data = [
                    { key: '1', value: 'Rol1', disabled: true },
                    { key: '2', value: 'Rol2' }
                  ])
                }
                save="value"
              />
              <Button
                color="#359AF2"
                title="Guardar"
                onPress={handleCloseEditUsrModal}
              />
              <Button
                color="#FF0000"
                title="Cancelar"
                onPress={handleCloseEditUsrModal}
              />
            </Animated.View>
          </View>
        </Modal> */}

        {/*       MODALS PARA ROLES
  <Modal visible={showModal} transparent={true} onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent]}>
              <Text style={styles.loginText}>Crear Rol</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Usuario"
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Contraseña"
              />
              <Button color="#359AF2" title="Guardar" onPress={handleCloseModal} />
              <Button color="#FF0000" title="Cancelar" onPress={handleCloseModal} />
            </Animated.View>
          </View>
        </Modal>

        <Modal visible={showModal} transparent={true} onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent]}>
              <Text style={styles.loginText}>INICIA SESIÓN</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Usuario"
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Contraseña"
              />
              <Button color="#359AF2" title="Guardar" onPress={handleCloseModal} />
              <Button color="#FF0000" title="Cancelar" onPress={handleCloseModal} />
            </Animated.View>
          </View>
        </Modal> */}
      </ImageBackground>
    </View>
  );
};

export default Home;
