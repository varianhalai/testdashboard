import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import harvest from "./lib/index.js";
import ErrorModal from "./components/ErrorModal";

import { darkTheme, lightTheme, fonts } from "./styles/appStyles";

// images
import logo from "./assets/logo.png";

// fonts
import DDIN from "./assets/fonts/DDIN-Bold.ttf";
import TechnaSans from "./assets/fonts/TechnaSans-Regular.otf";

// components
import Wallet from "./components/Wallet";
import FarmingTable from "./components/FarmingTable";
import AssetTable from "./components/AssetTable";
import Harvest from "./components/Harvest";
import StakePanel from "./components/StakePanel";
import Balance from "./components/Balance";
import APY from "./components/APY";
import AddTokens from "./components/AddTokens";

const { ethers } = harvest;
const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    /* 1rem = 10px */
    font-size: 62.5%;
  }

  @font-face {
    font-family: 'DDIN';
    src: local('DDIN'), local('DDIN'),
    url(${DDIN}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'TechnaSans';
    src: local('TechnaSans'), local('TechnaSans'),
    url(${TechnaSans}) format('opentype');
    font-weight: 300;
    font-style: normal;
  }

  body {
    margin: 0;
    background-color: ${(props) => props.theme.style.bodyBackground};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.style.highlight};
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.style.blueBackground};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.theme.style.blueBackground};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  input[type="button"]:focus, button:focus {
      outline: none;
  }


  input[type="number"] {
    -moz-appearance: textfield;
    background-color: ${(props) => props.theme.style.lightBackground};
    border: 0.2rem solid #363636;
    font-size: 1.4rem;
    color: ${(props) => props.theme.style.primaryFontColor};;
    width: 60px;
    text-align: center;
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  .button {
    background: ${(props) => props.theme.style.highlight};
    border: ${(props) => props.theme.style.smallBorder};
    box-shadow: ${(props) => props.theme.style.buttonBoxShadow};
    box-sizing: border-box;
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: TechnaSans;
    color: ${(props) => props.theme.style.buttonFontColor};
    font-size: 1.2rem;

    &.ghost {
      background: transparent;
      border: 0px;
      box-shadow: none;
      color: ${(props) => props.theme.style.linkColor};
      padding: 0px;
    }

    &.alert {
      background-color: ${(props) => props.theme.style.alertColor}
    }
  }

  .spread-row {
    justify-content: space-between;
  }

  div[data-name="row"] {
    margin-bottom: 1.5rem;
  }
`;

// App
const Brand = styled.div`
  padding-top: 1.5rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }

  span {
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${(props) => fonts.headerFont};
    font-size: 1.4rem;
  }
`;

const Panel = styled.div`
  position: relative;
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0rem;
  margin-top: -1.5rem;
  background-color: ${(props) => props.theme.style.panelBackground};
  z-index: 1;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  &.four-corner {
    border-top-left-radius: 1rem;
    background-color: #1d1d1d;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-size: 1.6rem;
    font-family: TechnaSans;
  }
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 0.4rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 1.25rem;
  padding-bottom: 2.25rem;
  background-color: ${(props) => props.theme.style.highlight};
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelTabBoxShadow};
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  a {
    color: ${(props) => props.theme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.headerFont};
  }

  &.wiki-tab {
    position: relative;
    background-color: ${(props) => props.theme.style.wikiTabBackground};
    top: 0.5rem;

    &:hover {
      top: 0rem;
    }

    a {
      color: ${(props) => props.theme.style.primaryFontColor};
      position: relative;
      top: -0.2rem;
    }
  }
`;

const PanelTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PanelTabContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function App() {
  const [state, setState] = useState({
    provider: undefined,
    signer: undefined,
    manager: undefined,
    address: "",
    summaries: [],
    underlyings: [],
    usdValue: 0,
    error: { message: null, type: null, display: false },
    theme: "dark",
  });

  const disconnect = () => {
    setState({
      provider: undefined,
      signer: undefined,
      manager: undefined,
      address: "",
      summaries: [],
      underlyings: [],
      usdValue: 0,
      showErrorModal: false,
    });
  };

  const closeErrorModal = () => {
    setState({
      ...state,
      error: { message: null, type: null, display: false },
    });
  };

  const openModal = (message, type) => {
    setState({
      ...state,
      error: { message: message, type: type, display: true },
    });
  };

  const setConnection = (provider, signer, manager) => {
    setState({
      ...state,
      provider: provider,
      signer: signer,
      manager: manager,
    });
  };

  const setAddress = (address) => {
    setState((state) => ({ ...state, address: address }));
  };

  const refresh = () => {
    state.manager
      .aggregateUnderlyings(state.address)
      .then((underlying) => {
        underlying.toList().filter((u) => !u.balance.isZero());
      })
      .then((underlyings) => {
        setState({ ...state, underlyings: underlyings });
        return underlyings;
      });

    state.manager
      .summary(state.address)
      .then((summaries) =>
        summaries.filter(
          (p) =>
            !p.summary.earnedRewards.isZero() ||
            !p.summary.stakedBalance.isZero() ||
            (p.summary.isActive && !p.summary.unstakedBalance.isZero()),
        ),
      )
      .then((summaries) => {
        let total = ethers.BigNumber.from(0);
        summaries.forEach((pos) => {
          total = total.add(pos.summary.usdValueOf);
        });
        setState((state) => ({
          ...state,
          summaries: summaries,
          usdValue: total,
        }));
        return summaries;
      });
  };

  const toggleTheme = (theme) => {
    setState({ ...state, theme: theme });
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />

      <Container>
        <Row>
          <Col col>
            <Brand>
              <img src={logo} alt="harvest finance logo" />{" "}
              <span>harvest.dashboard</span>
            </Brand>
          </Col>
        </Row>

        <Row>
          <Col>
            <PanelTabContainer>
              <PanelTabContainerLeft>
                <PanelTab>
                  <a
                    href="https://harvest.finance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    harvest.finance
                  </a>
                </PanelTab>
                <PanelTab className="wiki-tab">
                  <a
                    href="https://farm.chainwiki.dev/en/home"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    wiki
                  </a>
                </PanelTab>
              </PanelTabContainerLeft>

              <PanelTabContainerRight>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={state.theme === "dark" ? true : false}
                    onChange={() =>
                      toggleTheme(state.theme === "dark" ? "light" : "dark")
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </PanelTabContainerRight>
            </PanelTabContainer>

            <Panel>
              <Row>
                <Col>
                  <Wallet
                    state={state}
                    openModal={openModal}
                    disconnect={disconnect}
                    setConnection={setConnection}
                    setAddress={setAddress}
                    refresh={refresh}
                  />
                </Col>
              </Row>

              {state.provider && (
                <div>
                  <Row>
                    <Col>
                      <FarmingTable state={state} />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      <Harvest state={state} />
                    </Col>
                    <Col lg="3">
                      <APY state={state} />
                    </Col>
                    <Col lg="3">
                      <Balance state={state} />
                    </Col>
                  </Row>

                  <Row className="spread-row">
                    <Col lg="3">
                      <StakePanel state={state} openModal={openModal} />
                    </Col>

                    <Col lg="4">
                      <AssetTable state={state} />
                    </Col>
                  </Row>
                </div>
              )}

              <Row>
                <Col>
                  <AddTokens state={state} />
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </Container>

      <ErrorModal state={state} onClose={() => closeErrorModal()} />
    </ThemeProvider>
  );
}

export default App;
