import React, { createContext, useCallback, useContext, useState } from 'react';
import { ROLE_ADMIN, USER_ID } from '../consts';
import { signInAPI, signUpAPI, updateUserRecommendsAPI } from '../api/investApi';
import { toast } from 'react-toastify';

const ContextProps = {
  isLogged: false,
  role: ROLE_ADMIN,
  signIn: (email, password) => {},
  signUp: (newAccount) => {},
  updateUserRecommends: (id, selectedProductTypes, selectedCurrencies, selectedCountries) => {},
  logOut: () => {},
  getUserData: () => {},
};

const AuthContext = createContext(ContextProps);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return React.createElement(AuthContext.Provider, { value: auth }, children);
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [isLogged, setLogged] = useState(ContextProps.isLogged);
  const [role, setRole] = useState(ContextProps.role);
  const signIn = async (email, password) => {
    try {
      const res = await signInAPI(email, password);
      console.log(res);
      setLogged(true);
      setRole(res.data.user.role);
      return res;
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
      localStorage.setItem(USER_ID, response.data.user.id);
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

  const getUserData = useCallback(async () => {}, []);

  const logOut = async () => {};

  return {
    isLogged,
    role,
    signIn,
    logOut,
    signUp,
    updateUserRecommends,
    getUserData,
  };
}
