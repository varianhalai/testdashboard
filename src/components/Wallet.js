import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from 'styled-bootstrap-grid';
import harvest from "../lib/index.js";
import detectEthereumProvider from "@metamask/detect-provider";

const { ethers } = harvest;

const WalletConnection = styled.div`
  border: 3px solid #363636;
  border-radius: .5rem;
  border-top-right-radius: 0rem;
  display: flex;
  padding: 0.75rem 1.25rem;
  background-color: #1D1D1D;
  position: relative;
  top: -1.2rem;
`;
const WalletContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  color: #fff;
`;
const WalletTab = styled.div`
  padding: 0.5rem 1rem;
  border-radius: .5rem;
  background-color: #1D1D1D;
  border: 3px solid #363636;
  padding-bottom: 1.5rem;
`;

const connectMetamask = () => {
  detectEthereumProvider().then((provider) => {
    if (!provider) {
      // this.setState({
      //   showErrorModal: true,
      // });
    } else {
      window.ethereum.enable().then(() => {
        this.setProvider(provider);
      });
    }
  });
}

useEffect(() => { connectMetamask() });

const Wallet = ({ provider, address }) => (
  <Row>
    <Col col>
      <WalletContainer>
        <WalletTab>wallet</WalletTab>
        <WalletConnection>{renderConnectStatus(provider, address)}</WalletConnection>
      </WalletContainer>
    </Col>
  </Row>
);

const renderConnectStatus = (provider, address) => {
  console.log('provider', provider, address);

  if (provider) {
    return (
      <div>
        <button
          className="button--action"
          onClick={connectMetamask(provider)}
        >
          Connect Wallet
        </button>
      </div>
    );
  }
  return (
    <p>
      Your wallet address is:{" "}
      <span id="address">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={
            address
              ? "https://etherscan.io/address/" + address
              : "#"
          }
        >
          {address || "not connected"}
        </a>
      </span>
    </p>
  );
}

export default Wallet;
