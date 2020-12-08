import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import harvest from "../../lib/index.js";
const { utils,ethers } = harvest;

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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 2rem;
    font-family: ${fonts.contentFont};
    .button {
      margin-left: 1rem;
      font-size: 1.5rem;
      padding: .3rem 1rem;
      font-family: ${fonts.headerFont};
    }
    @media(max-width:1340px) {
      font-size: 1.6rem
    }
    @media(1340px) {
      font-size: 1.6rem
    }

   
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

    .harvest and stake {
      
    }
  button {
    width: max-content;
    font-size: 2rem;
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

  const harvest  = async () => {
    console.log("harvesting");
    
    
    await state.manager.getRewards(ethers.utils.parseUnits((state.minimumHarvestAmount), 18))
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          });
          setState({...state,minimumHarvestAmount: 0})
  }



  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <Panel>
         
      <div className='panel-text'>
        <p>
          Harvest all with at least
          <input
            type="number"
            onChange={(event) => setState({...state,minimumHarvestAmount :event.target.value})}
            placeholder="min"
            value={state.minimumHarvestAmount}
            step="any"
          />
          FARM 
        </p>
        {state.minimumHarvestAmount === 0 ? "" :  <button
          className="button clear"
          onClick={(event) => setState({...state,minimumHarvestAmount :0})}
        >
          clear
        </button>}
      </div>
      

      <ButtonContainer>
         <button
          className="button"
          disabled={!state.provider || state.minimumHarvestAmount === 0}
          onClick={harvest}
        >
          harvest all
        </button>

        <button
          className="button harvest-and-stake"
          disabled={!state.provider || state.minimumHarvestAmount === 0}
          onClick={harvest}
        >
          harvest all and stake
        </button>

       
      </ButtonContainer>
      
      
    </Panel>
       
    </ThemeProvider>
  );
};

export default Harvest;
