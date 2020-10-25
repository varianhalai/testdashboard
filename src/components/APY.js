import React from "react";
import styled from "styled-components";
import { darkTheme, fonts } from "../styles/appStyles";
import { Col } from "styled-bootstrap-grid";

const GreenPanel = styled.div`
  position: relative;
  background-color: ${darkTheme.style.greenBackground};
  color: #fff;
  font-size: 1.4rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${darkTheme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${darkTheme.style.panelBoxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const APY = () => {
  return <GreenPanel>APY</GreenPanel>;
};

export default APY;
