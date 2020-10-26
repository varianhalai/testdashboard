import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/appStyles";
import harvest from "../lib/index.js";

const { ethers } = harvest;

const Panel = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.4rem;
  font-family: TechnaSans;
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1.5rem;
`;

const StakePanel = ({ state }) => {
  const [stakeAmount, setStakeAmount] = useState(0);

  const stake = () => {
    const amount = ethers.utils.parseUnits(stakeAmount.toString(), 18);

    state.manager.pools.forEach(async (pool) => {
      if (pool.address === "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50") {
        const allowance = await pool.lptoken.allowance(
          state.address,
          pool.address,
        );

        if (allowance.lt(amount)) {
          await pool.approve(state.address, ethers.constants.MaxUint256);
          await pool.stake(amount);
        } else {
          await pool.stake(amount).catch((e) => {
            console.log("insufficientBalance", e);
          });
        }
      }
    });
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <Panel>
        <p>
          Stake
          <input
            type="number"
            onChange={(event) =>
              setStakeAmount(event.target.value) && console.log(stakeAmount)
            }
            placeholder="1"
            step="any"
          />
          FARM
        </p>

        <ButtonContainer>
          <button className="button" disabled={!state.provider} onClick={stake}>
            stake
          </button>
        </ButtonContainer>
      </Panel>
    </ThemeProvider>
  );
};

export default StakePanel;
