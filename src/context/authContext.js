import React, { createContext, useContext, useState } from 'react';
import { login, getUsers, getRoles } from '../services/user';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [rolesList, setRolesList] = useState([]);

  const loginUser = async ({ data }) => {
    const userLogged = await login({ data });
    if (userLogged !== null) {
      setUser(userLogged);
      setToken(userLogged['X-Auth-token']);
      setIsLoggedIn(true);
    }
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
    user,
    usersList,
    rolesList
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
