import React, { useState } from "react";
import styled from "styled-components";
import { darkTheme } from "../styles/appStyles";
import { Col } from "styled-bootstrap-grid";

const Panel = styled.div`
  text-align: center;
  position: relative;
  background-color: ${darkTheme.style.lightBackground};
  color: #fff;
  font-size: 1.4rem;
  font-family: TechnaSans;
  padding: 1.5rem;
  border: ${darkTheme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${darkTheme.style.panelBoxShadow};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const StakePanel = ({ provider, manager }) => {
  const [stakeAmount, setStakeAmount] = useState(0);

  return (
    <Panel>
      <p>
        Stake
        <input
          type="number"
          onChange={(event) => setStakeAmount(event.value)}
          value={stakeAmount}
        />
        FARM
      </p>

      <ButtonContainer>
        <button className="button" disabled={!provider}>
          stake
        </button>
      </ButtonContainer>
    </Panel>
  );
};

export default StakePanel;
