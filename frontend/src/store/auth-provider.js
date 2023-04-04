import React, { createContext, useCallback, useContext, useState } from 'react';
import { ROLE_ADMIN } from '../consts';
import { signInAPI, signUpAPI } from '../api/investApi';
import { toast } from 'react-toastify';

const ContextProps = {
  isLogged: false,
  role: ROLE_ADMIN,
  signIn: (email, password) => {},
  signUp: (newAccount) => {},
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
      return await signUpAPI(firstname, lastname, telephone, email, password);
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
    getUserData,
  };
}
