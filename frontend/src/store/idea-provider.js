import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ideaDetailsAPI, ideaListAPI } from '../api/investApi';

const ContextProps = {
  isLoading: false,
  ideasList: [],
  ideaDetails: null,
  getIdeasList: () => {},
  getIdeaDetails: () => {},
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
  const [ideaDetails, setIdeaDetails] = useState(null);

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

  const getIdeaDetails = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await ideaDetailsAPI(id);
      console.log(res);
      setLoading(false);
      setIdeaDetails(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    ideasList,
    ideaDetails,
    getIdeasList,
    getIdeaDetails,
  };
}
