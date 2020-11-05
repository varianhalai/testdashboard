import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";


const WalletConnection = styled.div`
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  border-top-right-radius: 0rem;
  display: flex;
  padding: .5rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  position: relative;
  top: -.6rem;
  font-size: 2rem;
  @media(max-width: 585px) {
    font-size: 1.8rem;
    width: 100%;
  }
  @media(max-width: 560px) {
    font-size: 1.7rem;
  }
  @media(max-width: 530px) {
    font-size: 1.4rem;
  }
  @media(max-width: 430px) {
    font-size: 1.2rem;
  }
  @media(max-width: 390px) {
    font-size: 1rem;
  }
  @media(max-width: 360px) {
    font-size: .9rem;
  }
 
  

  a,
  a:visited,
  a:hover,
  a:active {
    color: ${(props) => props.theme.style.primaryFontColor};
    text-decoration: none;
  }

  div {
    .ghost {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-size: 1.8rem;
    }
  }
  
`;
const WalletContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.headerFont};
  
`;
const WalletTab = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  border: ${(props) => props.theme.style.mainBorder};
  padding-bottom: 1.5rem;
  font-family: ${fonts.headerFont};
  font-size: 1.5rem;
  position: relative;
  top: .6rem;
`;

const Wallet = ({
  state,
}) => {
  
  const renderConnectStatus = (provider, address) => {
    
    return (
      <p>
        <span id="address">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={address ? "https://etherscan.io/address/" + address : "#"}
          >
            {address || "not connected"}
          </a>
        </span>
      </p>
    );
  };

  

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <WalletContainer>
        <WalletTab>wallet</WalletTab>
        <WalletConnection>
          {renderConnectStatus(state.provider, state.address)}
        </WalletConnection>
      </WalletContainer>
    </ThemeProvider>
  );
};

export default Wallet;
