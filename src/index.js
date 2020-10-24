import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import * as serviceWorker from "./serviceWorker";
import { BaseCSS } from "styled-bootstrap-grid";

// Fonts
import DDIN from "./assets/fonts/DDIN-Bold.ttf";
import TechnaSans from "./assets/fonts/TechnaSans-Regular.otf";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    /* 1rem = 10px */
    font-size: 62.5%;
  }

  @font-face {
    font-family: 'DDIN';
    src: local('DDIN'), local('DDIN'),
    url(${DDIN}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'TechnaSans';
    src: local('TechnaSans'), local('TechnaSans'),
    url(${TechnaSans}) format('opentype');
    font-weight: 300;
    font-style: normal;
  }

  body {
    margin: 0;
    background-color: #000000;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  input[type="button"]:focus, button:focus {
      outline: none;
  }

  .button {
    background: #C78170;
    border: 3px solid #363636;
    box-sizing: border-box;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: TechnaSans;
    color: #1d1d1d;
    font-size: 1.6rem;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BaseCSS />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
