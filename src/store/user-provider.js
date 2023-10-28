import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { usersListAPI } from '../api/investApi';

const ContextProps = {
  isLoading: false,
  usersList: [],
  getUsersList: () => {},
};

const UserContext = createContext(ContextProps);

export function ProvideUsers({ children }) {
  const users = useProvideUsers();

  return React.createElement(UserContext.Provider, { value: users }, children);
}

export const useUsers = () => useContext(UserContext);

function useProvideUsers() {
  const [isLoading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const getUsersList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await usersListAPI();
      setLoading(false);
      setUsersList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    usersList,
    getUsersList,
  };
}
