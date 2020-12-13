import React, { useState,useContext } from "react";
import HarvestContext from '../../Context/HarvestContext';
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import harvest from "../../lib/index.js";
const { utils,ethers } = harvest;




const Harvest = () => {
  const { state,setState,unstakedFarm,setUnstakedFarm,setHarvestingMessage, harvestAndStakeMessage, setHarvestAndStakeMessage } = useContext(HarvestContext)

 

  const [isHarvesting,setHarvesting]=useState(false);

  
  
  const harvest  = async () => {
    
    setHarvesting(true)
    setState({...state,minimumHarvestAmount: "0"})
    
      console.log("harvesting");
    
      
      setHarvestingMessage("Harvesting your rewards.")
      await state.manager
      .getRewards(ethers.utils.parseUnits((state.minimumHarvestAmount), 18))
      .then(async vals => {
        let i = 0;
        while(i < vals.length) {
          await vals[i].getReward.wait()
          i++;
        }
        
        
      }) 
      .catch(err => {
        
        if(err.code === 4001) {
          console.log("Transaction rejected.")
        }
      })
  
      setHarvestingMessage("")
      setHarvesting(false)
          
          
  }

  const pool = state.manager.pools.find((pool) => {
    return pool.address === "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50";
  });
  
 

  const stake = async (toStake) => {
      const allowance = await pool.lptoken.allowance(state.address, pool.address);
      const amount = ethers.utils.parseUnits(toStake.toString(), 18);
      if (allowance.lt(amount)) {
        await pool.lptoken.approve(pool.address, ethers.constants.MaxUint256);
         pool.stake(amount).then(res => {
           console.log(res)
         })
         .catch(err => {
           console.log(err)
         });
      } 
else {
        await pool.stake(amount).catch((e) => {
          if (e.code !== 4001 || e.code !== -32603) {
            console.log(`You do not have enough to stake ${ethers.utils.formatEther(
              amount,
            )} FARM`);
          }
        });
      }
  };

  const getFarmToStake = () => {
    
      state.summaries.map(utils.prettyPosition).map((summary, index) => {
        if(summary.name === "FARM Profit Sharing") {
          setUnstakedFarm(summary.unstakedBalance)
          stake(unstakedFarm)
          .then(res => {
            setHarvesting(false)
            console.log(unstakedFarm)
            const timer = setTimeout(() => {
              setHarvestAndStakeMessage({...harvestAndStakeMessage,first: ``,second: ""})
            }, 3500);
            return () => clearTimeout(timer);
          })
          .catch(err => {
            console.log(err)
            setHarvestAndStakeMessage({...harvestAndStakeMessage,first: `An error occurred while staking`,second: ""})
            setHarvesting(false)
            const timer = setTimeout(() => {
              setHarvestAndStakeMessage({...harvestAndStakeMessage,first: ``,second: ""})
            }, 3500);
            return () => clearTimeout(timer);
            
          })
        }
      })
      
     
     
   }
  
  const harvestAllAndStake = async () => {
    console.log("harvesting");
    setHarvesting(true)
    setHarvestAndStakeMessage({...harvestAndStakeMessage,first: "Harvesting your rewards and staking.",second: "This could take a while"})
     await state.manager.getRewards(ethers.utils.parseUnits((state.minimumHarvestAmount), 18))
          .then(async vals => {
            let i = 0;
            while(i < vals.length) {
              await vals[i].getReward.wait()
              i++;
            }
            setHarvestAndStakeMessage({...harvestAndStakeMessage,first: "Staking your FARM",second: ""})
          }) 
          .catch(err => {
            console.log(err)
          })
          setState({...state,minimumHarvestAmount: "0"})
          
          
          getFarmToStake()
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
        {state.minimumHarvestAmount === "0" ? "" :  <button
          className="button clear"
          onClick={(event) => setState({...state,minimumHarvestAmount :"0"})}
        >
          clear
        </button>}
      </div>
      

      <ButtonContainer>
        {isHarvesting ? 
        <HarvestingButton>
          harvest all
        </HarvestingButton> 
        : 
        <button
        className="buttons"
        onClick={harvest}>
        harvest all
      </button> }
        {isHarvesting ? 
        <HarvestingButton>
        harvest all and stake in FARM pool
      </HarvestingButton> 
        :
        <button
          className="buttons harvest-and-stake"
          onClick={harvestAllAndStake}>
          harvest all and stake in FARM pool
        </button>}

       
      </ButtonContainer>
      
      
    </Panel>
       
    </ThemeProvider>
  );
};

export default Harvest;


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
 

    
  .buttons {
    margin-left: 6rem;
    width: max-content;
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    color: ${(props) => props.theme.style.buttonFontColor};
    position: relative;
    margin-top: 4px;
    background: ${(props) => props.theme.style.highlight};
    border: ${(props) => props.theme.style.smallBorder};
    box-shadow: ${(props) => props.theme.style.buttonBoxShadow};
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    
    
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

const HarvestingButton = styled.button`
  margin-left: 6rem;
  width: max-content;
  font-size: 2rem;
  font-family: ${fonts.headerFont};
  position: relative;
  margin-top: 4px;
  background-color: ${(props) => props.theme.style.blueBackground};
  border: ${(props) => props.theme.style.smallBorder};
  box-shadow: ${(props) => props.theme.style.buttonBoxShadow};
  border-radius: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: none;
  color: ${(props) => props.theme.style.buttonFontColor};
  overflow: hidden;
  z-index: 300;
  &::before {
    content: '';
    position: relative;
    left: -50px;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, transparent 10%, ${(props) => props.theme.style.blueBackground} 50%, transparent 100%);
    animation: waiting 1.8s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
  }

  &:hover {
    top: none;
  }
  @keyframes waiting {
      from {
          left: -100%;
      }
      to   {
          left: 100%;
      }
  }

`;