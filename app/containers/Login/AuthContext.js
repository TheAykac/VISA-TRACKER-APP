import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNameAndSurname, setUserNameAndSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCode, setUserCode] = useState('');

  const login = async (response) => {
    const { nameAndSurname, email, userCode } = response.data.data;
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('userNameAndSurname', nameAndSurname);
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userCode', userCode);

    setIsLoggedIn(true);
    setUserNameAndSurname(nameAndSurname);
    setUserEmail(email);
    setUserCode(userCode);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userNameAndSurname');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userCode');
    setIsLoggedIn(false);
    setUserNameAndSurname('');
    setUserEmail('');
    setUserCode('');
  };

  const checkLoginStatus = async () => {
    const value = await AsyncStorage.getItem('isLoggedIn');
    const name = await AsyncStorage.getItem('userNameAndSurname');
    const email = await AsyncStorage.getItem('userEmail');
    const code = await AsyncStorage.getItem('userCode');

    setIsLoggedIn(value === 'true');
    setUserNameAndSurname(name || '');
    setUserEmail(email || '');
    setUserCode(code || '');
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userNameAndSurname,
        userEmail,
        userCode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
