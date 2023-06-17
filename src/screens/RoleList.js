import { useAuth } from '../context/authContext';
import { ScrollView } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataTable, Switch } from 'react-native-paper';

const UserList = () => {
  const { loadRoles, rolesList } = useAuth();

  

  useEffect(() => loadRoles(), []);
 
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

  const headers = ['Nombre'];

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
            rolesList.map((rol) => (
              <DataTable.Row>
                <DataTable.Cell style={styles.cell}>
                  <Text>{rol.name}</Text>
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

