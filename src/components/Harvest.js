import React, { useState, setState } from "react";
import styled from "styled-components";
import { Row, Col } from "styled-bootstrap-grid";

import harvest from "../lib/index.js";
const { ethers } = harvest;

const Panel = styled.div`
  position: relative;
  background-color: #1d1d1d;
  color: #fff;
  font-size: 1.4rem;
  font-family: TechnaSans;
  padding: 1.5rem;
  border: 0.2rem solid #363636;
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: 3px 4px 0px #363636;

  input[type="number"] {
    -moz-appearance: textfield;
    background-color: #1d1d1d;
    border: 0.3rem solid #363636;
    font-size: 1.8rem;
    color: #fff;
    width: 60px;
    text-align: center;
    border-radius: 0.5rem;
    margin: 0rem 1rem;
    padding: 0.5rem 1rem;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
`;

const Harvest = ({ provider, manager }) => {
  const [minimumHarvestAmount, setMinimumHarvestAmount] = useState(0.1);

  const harvest = () => {
    console.log("minimumHarvestAmount", minimumHarvestAmount);

    const minHarvest = minimumHarvestAmount
      ? ethers.utils.parseUnits(minimumHarvestAmount.toString(), 18)
      : ethers.constants.WeiPerEther.div(10);

    manager.getRewards(minHarvest);
  };

  // renderHarvestButton() {
  //   return (
  //     <button
  //       disabled={!this.state.provider}
  //       onClick={this.harvestButtonAction.bind(this)}
  //     >
  //       Harvest All
  //     </button>
  //   );
  // }

  return (
    <Row style={{ marginTop: "1.5rem" }}>
      <Col col lg="4">
        <Panel>
          <p>
            Harvest all farms with at least
            <input
              type="number"
              onChange={(event) => setMinimumHarvestAmount(event.value)}
              value={minimumHarvestAmount}
            />
            $FARM
          </p>

          <button className="button" disabled={!provider} onClick={harvest}>
            harvest all
          </button>
        </Panel>
      </Col>
      <Col col lg="4">
        test
      </Col>
      <Col col lg="4">
        test
      </Col>
    </Row>
  );
};

export default Harvest;
