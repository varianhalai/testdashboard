import React, { useState } from "react";
import styled from "styled-components";
import {style} from '../styles/appStyles';
import { Col } from "styled-bootstrap-grid";



const Panel = styled.div`
  position: relative;
  background-color: ${style.lightBlackBG};
  color: #fff;
  font-size: 1.4rem;
  font-family: TechnaSans;
  padding: 1.5rem;
  border: ${style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${style.panelBoxShadow};

  input[type="number"] {
    -moz-appearance: textfield;
    background-color: ${style.lightBlackBG};
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

const StakePanel = ({ provider, manager }) => {
  const [stakeAmount,setStakeAmount] = useState(0)

  return (
    <>
      <Col col lg="12">
        <Panel>
          <p>
            stake
            <input
              type="number"
              onChange={(event) => setStakeAmount(event.value)}
              value={stakeAmount}
            />
            FARM at 177.44% apy
          </p>

          <button className="button" disabled={!provider} >
            stake
          </button>
        </Panel>
      </Col>
      <Col col lg="12">
        test
      </Col>
      <Col col lg="12">
        test
      </Col>
    </>
  );
};

export default StakePanel;
