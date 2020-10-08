import detectEthereumProvider from "@metamask/detect-provider";
import React from "react";
import styled from "styled-components";

import logo from "./assets/logo@3x.png";
import harvest from "./lib/index.js";
import Footer from "./components/Footer";
import { MainTable, UnderlyingTable } from "./components/MainTable.js";
import ErrorModal from "./components/ErrorModal";

const { ethers, utils } = harvest;

const Container = styled.div`
  text-align: center;
  background-color: #fafbfe;

  @media only screen and (max-device-width: 768px) {
    /* Styles */
  }

  & > header {
    background-color: #fafbfe;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  h1 {
    font-weight: bold;
    font-size: 32px;
    margin: 16px 0;
  }

  button.button--action {
    background-color: #6336ff;
    font-size: 14px;
  }
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
  }

  setProvider(provider) {
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

    this.setState({ provider, signer, manager });

    window.ethereum.on("accountsChanged", () => {
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
    });

    console.log({ provider, signer, manager });

    // get the user address
    signer
      .getAddress() // refreshButtonAction called initially to load table
      .then((address) => {
        this.setState({ address });
        this.refreshButtonAction();
      });
  }

  connectMetamask() {
    detectEthereumProvider().then((provider) => {
      if (!provider) {
        this.setState({
          showErrorModal: true,
        });
      } else {
        window.ethereum.enable().then(() => {
          this.setProvider(provider);
        });
      }
    });
  }

  refreshButtonAction() {
    console.log("refreshing");
    this.state.manager
      .aggregateUnderlyings(this.state.address)
      .then((underlying) =>
        underlying.toList().filter((u) => !u.balance.isZero())
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
            (p.summary.isActive && !p.summary.unstakedBalance.isZero())
        )
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
    console.log("harvesting");
    const minHarvestInput = document.getElementById("minHarvest").value;
    const minHarvest = minHarvestInput
      ? ethers.utils.parseUnits(minHarvestInput, 18)
      : ethers.constants.WeiPerEther.div(10);
    this.state.manager.getRewards(minHarvest);
  }

  exitInactiveButtonAction() {
    console.log("exiting inactive");
    this.state.manager.exitInactive();
  }

  closeErrorModal() {
    this.setState({
      showErrorModal: false,
    });
  }

  render() {
    const connectBtn = this.renderConnectStatus();
    const refreshBtn = this.renderRefreshButton();
    const harvestAll = this.renderHarvestAll();
    const exitInactive = this.renderExitInactiveButton();
    const table = this.renderMainTable();
    const underlyingTable = this.renderUnderlyingTable();
    return (
      <Container>
        <div className="menu">
          <div className="menu--logo">
            <img src={logo}></img>harvest.finance
          </div>
        </div>
        <header>
          <img id="logo" src={logo}></img>
          <h1>Harvest Finance Dashboard</h1>
          {connectBtn}
          {refreshBtn}
          {table}
          <div>
            {harvestAll}
            {exitInactive}
          </div>
          {underlyingTable}
          <Footer />
        </header>
        <ErrorModal
          onClose={() => this.closeErrorModal()}
          onSubmit={() => this.connectMetamask()}
          isOpen={this.state.showErrorModal}
        />
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
    return <div></div>;
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
    return <div></div>;
  }

  renderConnectStatus() {
    if (!this.state.provider) {
      return (
        <div>
          <button
            className="button--action"
            onClick={this.connectMetamask.bind(this)}
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
              this.state.address
                ? "https://etherscan.io/address/" + this.state.address
                : "#"
            }
          >
            {this.state.address || "not connected"}
          </a>
        </span>
      </p>
    );
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
    return <div></div>;
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
          onClick={this.refreshButtonAction.bind(this)}
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
      (sum) => sum.stakedBalance && !sum.isActive
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
    return <div></div>;
  }
}

export default App;
