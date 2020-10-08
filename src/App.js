import detectEthereumProvider from "@metamask/detect-provider";
import harvest from "./lib/index.js";

import React from "react";
import "./App.css";
import { MainTable, UnderlyingTable } from "./components/MainTable.js";

const { ethers, utils } = harvest;

const tokens = [
  {
    name: "FARM",
    url: "https://harvestfi.github.io/add-farm/",
    image: "/dashboard/logo@3x.png",
  },
  {
    name: "fUSDC",
    url: "https://harvestfi.github.io/add-fusdc/",
    image: "/dashboard/png_usdc_56px@3x.png",
  },
  {
    name: "fUSDT",
    url: "https://harvestfi.github.io/add-fusdt/",
    image: "/dashboard/png_usdt_56px@3x.png",
  },
  {
    name: "fDAI",
    url: "https://harvestfi.github.io/add-fdai/",
    image: "/dashboard/png_dai_56px@3x.png",
  },
  {
    name: "fwBTC",
    url: "https://harvestfi.github.io/add-fwbtc/",
    image: "/dashboard/png_wbtc_56px@3x.png",
  },
  {
    name: "frenBTC",
    url: "https://harvestfi.github.io/add-frenbtc/",
    image: "/dashboard/png_frenbtc_56px@3x.png",
  },
  {
    name: "fcrvRenWBTC",
    url: "https://harvestfi.github.io/add-fcrvrenwbtc/",
    image: "/dashboard/png_crvrenwbtc_56px@3x.png",
  },
];

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
        document
          .querySelector(".provider-error-modal")
          .classList.add("visible");
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
    document.querySelector(".provider-error-modal").classList.remove("visible");
  }

  render() {
    const connectBtn = this.renderConnectStatus();
    const refreshBtn = this.renderRefreshButton();
    const harvestAll = this.renderHarvestAll();
    const exitInactive = this.renderExitInactiveButton();
    const table = this.renderMainTable();
    const underlyingTable = this.renderUnderlyingTable();
    return (
      <div className="App">
        <div className="menu">
          <div className="menu--logo">
            <img src="/dashboard/logo@3x.png"></img>harvest.finance
          </div>
        </div>
        <header className="App-header">
          <img id="logo" src="/dashboard/logo@3x.png"></img>
          <h1>Harvest Finance Dashboard</h1>
          {connectBtn}
          {refreshBtn}
          {table}
          <div>
            {harvestAll}
            {exitInactive}
          </div>
          {underlyingTable}
          <div id="footer">
            <h3>Add assets to wallet</h3>
            <div className="assets">
              {tokens.map(({ name, url, image }) => (
                <div className="asset">
                  <a target="_blank" rel="noopener noreferrer" href={url}>
                    <img alt={name} src={image}></img>
                    {name}
                  </a>
                </div>
              ))}
            </div>
            <div id="wiki-link">
              <img className="icon" src="/dashboard/Wiki.svg"></img>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://farm.chainwiki.dev"
                >
                  Harvest Wiki
                </a>
              </p>
            </div>
            <div id="donation-link">
              <img src="/dashboard/logo@3x.png"></img>
              <p>
                Please consider donating:{" "}
                <span id="address">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://etherscan.io/address/0x84BB14595Fd30a53cbE18e68085D42645901D8B6"
                  >
                    0x84BB14595Fd30a53cbE18e68085D42645901D8B6
                  </a>
                </span>
              </p>
            </div>
          </div>
          <div className="provider-error-modal">
            <div id="provider-error-modal--inner">
              <img
                id="pe-modal--close"
                src="/dashboard/closed@3x.png"
                onClick={this.closeErrorModal}
              ></img>
              <img id="no_eth_provider" src="/dashboard/png_eth@3x.png"></img>
              <h3>No ETH Account Available</h3>
              <p>You are not yet logged in.</p>
              {connectBtn}
            </div>
          </div>
        </header>
      </div>
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
