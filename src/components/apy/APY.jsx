import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import axios from 'axios';
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
    padding: 3.65rem .7rem 6.6rem 1.5rem;
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

  

  // useEffect(() => {
  //   if(pools.length === 0) {
  //     getPools();
  //     setSummaries(state.summaries);
  //   } 
  //   if(pools.length > 0) {
  //     calcApy()
  //   }
    
    
  // }, [state.usdValue]);

  // useEffect(() => {
  //   if(pools.length > 0) {
  //     calcApy()
  //   }
    
    
  // }, [state.display]);
  

  // const getPools = async () => {
  //   const poolsData = await axios.get(
  //     "https://api-ui.harvest.finance/pools?key=41e90ced-d559-4433-b390-af424fdc76d6",
  //   ).then(res => {
  //     console.log(res.data)
  //     setPools(res.data);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
    
    
    
  // };

  // const calcApy = () => {
    
  //     setState((state) => ({ ...state,apy: pools[0].rewardAPY}));
    
    
    
  // };
  

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ? <BluePanel>
        <h1>{state.apy} %</h1>
        <span>Profit Share APY</span>
      </BluePanel> :
        <APYSkeleton state={state} />}
    </ThemeProvider>
  );
};

export default APY;
