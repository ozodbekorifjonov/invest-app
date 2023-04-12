import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ideaListAPI } from '../api/investApi';

const ContextProps = {
  isLoading: false,
  ideasList: [],
  getIdeasList: () => {},
};

const IdeaContext = createContext(ContextProps);

export function ProvideIdeas({ children }) {
  const ideas = useProvideIdeas();

  return React.createElement(IdeaContext.Provider, { value: ideas }, children);
}

export const useIdeas = () => useContext(IdeaContext);

function useProvideIdeas() {
  const [isLoading, setLoading] = useState(false);
  const [ideasList, setIdeasList] = useState([]);

  const getIdeasList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ideaListAPI();
      setLoading(false);
      setIdeasList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    ideasList,
    getIdeasList,
  };
}
