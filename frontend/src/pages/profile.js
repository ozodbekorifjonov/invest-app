import React, { useState } from "react";
import styled from "styled-components";

const PRODUCT_TYPES = [
  {
    id: 1,
    title: "Technology",
  },
  {
    id: 2,
    title: "Pharmacy",
  },
  {
    id: 3,
    title: "Idea",
  },
  {
    id: 4,
    title: "Skills",
  },
  {
    id: 5,
    title: "Blockchain",
  },
  {
    id: 6,
    title: "Insurance",
  },
  {
    id: 7,
    title: "Finance",
  },
];

const CURRENCIES = [
  {
    id: 1,
    title: "￡Pound sterling",
  },
  {
    id: 2,
    title: "$ USD",
  },
  {
    id: 3,
    title: "€ Euro",
  },
  {
    id: 4,
    title: "￥ Yen",
  },
];

const COUNTRIES = [
  {
    id: 1,
    title: "United Kingdom",
  },
  {
    id: 2,
    title: "USA",
  },
  {
    id: 3,
    title: "Germany",
  },
  {
    id: 4,
    title: "India",
  },
  {
    id: 5,
    title: "Uzbekistan",
  },
];

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
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: all linear 0.1s;

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

const TitleStyle = styled.div`
  h5 {
    color: #555;
  }
`;

function Profile() {
  const [selectedProductTypes, setProductTypes] = useState([]);
  const [selectedCurrencies, setCurrencies] = useState([]);
  const [selectedCountries, setCountries] = useState([]);

  const selectItem = (item, type) => {
    switch (type) {
      case "product_type":
        if (selectedProductTypes.length > 0) {
          if (
            selectedProductTypes.filter((k) => k.id === item.id).length >= 1
          ) {
            setProductTypes(
              selectedProductTypes.filter((k) => k.id !== item.id)
            );
          } else {
            setProductTypes((oldArray) => [...oldArray, item]);
          }
        } else {
          setProductTypes((oldArray) => [...oldArray, item]);
        }
        break;
      case "currency":
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
      case "country":
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 offset-2">
          <h4>Profile settings</h4>
          <div className="row">
            <div className="col-6">
              <RecDiv>
                <h5>Product types</h5>

                <div className="line-box">
                  {PRODUCT_TYPES
                    ? PRODUCT_TYPES.map((item, index) => (
                        <span
                          onClick={() => selectItem(item, "product_type")}
                          key={index}
                          className={`${
                            selectedProductTypes &&
                            selectedProductTypes.filter((i) => i.id === item.id)
                              .length > 0
                              ? "selected"
                              : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      ))
                    : null}
                </div>
              </RecDiv>
              <RecDiv>
                <h5>Currency</h5>

                <div className="line-box">
                  {CURRENCIES
                    ? CURRENCIES.map((item, index) => (
                        <span
                          onClick={() => selectItem(item, "currency")}
                          key={index}
                          className={`${
                            selectedCurrencies &&
                            selectedCurrencies.filter((i) => i.id === item.id)
                              .length > 0
                              ? "selected"
                              : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      ))
                    : null}
                </div>
              </RecDiv>
              <RecDiv>
                <h5>Country</h5>

                <div className="line-box">
                  {COUNTRIES
                    ? COUNTRIES.map((item, index) => (
                        <span
                          onClick={() => selectItem(item, "country")}
                          key={index}
                          className={`${
                            selectedCountries &&
                            selectedCountries.filter((i) => i.id === item.id)
                              .length > 0
                              ? "selected"
                              : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      ))
                    : null}
                </div>
              </RecDiv>
            </div>
            <div className="col-5">
              <TitleStyle>
                <h5>Credentials</h5>
              </TitleStyle>
              <div>
                <form>
                  <div className="app-form-control">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="app-form-control">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="app-form-control">
                    <input name="email" type="email" placeholder="Email" />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-3 offset-8">
              <button className="app-form-button">Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
