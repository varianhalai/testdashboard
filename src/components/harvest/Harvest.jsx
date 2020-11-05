import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import HarvestSkeleton from './HarvestSkeleton'
import harvest from "../../lib/index.js";
const { ethers } = harvest;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  
  input[type="number"] {
    margin: 0 1rem;
  }

  @media only screen and (max-width: 990px) {
    margin-bottom: 1.5rem;
  }

  .panel-text {
    width: 100%;
    font-size: 2.7rem;
    display: flex;
    justify-content: flex-end;
    font-family: ${fonts.contentFont};

    @media(max-width: 1964px) {
      font-size: 2.5rem;
    }
    @media(max-width: 1716px) {
      font-size: 2.45rem;
    }
    @media(max-width: 1590px) {
      font-size: 2.25rem;
    }
    @media(max-width: 1498px) {
      font-size: 2.0rem;
    }
    @media(max-width: 1384px) {
      font-size: 1.80rem;
    }
    @media(max-width: 1134px) {
      font-size: 1.5rem;
    }
    @media(max-width: 1002px) {
      font-size: 2.25rem;
      
    }
    @media(max-width: 960px) {
      font-size: 2rem;
      justify-content: center;
      text-align: center;

    }
    @media(max-width: 680px) {
      font-size: 2rem;
    }
    @media(max-width: 628px) {
      font-size: 1.8rem;
    }
    @media(max-width: 580px) {
      font-size: 1.5rem;
    }
    @media(max-width: 500px) {
      font-size: 1.7rem;   
    }
    
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.6rem;
  button {
    font-family: ${fonts.headerFont};
    font-size: 1.9em;
    position: relative;
    margin-top: 4px;
    &:hover {
      top: 1.5px;
    }
  }
  @media(max-width: 960px) {
    justify-content: center;
    button {
      font-size: 1.6rem;
    }
    
  }

  @media(max-width: 680px) {
    button {
      font-size: 1.3rem;
    }
  }
`;

const Harvest = ({ state }) => {
  const [minimumHarvestAmount, setMinimumHarvestAmount] = useState(0);
  const [display,setDisplay]=useState(false);
  const [delay,setDelay] = useState(2200);

  const harvest = async () => {
    const minHarvest = ethers.utils.parseUnits(
      minimumHarvestAmount.toString(),
      18,
    );
    const activePools = state.manager.pools.filter((pool) => {
      return pool.isActive();
    });

    for (let i = 0; i < activePools.length; i++) {
      const earned = await activePools[i].earnedRewards(state.address);

      if (earned.gt(minHarvest)) {
        await activePools[i]
          .getReward()
          .catch((e) => console.log("Rejected Transaction"));
      }
    }
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ?
      <Panel>
         
      <div className='panel-text'>
        <p>
          Harvest all farms with at least
          <input
            type="number"
            onChange={(event) => setMinimumHarvestAmount(event.target.value)}
            placeholder="min"
            step="any"
          />
          FARM rewards
        </p>
      </div>
      

      <ButtonContainer>
        <button
          className="button"
          disabled={!state.provider || minimumHarvestAmount === 0}
          onClick={harvest}
        >
          harvest all
        </button>
      </ButtonContainer>
    </Panel>  : <HarvestSkeleton state={state} /> }
       
    </ThemeProvider>
  );
};

export default Harvest;
