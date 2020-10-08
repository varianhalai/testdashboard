import React from "react";
import styled from "styled-components";

import logo from "../assets/logo@3x.png";

const Container = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  padding: 10px 20px;
  margin-bottom: 50px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;

  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
`;

const Menu = ({ className }) => (
  <Container>
    <Logo>
      <img alt="harvest.finance" src={logo}></img>harvest.finance
    </Logo>
  </Container>
);

export default Menu;
