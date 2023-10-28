import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ideaDetailsAPI, ideaDetailsWithClientsAPI, ideaListAPI } from '../api/investApi';

const ContextProps = {
  isLoading: false,
  ideasList: [],
  ideaDetails: null,
  ideaDetailsWithClientsList: null,
  getIdeasList: () => {},
  getIdeaDetails: () => {},
  getIdeaDetailsWithClientsList: () => {},
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
  const [ideaDetailsWithClientsList, setIdeaDetailsWithClientsList] = useState(null);

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
      setLoading(false);
      setIdeaDetails(res.data.data);
      return res.data.data;
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getIdeaDetailsWithClientsList = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await ideaDetailsWithClientsAPI(id);
      setLoading(false);
      setIdeaDetailsWithClientsList(res.data.data);
      return res.data.data;
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    ideasList,
    ideaDetails,
    ideaDetailsWithClientsList,
    getIdeasList,
    getIdeaDetails,
    getIdeaDetailsWithClientsList,
  };
}
