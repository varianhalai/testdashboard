import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
${reset}

@import url('https://rsms.me/inter/inter.css');
html { font-family: 'Inter', sans-serif; }
@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}
 
body {
  margin: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

p {
  font-size: 1em;
}

div.menu {
    width: calc(100vw - 40px);
    display: flex;
    padding: 10px 20px;
    margin-bottom: 50px;
}

div.menu--logo {
    display: flex;
    align-items: center;
    font-size: 12px;
}
div.menu img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
}

table {
  font-size: 16px;
}

div#table-container {
    border: 1px solid #e5e7eb;
  border-radius: 4px;
  -webkit-box-shadow: 0px 9px 28px 8px rgba(0,0,0,0.05);
-moz-box-shadow: 0px 9px 28px 8px rgba(0,0,0,0.05);
box-shadow: 0px 9px 28px 8px rgba(0,0,0,0.05);
margin: 20px 0;
max-width: calc(100vw - 20px);
overflow-x: auto;
}

div#summaries {
    width: max-content;
    border-bottom: 1px solid #e5e7eb;
}


div#summaries--header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr 2fr 1fr 1fr 1fr;
  padding: 10px 15px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 300;
  font-size: 13px;
  text-align: left;
}

div#summaries--row  {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr 2fr 1fr 1fr 1fr;
  font-size: 14px;
  padding: 15px;
  background-color: white;
  text-align: left;
}

div#underlying--header {
    display: grid;
    grid-template-columns: 1fr 1fr;
  padding: 10px 15px;
  font-weight: 300;
  font-size: 13px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

div#underlying--row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 14px;
  padding: 15px;
  background-color: white;
  text-align: left;
}

#table--total {
    background-color: white;
  font-size: 14px;
  padding: 10px 0;
}

button {
  background-color: #109020;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px;
  margin: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
    background-color: #6336ff;
    font-size: 14px;
    cursor: pointer;
}

button:disabled {
  display: none;
}

input[type="button"]:focus, button:focus {
    outline: none;
}

#address {
  text-decoration: underline;
  font-size: 1em;
}

input {
  font-size: 0.7em;
  text-align: center;
  width: 65px;
}

input[type="text"] {
    font-weight: 600;
    font-size: 1em;
    color: #6336ff;
    background: #FFFFFF;
    border: none;
    padding: 5px 0;
box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.159064);
border-radius: 8px;
}

input[type="text"]::placeholder {
    opacity: 1;
}

a {
  color: black;
}

img#logo {
    width: 100px;
    height: 100px;
}

@media only screen and (max-width : 768px) {
    div#summaries--header {
      grid-template-columns: 1.5fr 1fr 2fr 2fr 1fr 1fr 1fr;
    }
    div#summaries--row {
      grid-template-columns: 1.5fr 1fr 2fr 2fr 1fr 1fr 1fr;
    }
}
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
