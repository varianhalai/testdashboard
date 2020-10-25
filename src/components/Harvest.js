import React, { useState } from "react";
import styled from "styled-components";
import { darkTheme, fonts } from "../styles/appStyles";
import { Col } from "styled-bootstrap-grid";

import harvest from "../lib/index.js";
const { ethers } = harvest;

const Panel = styled.div`
  text-align: center;
  background-color: ${darkTheme.style.lightBackground};
  color: #fff;
  font-size: 1.4rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${darkTheme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${darkTheme.style.panelBoxShadow};

  .button {
    text-align: right;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const Harvest = ({ provider, manager }) => {
  const [minimumHarvestAmount, setMinimumHarvestAmount] = useState(0.1);

  const harvest = async () => {
    const minHarvest = minimumHarvestAmount
      ? ethers.utils.parseUnits(minimumHarvestAmount.toString(), 18)
      : ethers.constants.WeiPerEther.div(10);

    await manager.getRewards(minHarvest);
  };

  return (
    <Panel>
      <p>
        Harvest all farms with at least
        <input
          type="number"
          onChange={(event) => setMinimumHarvestAmount(event.value)}
          value={minimumHarvestAmount}
        />
        FARM rewards
      </p>

      <ButtonContainer>
        <button className="button" disabled={!provider} onClick={harvest}>
          harvest all
        </button>
      </ButtonContainer>
    </Panel>
  );
};

export default Harvest;
