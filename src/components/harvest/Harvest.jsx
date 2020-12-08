import React, { useState,useContext } from "react";
import HarvestContext from '../../Context/HarvestContext';
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import harvest from "../../lib/index.js";
import web3 from '../../lib/web3';
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
    -moz-appearance: textfield;
    background-color: ${(props) => props.theme.style.lightBackground};
    border: 0.2rem solid #363636;
    font-size: 1.4rem;
    margin: 0 1rem;
    color: ${(props) => props.theme.style.primaryFontColor};
    width: 12rem;
    text-align: center;
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
    @media(max-width: 1400px) {
      width: 6rem;
    }
    @media(max-width: 1280px) {
      width: 5rem;
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
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
  width: 80%;
  margin: 1.5rem auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
 

    
  button {
    margin-left: 6rem;
    width: max-content;
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    position: relative;
    margin-top: 4px;
    
    
    &:hover {
      top: 1.5px;
    }
    &.harvest-and-stake {
      margin-left: 5%;
    }

    .button.clear {
      margin-left: 1rem;
    }

    
  }
  
    
  }
`;

const Harvest = () => {
  const { state,setState,unstakedFarm,setUnstakedFarm,openModal } = useContext(HarvestContext)

  const [modal,setModal] = useState({
    open: false,
    message: '',
    noFarm: true
  })
  const harvest  = async () => {
    console.log("harvesting");
    
    await state.manager.getRewards(ethers.utils.parseUnits((state.minimumHarvestAmount), 18))
          .catch(err => {
            console.log(err)
          })
          setState({...state,minimumHarvestAmount: 0})
  }

  const pool = state.manager.pools.find((pool) => {
    return pool.address === "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50";
  });
 

  const stake = async (toStake) => {
    if(toStake === 0) {
      (setModal({...modal,open: true,
        message: "Please enter an amount to stake!",
        noFarm: false}))
    }else {
      const allowance = await pool.lptoken.allowance(state.address, pool.address);
      const amount =
        toStake > 0
          ? ethers.utils.parseUnits(toStake.toString(), 18)
          : await pool.unstakedBalance(state.address);
  
      if (allowance.lt(amount)) {
        await pool.lptoken.approve(pool.address, ethers.constants.MaxUint256);
        await pool.stake(amount);
      } else {
        await pool.stake(amount).catch((e) => {
          if (e.code !== 4001 || e.code !== -32603) {
            openModal(
              `You do not have enough to stake ${ethers.utils.formatEther(
                amount,
              )} FARM`,
              "error",
            );
          }
        });
      }
    }
    
   
  };

  const getTotalFarmEarned = () => {
    
      state.summaries.map(utils.prettyPosition).map((summary, index) => {
        if(summary.name === "FARM Profit Sharing") {
          console.log(summary)
          setUnstakedFarm(parseFloat(summary.unstakedBalance))
        }
      })
     
     console.log(unstakedFarm)
     stake(unstakedFarm)
   }
  
  const harvestAllAndStake = () => {
    harvest();
    console.log(unstakedFarm)
    const timer = setTimeout(() => {
      getTotalFarmEarned()
    }, 90000);
    return () => clearTimeout(timer);
    
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
          
          onClick={harvestAllAndStake}
        >
          harvest all and stake in FARM pool
        </button>

       
      </ButtonContainer>
      
      
    </Panel>
       
    </ThemeProvider>
  );
};

export default Harvest;
