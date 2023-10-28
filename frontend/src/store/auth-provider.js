import React, { createContext, useCallback, useContext, useState } from 'react';
import { ROLE_ADMIN, TOKEN, USER_ID, USER_ROLE } from '../consts';
import {
  getUserInfoAPI,
  signInAPI,
  signUpAPI,
  updateUserDataAPI,
  updateUserRecommendsAPI,
} from '../api/investApi';
import { toast } from 'react-toastify';

const ContextProps = {
  isLogged: false,
  role: ROLE_ADMIN,
  userData: null,
  signIn: () => {},
  signUp: () => {},
  updateUserRecommends: () => {},
  logOut: () => {},
  getUserData: () => {},
  updateUserData: () => {},
};

const AuthContext = createContext(ContextProps);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return React.createElement(AuthContext.Provider, { value: auth }, children);
}

export const useAuth = () => useContext(AuthContext);

const loginCheckRequest = () => {
  const token = localStorage.getItem(TOKEN);

  return token !== null;

  // if (!token) {
  //   return false;
  // }
  // const tokenSplit = token.split('.')[1];
  // if (!tokenSplit) {
  //   return false;
  // }
  //
  // const expiry = JSON.parse(atob(tokenSplit)).exp;
  //
  // const isExpired = Math.floor(new Date().getTime() / 1000) >= expiry;
  // if (isExpired) {
  //   localStorage.clear();
  //   return false;
  // }
  //
  // return true;
};

function useProvideAuth() {
  const [isLogged, setLogged] = useState(loginCheckRequest);
  const [role, setRole] = useState(ContextProps.role);
  const [userData, setUserData] = useState(ContextProps.userData);
  const signIn = async (email, password) => {
    try {
      const response = await signInAPI(email, password);
      setLogged(true);
      setRole(response.data.data.user.role);
      localStorage.setItem('firstname', response.data.data.user.firstname);
      localStorage.setItem('lastname', response.data.data.user.lastname);
      localStorage.setItem(USER_ROLE, response.data.data.user.role);
      localStorage.setItem(USER_ID, response.data.data.user.id);
      localStorage.setItem(TOKEN, response.data.data.token);
      return response.data;
    } catch (e) {
      toast.error(e.message);
    }
  };

  const signUp = async (newAccount) => {
    const firstname = newAccount.firstname;
    const lastname = newAccount.lastname;
    const telephone = newAccount.telephone;
    const email = newAccount.email;
    const password = newAccount.password;

    try {
      const response = await signUpAPI(firstname, lastname, telephone, email, password);
      localStorage.setItem(USER_ID, response.data.data.user.id);
      return response;
    } catch (e) {
      toast.error(e.message);
    }
  };

  const updateUserRecommends = async (
    id,
    selectedProductTypes,
    selectedCurrencies,
    selectedCountries
  ) => {
    try {
      return await updateUserRecommendsAPI(
        id,
        selectedProductTypes,
        selectedCurrencies,
        selectedCountries
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  const updateUserData = async (id, firstname, lastname, telephone, email) => {
    try {
      const response = await updateUserDataAPI(id, firstname, lastname, telephone, email);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getUserData = useCallback(async () => {
    try {
      const response = await getUserInfoAPI();
      setUserData(response.data.data);
      setRole(response.data.data.user.role);
      localStorage.setItem(USER_ROLE, response.data.data.user.role);
      localStorage.setItem('firstname', response.data.data.user.firstname);
      localStorage.setItem('lastname', response.data.data.user.lastname);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }, []);

  const logOut = async () => localStorage.clear();

  return {
    isLogged,
    role,
    userData,
    signIn,
    logOut,
    signUp,
    updateUserRecommends,
    updateUserData,
    getUserData,
  };
}
