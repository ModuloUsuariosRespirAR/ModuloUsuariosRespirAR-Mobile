import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Header } from '../layout/Header';
import { useAuth } from '../context/authContext';

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {/* <Header title="Perfil"></Header> */}
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <TouchableOpacity
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
          }}
        >
          {!user.user.image ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={'#717171'}
              size={100}
            />
          ) : (
            <Image
              source={{ uri: user.user.image }}
              style={{ width: '50%', height: '50%', borderRadius: 15 }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000000',
            fontSize: 18,
            marginBottom: 20
          }}
        >
          {user.user.username}
        </Text>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
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
