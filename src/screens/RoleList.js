import { useAuth } from '../context/authContext';
import { ScrollView } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  TextInput,
  Pressable
} from 'react-native';
import { Button, List } from 'react-native-paper';

const RoleList = () => {
  const { loadRoles, rolesList } = useAuth();
  const [selectedRole, setSelectedRole] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showModal, setShowModal] = useState({
    edit: false,
    delete: false,
    add: false
  });

  const openModal = (action) => {
    setShowModal({ ...showModal, [action]: true });
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const closeModal = (action) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setShowModal({ ...showModal, [action]: false });
    });
  };

  useEffect(() => loadRoles(), []);

  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      marginTop: 40,
      paddingHorizontal: 10,
      overflow: 'scroll'
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

  const handleAddRole = () => {
    console.log('add role');
  };

  const handleEditRole = () => {
    console.log(selectedRole);
  };

  const handleDeleteRole = () => {
    console.log(selectedRole);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleAddRole}
        icon="plus"
        mode="contained"
        buttonColor="#00CEFE"
      >
        Agregar Rol
      </Button>
      {React.Children.toArray(
        rolesList.map((rol) => (
          <List.Item
            title={rol.name}
            left={(props) => <List.Icon {...props} icon="account-details" />}
            right={(props) => (
              <>
                <Pressable
                  onPress={() => {
                    setSelectedRole({ id: rol.id, name: rol.name });
                    openModal('edit');
                  }}
                >
                  <List.Icon {...props} icon="pencil" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setSelectedRole({ id: rol.id, name: rol.name });
                    openModal('delete');
                  }}
                >
                  <List.Icon {...props} icon="trash-can" />
                </Pressable>
              </>
            )}
          />
        ))
      )}
      {/* Modal Edicion de Rol */}
      <Modal
        visible={showModal.edit}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent]}>
            <Text style={styles.loginText}>
              Editar Rol: {selectedRole.name}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={selectedRole.name}
              placeholder="Nombre del Rol"
              onChangeText={(text) =>
                setSelectedRole({ ...selectedRole, name: text })
              }
            />

            <Button
              mode="contained"
              buttonColor="#359AF2"
              title="Agregar"
              onPress={handleEditRole}
            >
              Guardar
            </Button>
            <Button
              mode="contained"
              buttonColor="#FF0000"
              title="Cancelar"
              onPress={() => closeModal('edit')}
            >
              Cancelar
            </Button>
          </Animated.View>
        </View>
      </Modal>
      {/* Modal Eliminar Rol */}
      <Modal
        visible={showModal.delete}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent]}>
            <Text style={styles.loginText}>
              ¿Eliminar Rol {selectedRole.name}?
            </Text>
            <Button
              mode="contained"
              buttonColor="#359AF2"
              onPress={handleDeleteRole}
            >
              Eliminar
            </Button>
            <Button
              mode="contained"
              buttonColor="#FF0000"
              title="Cancelar"
              onPress={() => closeModal('delete')}
            >
              Cancelar
            </Button>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default RoleList;
