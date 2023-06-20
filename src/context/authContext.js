import React, { createContext, useContext, useState } from 'react';
import {
  login,
  getUsers,
  getRoles,
  createUser,
  userEdit,
  userDelete,
  editRole,
  deleteRole,
  addRole,
  getUserRoles,
  assignRol
} from '../services/user';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [userCreated, setUserCreated] = useState(null);

  const loginUser = async ({ data }) => {
    const userLogged = await login({ data });
    if (userLogged !== null) {
      setUser(userLogged);
      setToken(userLogged['X-Auth-token']);
      setAccessToken(userLogged['accessToken']);
      setIsLoggedIn(true);

      console.log('usuario Logueado', userLogged);
    }

    console.log(userLogged);
    console.log('Login authToken', token);
    console.log('Login  accessToken', accessToken);

    setIsLoading(false);
    return userLogged;
  };

  const loadUsers = async () => {
    const usersList = await getUsers({ token });
    if (usersList !== null) {
      console.log("usuarios bd", usersList.users)
      return setUsersList(usersList.users);
    }
    return setUsersList([]);
  };

  const loadRoles = async () => {
    const rolesList = await getRoles({ token });
    if (rolesList !== null) {
      console.log("roles bd", rolesList.roles)
      return setRolesList(rolesList.roles);
    }
    return setRolesList([]);
  };

  const createNewUser = async (
    token,
    acessToken,
    username,
    email
  ) => {
    const createdUser = await createUser(
      token,
      acessToken,
      username,
      email,
      "1234"
    );

    console.log('createdUser', createdUser);

    if (createdUser != null) {
      setUsersList([createdUser.data.user, ...usersList]);
      return createdUser;
    } else {
      return null;
    }
  };

  const logOut = () => {
    setUser([]);
    setToken('');
    setAccessToken('');
    setIsLoggedIn(false);
  };

  const userModification = async (token, accessToken, userId, username, enabled) => {
    console.log("entro")
    const user = await userEdit(token, accessToken, userId, username, enabled);
    console.log("user updated", user)
    const valueUpdated = username;
    const usuarios = usersList.map((userParam) =>
    userParam.id === userId ? { id: userId, username: valueUpdated, email: userParam.email, enabled: enabled } : userParam
  );
    setUsersList(usuarios);
    return user;
  };

  const userDeletation = async (token, accessToken, userId) => {
    const result = await userDelete(token, accessToken, userId);
    const usuarios = usersList.filter((user) => user.id !== userId);
    setUsersList(usuarios);

    return result;
  };

  const userRoles = async (userId, token) => {
    const userRoles = await getUserRoles(userId, token);

    return userRoles;
  };


  const roleModification = async (role) => {
    const result = await editRole(token, accessToken, role);
    if (result.status === 200) {
      const valueUpdated = result.data.values_updated.name;
      const roles = rolesList.map((rol) =>
        rol.id === role.id ? { id: rol.id, name: valueUpdated } : rol
      );
      setRolesList(roles);
      return result;
    }
    return result;
  };

  const removeRole = async (roleID) => {
    const result = await deleteRole(token, accessToken, roleID);
    if (result.status === 200) {
      const roles = rolesList.filter((rol) => rol.id !== roleID);
      setRolesList(roles);
      return result;
    }
    return result;
  };

  const createRole = async (role) => {
    const result = await addRole(token, accessToken, role);
    if (result.status === 200) {
      const newRoleAdded = {
        id: result.data.role.id,
        name: result.data.role.name
      };

      setRolesList([newRoleAdded, ...rolesList]);
      return result;
    }
    return result;
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
    acessToken: accessToken,
    user,
    usersList,
    rolesList,
    createNewUser,
    userCreated,
    userModification,
    userDeletation,
    logOut,
    roleModification,
    removeRole,
    createRole,
    userRoles
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
