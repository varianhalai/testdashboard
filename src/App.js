import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";

import harvest from "./lib/index.js";

// components

import { MainTable, UnderlyingTable } from "./components/MainTable.js";
import ErrorModal from "./components/ErrorModal";
import Wallet from "./components/Wallet";
import FarmingTable from "./components/FarmingTable";

const { ethers } = harvest;

const Panel = styled.div`
  position: relative;
  padding: 1.5rem;
  border: 0.2rem solid #363636;
  border-radius: 1rem;
  border-top-left-radius: 0rem;
  margin-top: -1.5rem;
  background-color: #000;
  z-index: 1;
  box-sizing: border-box;
  box-shadow: 3px 4px 0px #363636;
`;

const PanelContainer = styled.div`
  margin-top: 5rem;
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 0.4rem;
  border-top: 3px solid #363636;
  border-left: 3px solid #363636;
  border-right: 3px solid #363636;
  padding: 0.75rem 1.25rem;
  padding-bottom: 2.25rem;
  background-color: #42857d;
  box-sizing: border-box;
  box-shadow: 3px 5.2px 0px #363636;
  font-size: 2.6rem;
  font-weight: 700;
  cursor: pointer;

  a {
    color: #363636;
    text-decoration: none;
    font-family: "DDIN";
  }

  &.wiki-tab {
    position: relative;
    background-color: #212121;
    top: 0.5rem;

    &:hover {
      top: 0rem;

      a {
        top: 0rem;
      }
    }

    a {
      color: #fff;
      position: relative;
      top: -0.5rem;
    }
  }
`;

const PanelTabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      provider: undefined,
      signer: undefined,
      address: "",
      manager: undefined,
      summaries: [],
      underlyings: [],
      usdValue: 0,
      showErrorModal: false,
    };

    this.setConnection = this.setConnection.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  disconnect() {
    this.setState({
      provider: undefined,
      signer: undefined,
      address: "",
      manager: undefined,
      summaries: [],
      underlyings: [],
      usdValue: 0,
      showErrorModal: false,
    });
  }

  setConnection({ provider, signer, manager }) {
    this.setState({ provider, signer, manager });
  }

  setAddress({ address }) {
    this.setState({ address });
  }

  refresh() {
    this.state.manager
      .aggregateUnderlyings(this.state.address)
      .then((underlying) =>
        underlying.toList().filter((u) => !u.balance.isZero()),
      )
      .then((underlyings) => {
        this.setState({ underlyings });
        return underlyings;
      });

    this.state.manager
      .summary(this.state.address)
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
        this.setState({ summaries, usdValue: total });
        return summaries;
      });
  }

  harvestButtonAction() {
    const minHarvestInput = document.getElementById("minHarvest").value;
    const minHarvest = minHarvestInput
      ? ethers.utils.parseUnits(minHarvestInput, 18)
      : ethers.constants.WeiPerEther.div(10);
    this.state.manager.getRewards(minHarvest);
  }

  exitInactiveButtonAction() {
    this.state.manager.exitInactive();
  }

  closeErrorModal() {
    this.setState({
      showErrorModal: false,
    });
  }

  render() {
    const refreshBtn = this.renderRefreshButton();
    const harvestAll = this.renderHarvestAll();
    const exitInactive = this.renderExitInactiveButton();
    const table = this.renderMainTable();
    const underlyingTable = this.renderUnderlyingTable();
    return (
      <Container>
        <Row>
          <Col col>
            <main>
              <PanelContainer>
                <PanelTabContainer>
                  <PanelTab>
                    <a href="https://harvest.finance">harvest.finance</a>
                  </PanelTab>
                  <PanelTab className="wiki-tab">
                    <a
                      href="https://farm.chainwiki.dev/en/home"
                      target="_blank"
                    >
                      wiki
                    </a>
                  </PanelTab>
                </PanelTabContainer>

                <Panel>
                  <Wallet
                    disconnect={this.disconnect}
                    setConnection={this.setConnection}
                    setAddress={this.setAddress}
                    refresh={this.refresh}
                    provider={this.state.provider}
                    address={this.state.address}
                  />

                  <FarmingTable
                    data={this.state.summaries}
                    usdValue={this.state.usdValue}
                  />
                </Panel>
              </PanelContainer>
            </main>
            <ErrorModal
              onClose={() => this.closeErrorModal()}
              onSubmit={() => this.connectMetamask()}
              isOpen={this.state.showErrorModal}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  renderMainTable() {
    if (this.state.summaries.length !== 0) {
      return (
        <MainTable
          data={this.state.summaries}
          usdValue={this.state.usdValue}
        ></MainTable>
      );
    }
    return null;
  }

  renderUnderlyingTable() {
    if (this.state.underlyings.length !== 0) {
      return (
        <div>
          <p>
            Your position includes LP tokens that can be redeemed for the
            following:
          </p>
          <UnderlyingTable data={this.state.underlyings}></UnderlyingTable>
        </div>
      );
    }
    return null;
  }

  renderHarvestAll() {
    if (this.state.summaries.length !== 0) {
      const harvestBtn = this.renderHarvestButton();
      return (
        <p>
          Harvest all farms with at least{" "}
          <input type="text" id="minHarvest" placeholder="min"></input> FARM
          rewards {harvestBtn}
        </p>
      );
    }
    return null;
  }

  renderRefreshButton() {
    const buttonText =
      this.state.summaries.length === 0
        ? "Click to load the table!"
        : "Refresh Table";

    return (
      <div>
        <button
          disabled={!this.state.provider || this.state.summaries.length === 0} // disable if, on initial, the table is still loading
          onClick={this.refresh}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  renderHarvestButton() {
    return (
      <button
        disabled={!this.state.provider}
        onClick={this.harvestButtonAction.bind(this)}
      >
        Harvest All
      </button>
    );
  }

  renderExitInactiveButton() {
    let inactivePools = this.state.summaries.filter(
      (sum) => sum.stakedBalance && !sum.isActive,
    );
    if (inactivePools.length !== 0) {
      return (
        <div>
          <button
            disabled={!this.state.provider}
            onClick={this.exitInactiveButtonAction.bind(this)}
          >
            Exit inactive pools
          </button>
        </div>
      );
    }
    return null;
  }
}

export default App;
