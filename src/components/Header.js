import React from "react";
import styled from "styled-components";

import logo from "../assets/logo@3x.png";

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const Header = () => (
  <header>
    <Logo src={logo} />
    <h1>Harvest Finance Dashboard</h1>
  </header>
);

export default Header;
