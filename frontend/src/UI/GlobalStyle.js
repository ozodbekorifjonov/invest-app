import { createGlobalStyle } from 'styled-components';

import bold from './fonts/SourceSansPro-Bold.ttf';
import light from './fonts/SourceSansPro-Light.ttf';
import regular from './fonts/SourceSansPro-Regular.ttf';
import semibold from './fonts/SourceSansPro-SemiBold.ttf';
// "SourceSansPro" does not use Normal/Regular 500 as font weight, instead it uses Regular 400 and Light 300

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SourceSansPro';
    font-style: normal;
    font-weight: 400;
    src: url(${regular}) format('truetype');
  }

  @font-face {
    font-family: 'SourceSansPro';
    font-style: normal;
    font-weight: 300;
    src: url(${light}) format('truetype');
  }

  @font-face {
    font-family: 'SourceSansPro';
    font-style: normal;
    font-weight: 600;
    src: url(${semibold}) format('truetype'),
  }

  @font-face {
    font-family: 'SourceSansPro';
    font-style: normal;
    font-weight: 700;
    src: url(${bold}) format('truetype');
  }

  body {
    background: rgb(255, 255, 255);
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: SourceSansPro, Open-Sans, Sans-Serif, serif;
    font-weight: 400;
    font-size: 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }

  img {
    height: auto;
    user-select: none;
  }

  button {
    font-family: SourceSansPro, Open-Sans, Sans-Serif, serif;
    cursor: pointer;
    color: inherit;
  }

  form {
    font-family: SourceSansPro, Open-Sans, Sans-Serif, serif;
  }

  a, button {
    touch-action: manipulation;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    object-fit: contain;
  }

  .user-page .logo {
    width: 100%;
  }

  .app-form-control {
    width: -webkit-fill-available;
    margin-bottom: 10px;
  }

  .app-form-control input, select {
    padding: 15px 25px;
    display: block;
    background: 0 0;
    font-size: 15px;
    color: rgb(85, 85, 85);
    line-height: 1.2;
    width: inherit;
    border: 1px solid #e6e6e6;
    outline: none;
  }

  .app-form-control input::placeholder {
    color: #666;
  }

  .app-form-control input:focus {
    border: 1px solid #666;
  }

  .app-form-button {
    text-align: center;
    padding: 17px 15px;
    font-size: 15px;
    line-height: 1.2;
    color: #fff;
    text-transform: uppercase;
    border: none;
  }

  .app-form-button-sm {
    text-align: center;
    padding: 8px 16px;
    font-size: 15px;
    line-height: 1.2;
    color: #fff;
    border: none;
  }

  .app-button-primary {
    background-color: #0336FF;
  }

  .app-button-success {
    background-color: #41c300;
    color: #040001;
  }

  .app-button-danger {
    background-color: #ff0266;
    color: #040001;
  }

  .app-button-warning {
    background-color: #ffde03;
    color: #040001;
  }
  
  .admin-layout-left {
    position: fixed;
    width: 18%;
  }
  
  .admin-layout-right {
    position: relative;
    left: 18%;
    width: 82%;
  }
`;

export default GlobalStyle;
