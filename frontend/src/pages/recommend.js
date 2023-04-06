import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecommends } from '../store/recommend-provider';
import Loader from '../UI/Loader';
import { USER_ID } from '../consts';
import { useAuth } from '../store/auth-provider';
import { useNavigate } from 'react-router-dom';

const BoxDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  padding: 55px 85px;
  width: 35%;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 25px;
    color: #555;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 20px;
  }
`;

const BgDiv = styled.div`
  background-color: #ebebeb;
  width: 100%;
  height: 100vh;
`;

const RecDiv = styled.div`
  padding-bottom: 30px;
  color: #555;

  .line-box {
    display: flex;
    flex-wrap: wrap;
  }

  span {
    border: 1px solid #666;
    border-radius: 10px;
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: all linear 0.1s;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #ffde03;
      border: 1px solid #ffde03;
    }
  }

  .selected {
    background-color: #ffde03;
    border: 1px solid #ffde03;
  }
`;

const ImgStyle = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  margin-right: 4px;
`;

function Recommend() {
  const [selectedProductTypes, setProductTypes] = useState([]);
  const [selectedCurrencies, setCurrencies] = useState([]);
  const [selectedCountries, setCountries] = useState([]);
  const navigate = useNavigate();

  const {
    isLoading,
    productTypesList,
    currenciesList,
    countriesList,
    getProductTypesList,
    getCurrenciesList,
    getCountriesList,
  } = useRecommends();

  const { updateUserRecommends } = useAuth();

  useEffect(() => {
    getProductTypesList();
    getCurrenciesList();
    getCountriesList();
  }, [getProductTypesList, getCurrenciesList, getCountriesList]);

  const selectItem = (item, type) => {
    switch (type) {
      case 'product_type':
        if (selectedProductTypes.length > 0) {
          if (selectedProductTypes.filter((k) => k.id === item.id).length >= 1) {
            setProductTypes(selectedProductTypes.filter((k) => k.id !== item.id));
          } else {
            setProductTypes((oldArray) => [...oldArray, item]);
          }
        } else {
          setProductTypes((oldArray) => [...oldArray, item]);
        }
        break;
      case 'currency':
        if (selectedCurrencies.length > 0) {
          if (selectedCurrencies.filter((k) => k.id === item.id).length >= 1) {
            setCurrencies(selectedCurrencies.filter((k) => k.id !== item.id));
          } else {
            setCurrencies((oldArray) => [...oldArray, item]);
          }
        } else {
          setCurrencies((oldArray) => [...oldArray, item]);
        }
        break;
      case 'country':
        if (selectedCountries.length > 0) {
          if (selectedCountries.filter((k) => k.id === item.id).length >= 1) {
            setCountries(selectedCountries.filter((k) => k.id !== item.id));
          } else {
            setCountries((oldArray) => [...oldArray, item]);
          }
        } else {
          setCountries((oldArray) => [...oldArray, item]);
        }
        break;
    }
  };

  const handleUserRecommends = async () => {
    const userId = localStorage.getItem(USER_ID);
    const result = await updateUserRecommends(
      userId,
      selectedProductTypes,
      selectedCurrencies,
      selectedCountries
    );
    if (result.data.success) {
      navigate('/sign-in');
    }
  };

  return (
    <BgDiv>
      <BoxDiv>
        <h4>
          Profile set up <br /> to recommend ideas
        </h4>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <RecDiv>
              <h5>Select product types</h5>

              <div className="line-box">
                {productTypesList
                  ? productTypesList.map((item, index) => (
                      <span
                        onClick={() => selectItem(item, 'product_type')}
                        key={index}
                        className={`${
                          selectedProductTypes &&
                          selectedProductTypes.filter((i) => i.id === item.id).length > 0
                            ? 'selected'
                            : ''
                        }`}
                      >
                        {item.name}
                      </span>
                    ))
                  : null}
              </div>
            </RecDiv>
            <RecDiv>
              <h5>Select currency</h5>

              <div className="line-box">
                {currenciesList
                  ? currenciesList.map((item, index) => (
                      <span
                        onClick={() => selectItem(item, 'currency')}
                        key={index}
                        className={`${
                          selectedCurrencies &&
                          selectedCurrencies.filter((i) => i.id === item.id).length > 0
                            ? 'selected'
                            : ''
                        }`}
                      >
                        {item.title}
                      </span>
                    ))
                  : null}
              </div>
            </RecDiv>
            <RecDiv>
              <h5>Select country</h5>

              <div className="line-box">
                {countriesList
                  ? countriesList.map((item, index) => (
                      <span
                        onClick={() => selectItem(item, 'country')}
                        key={index}
                        className={`${
                          selectedCountries &&
                          selectedCountries.filter((i) => i.id === item.id).length > 0
                            ? 'selected'
                            : ''
                        }`}
                      >
                        <ImgStyle
                          src={`${process.env.REACT_APP_API_URL}images/${item.image}`}
                          alt={item.name}
                        />
                        {item.name}
                      </span>
                    ))
                  : null}
              </div>
            </RecDiv>
            <button
              onClick={handleUserRecommends}
              className="app-form-button app-button-primary w-100"
            >
              Submit
            </button>
          </>
        )}
      </BoxDiv>
    </BgDiv>
  );
}

export default Recommend;
