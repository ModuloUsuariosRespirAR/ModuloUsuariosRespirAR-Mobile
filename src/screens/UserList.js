import { useAuth } from '../context/authContext';
import { ScrollView } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataTable, Switch } from 'react-native-paper';

const UserList = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const { loadUsers, usersList } = useAuth();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  

  useEffect(() => loadUsers(), []);
 
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
      width: 160
    },
    cell: {
      width: 100
    },
    switch: {
      width: 50
    }
  });

  const headers = ['Username', 'Email', 'Habilitado', 'Fecha Password'];

  return (
    <View style={styles.container}>
      {/* <Text>Lista de usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      /> */}
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
                  <Text>{user.date_password}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          )}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default UserList;
