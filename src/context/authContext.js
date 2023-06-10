import React, { createContext, useContext, useState } from 'react';
import { login } from '../services/user';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async ({ data }) => {
    const userLogged = await login({ data });
    if (userLogged !== null) {
      setUser(userLogged);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
    return userLogged;
  };

  const value = {
    isLoading,
    isLoggedIn,
    loginUser,
    setIsLoading,
    setIsLoggedIn,
    setUser,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
