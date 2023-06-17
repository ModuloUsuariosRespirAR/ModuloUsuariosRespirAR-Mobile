import { Ionicons } from '@expo/vector-icons';
import { Box, Pressable, Text } from 'native-base';
import { HomeStack } from '../navigator/HomeStack';
import { UserEditStack } from '../navigator/UserEditStack';
import { UserListStack } from '../navigator/UserListStack';
import { ProfileStack } from '../navigator/ProfileStack';
import { RoleListStack } from '../navigator/RoleListStack';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const HomeScreeen = () => <HomeStack></HomeStack>;
const UserEdit = () => <UserEditStack></UserEditStack>;
const UserList = () => <UserListStack></UserListStack>;
const Profile = () => <ProfileStack></ProfileStack>;
const RolesList = () => <RoleListStack/>;

const initialLayout = {
  width: Dimensions.get('window').width
};

const renderScene = SceneMap({
  home: HomeScreeen,
  // edit: UserEdit,
  list: UserList,
  rol: RolesList,
  profile: Profile
});

export const TabBarComponent = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      name: 'Inicio',
      icon: (color, active) => {
        return <Ionicons name="home" size={active ? 25 : 20} color={color} />;
      }
    },
    // {
    //   key: 'edit',
    //   name: 'UserEdit',
    //   icon: (color, active) => {
    //     return (
    //       <Ionicons
    //         name="chatbubbles-outline"
    //         size={active ? 25 : 20}
    //         color={color}
    //       />
    //     );
    //   }
    // },
    {
      key: 'list',
      name: 'Usuarios',
      icon: (color, active) => {
        return (
          <Ionicons name="list-outline" size={active ? 25 : 20} color={color} />
        );
      }
    },
    {
      key: 'rol',
      name: 'Roles',
      icon: (color, active) => {
        return (
          <Ionicons name="list-outline" size={active ? 25 : 20} color={color} />
        );
      }
    },
    {
      key: 'profile',
      name: 'Perfil',
      icon: (color, active) => {
        return (
          <Ionicons
            name="person-outline"
            size={active ? 25 : 20}
            color={color}
          />
        );
      }
    }
  ]);

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row" height="70px" maxHeight="70px">
        {props.navigationState.routes.map((route, i) => {
          const active = index === i;
          const color = active ? '#053df5' : '#3261fa';
          const borderColor = active ? '#3261fa' : 'blue.200';
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={route.key}
              bgColor="blue.400"
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
                alignItems="center"
              >
                {route.icon(color, active)}
                <Text color={color} fontWeight={active ? 'bold' : 'normal'}>
                  {route.name}
                </Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      tabBarPosition="bottom"
    />
  );
};
