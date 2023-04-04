import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { countryListAPI, currencyListAPI, productTypesListAPI } from '../api/investApi';

const ContextProps = {
  isLoading: false,
  productTypesList: [],
  currenciesList: [],
  countriesList: [],
  getProductTypesList: () => {},
  getCurrenciesList: () => {},
  getCountriesList: () => {},
};

const RecommendContext = createContext(ContextProps);

export function ProvideRecommends({ children }) {
  const recommends = useProvideRecommends();

  return React.createElement(RecommendContext.Provider, { value: recommends }, children);
}

export const useRecommends = () => useContext(RecommendContext);

function useProvideRecommends() {
  const [isLoading, setLoading] = useState(false);
  const [productTypesList, setProductTypesList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  const getProductTypesList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await productTypesListAPI();
      setLoading(false);
      setProductTypesList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getCurrenciesList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await currencyListAPI();
      setLoading(false);
      setCurrenciesList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getCountriesList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await countryListAPI();
      setLoading(false);
      setCountriesList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    productTypesList,
    currenciesList,
    countriesList,
    getProductTypesList,
    getCurrenciesList,
    getCountriesList,
  };
}
