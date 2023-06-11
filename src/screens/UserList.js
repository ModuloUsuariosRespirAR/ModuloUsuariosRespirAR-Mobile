import { useAuth } from '../context/authContext';
import { ScrollView } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataTable, Switch } from 'react-native-paper';

const UserList = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const { loadUsers, usersList } = useAuth();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    // Lógica para obtener la lista de usuarios aquí
    // En este ejemplo, estableceremos usuarios de prueba estáticos
    // setUsers([
    //   {
    //     scope: [],
    //     id: '501e122e-f807-421c-8a08-186f389c6092',
    //     username: 'steve',
    //     email: 'steve@test.com',
    //     enabled: true,
    //     gravatar: false,
    //     date_password: '2023-06-10T18:17:35.000Z',
    //     description: null,
    //     website: null
    //   },
    //   {
    //     scope: [],
    //     id: '5f6ec00b-f1c6-4457-a985-aad38e875413',
    //     username: 'nedito',
    //     email: 'nedito@test.com',
    //     enabled: true,
    //     gravatar: false,
    //     date_password: '2023-06-10T18:17:18.000Z',
    //     description: null,
    //     website: null
    //   },
    //   {
    //     scope: [],
    //     id: 'a070e789-da03-47f1-84aa-1a604660344c',
    //     username: 'ale',
    //     email: 'ale@test.com',
    //     enabled: true,
    //     gravatar: false,
    //     date_password: '2023-06-10T18:15:24.000Z',
    //     description: null,
    //     website: null
    //   },
    //   {
    //     scope: [],
    //     id: 'admin',
    //     username: 'admin',
    //     email: 'admin@test.com',
    //     enabled: true,
    //     gravatar: false,
    //     date_password: '2023-06-06T23:44:56.000Z',
    //     description: null,
    //     website: null
    //   },
    //   {
    //     scope: [],
    //     id: 'c9bb23f8-106c-49dd-ba36-cb590d3f630f',
    //     username: 'eduaguirre',
    //     email: 'edu@test.com',
    //     enabled: true,
    //     gravatar: false,
    //     date_password: '2023-06-10T18:15:55.000Z',
    //     description: null,
    //     website: null
    //   },
    //   {
    //     scope: [],
    //     id: 'f9202d9c-0dfc-45e2-9902-dea575ab5fcd',
    //     username: 'leomessi',
    //     email: 'leomessi@test.com',
    //     enabled: true,
    //     gravatar: false,
    //     date_password: '2023-06-10T18:16:11.000Z',
    //     description: null,
    //     website: null
    //   }
    // ]);
    loadUsers();
  }, []);

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
