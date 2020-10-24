import React, { useEffect } from 'react';
import styled from "styled-components";
import { Row, Col } from 'styled-bootstrap-grid';
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

  a, a:visited, a:hover, a:active {
    color: #fff;
    text-decoration: none;
  }
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

const Wallet = ({ disconnect, setConnection, setAddress, refresh, provider, address }) => {
  useEffect(() => {
    connectMetamask();
  }, []);

  const connectMetamask = () => {
    detectEthereumProvider().then((provider) => {
      if (!provider) {
        // setState()
      } else {
        window.ethereum.enable().then(() => {
          setProvider(provider, disconnect, setConnection, address);
        });
      }
    });
  }

  const renderConnectStatus = (provider, address) => {
    if (!provider) {
      return (
        <div>
          <button
            className="button--action"
            onClick={() => connectMetamask()}
          >
            Connect Wallet
          </button>
        </div>
      );
    }
    return (
      <p>
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

  const setProvider = (provider, disconnect, setConnection) => {
    provider = new ethers.providers.Web3Provider(provider);

    let signer;
    try {
      signer = provider.getSigner();
    } catch (e) {
      console.log(e);
    }
    const manager = harvest.manager.PoolManager.allPastPools(
      signer ? signer : provider
    );

    setConnection({ provider, signer, manager });

    window.ethereum.on("accountsChanged", () => {
      disconnect();
    });

    // get the user address
    signer
      .getAddress() // refreshButtonAction called initially to load table
      .then((address) => {
        setAddress({ address });
        refresh();
      });
  }

  return (
    <Row>
    <Col col>
      <WalletContainer>
        <WalletTab>wallet</WalletTab>
        <WalletConnection>{renderConnectStatus(provider, address)}</WalletConnection>
      </WalletContainer>
    </Col>
  </Row>
  );
};

export default Wallet;

