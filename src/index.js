import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import * as serviceWorker from "./serviceWorker";
import { BaseCSS } from "styled-bootstrap-grid";
import { darkTheme } from "./styles/appStyles";

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


  input[type="number"] {
    -moz-appearance: textfield;
    background-color: ${darkTheme.style.lightBackground};
    border: 0.2rem solid #363636;
    font-size: 1.4rem;
    color: #fff;
    width: 60px;
    text-align: center;
    border-radius: 0.5rem;
    margin: 0rem 1rem;
    padding: 0.3rem 0.7rem;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  .button {
    background: ${darkTheme.style.highlight};
    border: ${darkTheme.style.smallBorder};
    box-shadow: ${darkTheme.style.buttonBoxShadow};
    box-sizing: border-box;
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: TechnaSans;
    color: ${darkTheme.style.buttonFontColor};
    font-size: 1.4rem;

    &.ghost {
      background: transparent;
      border: 0px;
      box-shadow: none;
      color: ${darkTheme.style.highlight};
      padding: 0px;
    }
  }

  .spread-row {
    justify-content: space-between;
  }

  div[data-name="row"] {
    margin-bottom: 1.5rem;
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
