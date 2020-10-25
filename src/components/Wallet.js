import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Row, Col } from "styled-bootstrap-grid";
import harvest from "../lib/index.js";
import detectEthereumProvider from "@metamask/detect-provider";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

import ErrorModal from "./ErrorModal";

const { ethers } = harvest;

const WalletConnection = styled.div`
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  border-top-right-radius: 0rem;
  display: flex;
  padding: 0.75rem 1.25rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  position: relative;
  top: -1.2rem;
  font-size: 1.2rem;
  font-family: "TechnaSans";

  a,
  a:visited,
  a:hover,
  a:active {
    color: ${(props) => props.theme.style.primaryFontColor};
    text-decoration: none;
  }
`;
const WalletContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  color: ${(props) => props.theme.style.primaryFontColor};
`;
const WalletTab = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  border: ${(props) => props.theme.style.mainBorder};
  padding-bottom: 1.5rem;
  font-family: ${fonts.headerFont};
  font-size: 1.4rem;
`;

const Wallet = ({
  disconnect,
  refresh,
  setAddress,
  setConnection,
  setState,
  state,
}) => {
  useEffect(() => {
    console.log("state", state);
  }, [state]);

  useEffect(() => {
    if (state.address !== "") {
      refresh(state);
    }
  }, [state.address]);

  const closeErrorModal = () => {
    setState({
      showErrorModal: false,
    });
  };

  const connectMetamask = (signer, manager) => {
    detectEthereumProvider().then((provider) => {
      if (!provider) {
        // setState()
      } else {
        window.ethereum.enable().then(() => {
          setProvider(provider, signer, manager);
        });
      }
    });
  };

  const renderConnectStatus = (provider, address) => {
    if (!provider) {
      return (
        <div>
          <button
            className="button ghost"
            onClick={() => connectMetamask(provider)}
          >
            connect
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
            href={address ? "https://etherscan.io/address/" + address : "#"}
          >
            {address || "not connected"}
          </a>
        </span>
      </p>
    );
  };

  const setProvider = (provider) => {
    provider = new ethers.providers.Web3Provider(provider);

    let signer;
    try {
      signer = provider.getSigner();
    } catch (e) {
      console.log(e);
    }
    const manager = harvest.manager.PoolManager.allPastPools(
      signer ? signer : provider,
    );

    setConnection(provider, signer, manager);

    window.ethereum.on("accountsChanged", () => {
      disconnect();
    });

    // get the user address
    signer
      .getAddress() // refreshButtonAction called initially to load table
      .then((add) => {
        setAddress(add);
      });
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <Row>
        <Col col>
          <WalletContainer>
            <WalletTab>wallet</WalletTab>
            <WalletConnection>
              {renderConnectStatus(state.provider, state.address)}
            </WalletConnection>
          </WalletContainer>
          <ErrorModal
            onClose={() => closeErrorModal()}
            onSubmit={() => connectMetamask()}
            isOpen={state.showErrorModal}
          />
        </Col>
      </Row>
    </ThemeProvider>
  );
};

export default Wallet;
