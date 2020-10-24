import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import * as serviceWorker from "./serviceWorker";
import { BaseCSS } from 'styled-bootstrap-grid';

// Fonts
import DDIN from "./assets/fonts/DDIN-Bold.ttf";
import TechnaSans from "./assets/fonts/TechnaSans-Regular.otf";

const GlobalStyle = createGlobalStyle`
${reset}
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
  url(${TechnaSans}) format('truetype');
  font-weight: 300;
  font-style: normal;
}

body {
  margin: 0;
  background-color: #000000;
  font-family: TechnaSans;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

input[type="button"]:focus, button:focus {
    outline: none;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <BaseCSS />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
