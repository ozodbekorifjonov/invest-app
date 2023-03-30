import React, { createContext, useCallback, useContext, useState } from "react";
import { ROLE_CLIENT } from "../consts";

const ContextProps = {
  isLogged: false,
  role: ROLE_CLIENT,
  signIn: (email, pin, adrnr) => {},
  logOut: () => {},
  getUserData: () => {},
};

const AuthContext = createContext(ContextProps);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return React.createElement(AuthContext.Provider, { value: auth }, children);
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth(props) {
  const [isLogged, setLogged] = useState(ContextProps.isLogged);
  const [role, setRole] = useState(ContextProps.role);
  const signIn = async (email, pin) => {
    return null;
  };

  const getUserData = useCallback(async () => {}, []);

  const logOut = async () => {};

  return {
    isLogged,
    role,
    signIn,
    logOut,
    getUserData,
  };
}
