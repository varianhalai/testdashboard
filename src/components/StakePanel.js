import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/appStyles";
import harvest from "../lib/index.js";

const { ethers } = harvest;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: TechnaSans;
  padding: 1.5rem .5rem;
  margin-top: 30px;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  input[type="number"] {
    margin: 0rem 1rem;
  }

  button {
    margin-right: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  button {
    font-size: 1.1em;
    position: relative;
    &:hover {
      top: 1.5px;
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
        <p>
          stake
          <input
            type="number"
            onChange={(event) => setStakeAmount(event.target.value)}
            placeholder="max"
            step="any"
          />
          FARM at {state.apy}% apy
        </p>

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
