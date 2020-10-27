import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

import harvest from "../lib/index.js";
const { ethers } = harvest;

const Panel = styled.div`
  text-align: left;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.4rem;
  font-family: ${fonts.contentFont};
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1.5rem;
`;

const Harvest = ({ state }) => {
  const [minimumHarvestAmount, setMinimumHarvestAmount] = useState(0);

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
      <Panel>
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

        <ButtonContainer>
          <button
            className="button"
            disabled={!state.provider || minimumHarvestAmount === 0}
            onClick={harvest}
          >
            harvest all
          </button>
        </ButtonContainer>
      </Panel>
    </ThemeProvider>
  );
};

export default Harvest;
