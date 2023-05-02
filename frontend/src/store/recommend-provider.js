import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import {
  aboutUsListAPI,
  countryListAPI,
  currencyListAPI,
  instrumentsListAPI,
  majorSectorListAPI,
  minorSectorListAPI,
  postListAPI,
  productTypesListAPI,
  regionListAPI,
  riskRatingListAPI,
} from '../api/investApi';

const ContextProps = {
  isLoading: false,
  productTypesList: [],
  currenciesList: [],
  countriesList: [],
  riskRatingList: [],
  instrumentList: [],
  majorSectorList: [],
  minorSectorList: [],
  regionList: [],
  aboutUsList: [],
  postList: [],
  getProductTypesList: () => {},
  getCurrenciesList: () => {},
  getCountriesList: () => {},
  getRiskRatingList: () => {},
  getInstrumentsList: () => {},
  getMajorSectorList: () => {},
  getMinorSectorList: () => {},
  getRegionList: () => {},
  getAboutUsList: () => {},
  getPostList: () => {},
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
  const [riskRatingList, setRiskRatingList] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);
  const [majorSectorList, setMajorSectorList] = useState([]);
  const [minorSectorList, setMinorSectorList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [aboutUsList, setAboutUsList] = useState([]);
  const [postList, setPostList] = useState([]);

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

  const getRiskRatingList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await riskRatingListAPI();
      setLoading(false);
      setRiskRatingList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getInstrumentsList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await instrumentsListAPI();
      setLoading(false);
      setInstrumentList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getMajorSectorList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await majorSectorListAPI();
      setLoading(false);
      setMajorSectorList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getMinorSectorList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await minorSectorListAPI();
      setLoading(false);
      setMinorSectorList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getRegionList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await regionListAPI();
      setLoading(false);
      setRegionList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getAboutUsList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await aboutUsListAPI();
      setLoading(false);
      setAboutUsList(res.data.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const getPostList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await postListAPI();
      setLoading(false);
      setPostList(res.data.data);
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
    riskRatingList,
    instrumentList,
    majorSectorList,
    minorSectorList,
    regionList,
    aboutUsList,
    postList,
    getProductTypesList,
    getCurrenciesList,
    getCountriesList,
    getRiskRatingList,
    getInstrumentsList,
    getMajorSectorList,
    getMinorSectorList,
    getRegionList,
    getAboutUsList,
    getPostList,
  };
}
