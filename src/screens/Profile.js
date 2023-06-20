import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import React, { Children } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Header } from '../layout/Header';
import { useAuth } from '../context/authContext';

const Profile = () => {
  const {
    user: { user },
    logOut
  } = useAuth();

  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingHorizontal: 10,
      overflow: 'scroll',
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    },
    icon: {
      alignItems: 'center'
    }
  });

  return (
    <View style={styles.container}>
      {!user.image ? (
        <View style={styles.icon}>
          <MaterialCommunityIcons name="account" color={'#717171'} size={100} />
        </View>
      ) : (
        <Image
          source={{ uri: user.image }}
          style={{ width: '50%', height: '50%', borderRadius: 15 }}
        />
      )}

      <Text
        style={{
          color: '#000000',
          fontSize: 18,
          marginBottom: 20,
          textAlign: 'center'
        }}
      >
        Nombre de usuario: {user.username}
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 18,
          marginBottom: 20,
          textAlign: 'center'
        }}
      >
        Email: {user.email}
      </Text>
      {user.roles.length > 0 && (
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center'
          }}
        >
          {/* {Children.toArray(user.roles).map((rol) => (
            <Text>{rol} |</Text>
          ))} */}
        </Text>
      )}
      <Button
        mode="contained"
        onPress={() => logOut()}
        icon={'exit-to-app'}
        buttonColor="#359AF2"
      >
        Cerrar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 48,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30
  },
  button: {
    backgroundColor: 'blue',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Profile;
