import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import { useInterval } from '../../tools/interval';
import APYSkeleton from "./APYSkeleton";

const BluePanel = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.style.blueBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.headerFont};
  padding: 5.3rem .7rem 5.5rem .7rem;
  margin-right: .5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: .5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  
  

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.3rem;
  }

  @media(max-width: 1107px) {
    padding: 3.65rem .7rem 7.6rem 1.5rem;
    margin-right: 0px;
    h1 {
      font-size:2.2rem;
      position: relative;
      top:1.2rem;
    }
    span {
      font-size:1.1rem;
      position: relative;
      top:1.2rem;
    }
  }
`;

const APY = ({ state,setState }) => {
  const [pools, setPools] = useState([]);
  const [summaries, setSummaries] = useState([]);

  

  useEffect(() => {
    getPools();
    setSummaries(state.summaries);
  }, [state.summaries]);

  useEffect(() => {
    calcApy();
  }, [summaries]);
  

  const getPools = async () => {
    const poolsData = await fetch(
      "https://api-ui.harvest.finance/pools?key=41e90ced-d559-4433-b390-af424fdc76d6",
    );
    setPools(await poolsData.json());
  };

  const calcApy = () => {
    for (let i = 0; i < pools.length; i++) {
      if (pools[i].id === "profit-sharing-farm") {
        setState({...state,apy: pools[i].rewardAPY})
      }
    }
  };
  const [display,setDisplay]=useState(false);
  const [delay,setDelay] = useState(2200);
  useInterval(() => {
    setDisplay(true)
  }, delay)

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {display ? <BluePanel>
        <h1>{state.apy} %</h1>
        <span>Profit Share APY</span>
      </BluePanel> :
        <APYSkeleton state={state} />}
    </ThemeProvider>
  );
};

export default APY;
