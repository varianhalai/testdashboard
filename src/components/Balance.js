import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";
import harvest from "../lib/index.js";

const { ethers, utils } = harvest;

const BluePanel = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.style.blueBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.headerFont};
  margin-right: .5rem;
  padding: 3.65rem .7rem 3.59rem .7rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: .5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media(max-width: 980px) {
    padding: 3.65rem .7rem 3.59rem 1.5rem;
    margin-right: 0px;
    margin-top: 1rem
  }
  
  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.3rem;
  }
`;

const Balance = ({ state }) => {
  const [userBalance, setUserBalance] = useState(ethers.BigNumber.from(0));

  useEffect(() => {
    balance();
  }, [state.summaries]);

  const balance = () => {
    let ub = ethers.BigNumber.from(0);

    for (let i = 0; i < state.summaries.length; i++) {
      ub = ub.add(state.summaries[i].summary.usdValueOf);

      setUserBalance(ub);
    }
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <BluePanel>
        <h1>{utils.prettyMoney(userBalance)}</h1>
        <span>Staked Balance</span>
      </BluePanel>
    </ThemeProvider>
  );
};

export default Balance;
