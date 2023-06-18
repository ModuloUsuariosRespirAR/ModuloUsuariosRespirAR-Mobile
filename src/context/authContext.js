import React, { createContext, useContext, useState } from 'react';
import { login, getUsers, getRoles, createUser } from '../services/user';
//import { accessibilityProps } from 'react-native-paper/lib/typescript/src/components/MaterialCommunityIcon';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [acessToken, setAccessToken] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [userCreated, setUserCreated] = useState(null)

  const loginUser = async ({ data }) => {
    const userLogged = await login({ data });
    if (userLogged !== null) {
      setUser(userLogged);
      setToken(userLogged['X-Auth-token']);
      setAccessToken(userLogged['accessToken']);
      setIsLoggedIn(true);

      console.log("usuario Logueado", userLogged)
    }

    console.log(userLogged)
    console.log("Login authToken", token )
    console.log("Login  accessToken", acessToken)

    setIsLoading(false);
    return userLogged;
  };

  const loadUsers = async () => {
    const usersList = await getUsers({ token });
    console.log('🚀 ~ file: authContext.js:26 ~ usersList:', usersList);
    if (usersList !== null) {
      return setUsersList(usersList.users);
    }
    return setUsersList([]);
  };

  const loadRoles = async () => {
    const rolesList = await getRoles({ token });
    console.log('🚀 ~ file: authContext.js:26 ~ usersList:', rolesList);
    if (rolesList !== null) {
      return setRolesList(rolesList.roles);
    }
    return setRolesList([]);
  };

  const createNewUser = async (
    token,
    acessToken,
    displayName,
    username,
    email,
    password
  ) => {
    const createdUser = await createUser(
      token,
      acessToken,
      displayName,
      username,
      email,
      password
    );

    console.log("createdUser", createdUser)

    if (createdUser != null) {
      return createdUser;
    } else {
      return null;
    }
  };

  const value = {
    loadUsers,
    loadRoles,
    isLoading,
    isLoggedIn,
    loginUser,
    setIsLoading,
    setIsLoggedIn,
    setUser,
    token,
    acessToken,
    user,
    usersList,
    rolesList,
    createNewUser,
    userCreated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
