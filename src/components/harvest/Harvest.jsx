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

   
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;

 
  button {
    font-size: 1.9rem;
    font-family: ${fonts.headerFont};
    position: relative;
    margin-top: 4px;
    margin-right: .5rem;
    
    &:hover {
      top: 1.5px;
    }

    .button.clear {
      margin-left: 1rem;
    }

    
  }
  
    
  }
`;

const Harvest = ({ state,setState }) => {
  const harvest = async () => {
    const minHarvest = ethers.utils.parseUnits(
      state.minimumHarvestAmount.toString(),
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
      <Panel>
         
      <div className='panel-text'>
        <p>
          Harvest all farms with at least
          <input
            type="number"
            onChange={(event) => setState({...state,minimumHarvestAmount :event.target.value})}
            placeholder="min"
            value={state.minimumHarvestAmount}
            step="any"
          />
          FARM rewards
        </p>
      </div>
      

      <ButtonContainer>
        <button
          className="button"
          disabled={!state.provider || state.minimumHarvestAmount === 0}
          onClick={harvest}
        >
          harvest all
        </button>

       {state.minimumHarvestAmount === 0 ? "" :  <button
          className="button clear"
          onClick={(event) => setState({...state,minimumHarvestAmount :0})}
        >
          clear
        </button>}
      </ButtonContainer>
      
      
    </Panel>
       
    </ThemeProvider>
  );
};

export default Harvest;
