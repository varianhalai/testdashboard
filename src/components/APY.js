import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

const BluePanel = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.style.blueBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.4rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const APY = ({ state }) => {
  console.log("state apy", state);
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <BluePanel>APY</BluePanel>
    </ThemeProvider>
  );
};

export default APY;
