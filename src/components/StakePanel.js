import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";
import harvest from "../lib/index.js";

const { ethers } = harvest;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  @media(max-width: 1002px) {
    margin-bottom: 1.5rem;
    
  }

  input[type="number"] {
    margin: 0rem 1rem;
  }

  button {
    margin-right: 0.5rem;
  }

  .panel-text {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 2.7rem;
    margin-right: 0.5rem;
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
  margin-top: 1.5rem;
  button {
    font-size: 1.9rem;
    font-family: ${fonts.headerFont};
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

const StakePanel = ({ state, openModal }) => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const pool = state.manager.pools.find((pool) => {
    return pool.address === "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50";
  });
  const inactivePools = state.summaries.filter(
    (sum) => sum.stakedBalance && !sum.isActive,
  );

  const stake = async () => {
    const allowance = await pool.lptoken.allowance(state.address, pool.address);
    const amount =
      stakeAmount > 0
        ? ethers.utils.parseUnits(stakeAmount.toString(), 18)
        : await pool.unstakedBalance(state.address);

    if (allowance.lt(amount)) {
      await pool.approve(state.address, ethers.constants.MaxUint256);
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
  };

  const unstake = async () => {
    await pool.exit().catch((e) => {
      console.log("insufficientBalance", e);
    });
  };

  const exitInactivePools = () => {
    state.manager.exitInactive();
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <Panel>
        <div className='panel-text'>
          <p>
            Stake
            <input
              type="number"
              onChange={(event) => setStakeAmount(event.target.value)}
              placeholder="max"
              step="any"
            />
            FARM 
          </p>
        </div> 
        

        <ButtonContainer>
          <button className="button" disabled={!state.provider} onClick={stake}>
            stake
          </button>
          <button
            className="button"
            disabled={!state.provider}
            onClick={unstake}
          >
            unstake
          </button>
          {inactivePools.length > 0 && (
            <button
              className="button alert"
              disabled={!state.provider}
              onClick={exitInactivePools}
            >
              exit inactive
            </button>
          )}
        </ButtonContainer>
      </Panel>
    </ThemeProvider>
  );
};

export default StakePanel;
