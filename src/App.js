import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";

import harvest from "./lib/index.js";
import { darkTheme, fonts } from "./styles/appStyles";

// components
import { UnderlyingTable } from "./components/MainTable";

import Wallet from "./components/Wallet";
import FarmingTable from "./components/FarmingTable";
import AssetTable from "./components/AssetTable";
import Harvest from "./components/Harvest";
import StakePanel from "./components/StakePanel";
import Balance from "./components/Balance";
import APY from "./components/APY";

const { ethers } = harvest;

const Panel = styled.div`
  position: relative;
  padding: 1.5rem;
  border: ${darkTheme.style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0rem;
  margin-top: -1.5rem;
  background-color: ${darkTheme.style.panelBackground};
  z-index: 1;
  box-sizing: border-box;
  box-shadow: ${darkTheme.style.panelBoxShadow};

  &.four-corner {
    border-top-left-radius: 1rem;
    background-color: #1d1d1d;
    color: #fff;
    font-size: 1.6rem;
    font-family: TechnaSans;
  }
`;

const PanelContainer = styled.div`
  margin-top: 5rem;
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 0.4rem;
  border-top: ${darkTheme.style.mainBorder};
  border-left: ${darkTheme.style.mainBorder};
  border-right: ${darkTheme.style.mainBorder};
  padding: 0.75rem 1.25rem;
  padding-bottom: 2.25rem;
  background-color: ${darkTheme.style.panelTabBackground};
  box-sizing: border-box;
  box-shadow: ${darkTheme.style.panelTabBoxShadow};
  font-size: 2.6rem;
  font-weight: 700;
  cursor: pointer;

  a {
    color: ${darkTheme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.headerFont};
  }

  &.wiki-tab {
    position: relative;
    background-color: ${darkTheme.style.wikiTabBackground};
    top: 0.5rem;

    &:hover {
      top: 0rem;
    }

    a {
      color: #fff;
      position: relative;
      top: -0.2rem;
    }
  }
`;

const PanelTabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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
    showErrorModal: false,
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
      .then((underlying) =>
        underlying.toList().filter((u) => !u.balance.isZero()),
      )
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

  const exitInactiveButtonAction = () => {
    state.manager.exitInactive();
  };

  // const renderExitInactiveButton = () => {
  //   let inactivePools = state.summaries.filter(
  //     (sum) => sum.stakedBalance && !sum.isActive,
  //   );
  //   if (inactivePools.length !== 0) {
  //     return (
  //       <div>
  //         <button
  //           disabled={!state.provider}
  //           onClick={exitInactiveButtonAction}
  //         >
  //           Exit inactive pools
  //         </button>
  //       </div>
  //     );
  //   }
  //   return null;
  // }

  const renderUnderlyingTable = () => {
    if (state.underlyings.length !== 0) {
      return (
        <div>
          <p>
            Your position includes LP tokens that can be redeemed for the
            following:
          </p>
          <UnderlyingTable data={state.underlyings}></UnderlyingTable>
        </div>
      );
    }
    return null;
  };

  //  const renderRefreshButton = () => {
  //   const buttonText =
  //     state.summaries.length === 0
  //       ? "Click to load the table!"
  //       : "Refresh Table";

  //   return (
  //     <div>
  //       <button
  //         disabled={!state.provider || state.summaries.length === 0} // disable if, on initial, the table is still loading
  //         onClick={refresh}
  //       >
  //         {buttonText}
  //       </button>
  //     </div>
  //   );
  // }
  //     const refreshBtn = renderRefreshButton();
  // const exitInactive = renderExitInactiveButton();
  // const underlyingTable = renderUnderlyingTable();

  return (
    <Container>
      <Row>
        <Col col>
          <PanelContainer>
            <PanelTabContainer>
              <PanelTab>
                <a href="https://harvest.finance">harvest.finance</a>
              </PanelTab>
              <PanelTab className="wiki-tab">
                <a href="https://farm.chainwiki.dev/en/home" target="_blank">
                  wiki
                </a>
              </PanelTab>
            </PanelTabContainer>

            <Panel>
              <Wallet
                state={state}
                setState={setState}
                disconnect={disconnect}
                setConnection={setConnection}
                setAddress={setAddress}
                refresh={refresh}
              />

              <FarmingTable data={state.summaries} usdValue={state.usdValue} />

              <Row>
                <Col lg="6">
                  <Harvest provider={state.provider} manager={state.manager} />
                </Col>
                <Col lg="3">
                  <APY />
                </Col>
                <Col lg="3">
                  <Balance />
                </Col>
              </Row>

              <Row className="spread-row">
                <Col lg="3">
                  <StakePanel
                    provider={state.provider}
                    manager={state.manager}
                  />
                </Col>

                <Col lg="4">
                  <AssetTable underlyings={state.underlyings} />
                </Col>
              </Row>
            </Panel>
          </PanelContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
