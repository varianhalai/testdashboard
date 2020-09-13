import detectEthereumProvider from '@metamask/detect-provider';
import harvest from './lib/index.js';

import React from 'react';
import './App.css';
import {MainTable, UnderlyingTable} from './components/MainTable.js';

const ethers = harvest.ethers;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      provider: undefined,
      signer: undefined,
      address: '',
      manager: undefined,
      summaries: [],
      underlyings: [],
    };
  }

  setProvider(provider) {
    provider = new ethers.providers.Web3Provider(provider);

    let signer;
    try {
      signer = provider.getSigner();
    } catch (e) {console.log(e)}
    const manager = harvest.manager.PoolManager.allPastPools(signer ? signer : provider);

    this.setState({provider, signer, manager});

    console.log({provider, signer, manager})

    // get the user address
    signer.getAddress()
      .then((address) => this.setState({address}));
  }

  connectMetamask() {
    detectEthereumProvider()
      .then((provider) => {
        window.ethereum.enable()
          .then(() => this.setProvider(provider))
      });
  }

  refreshButtonAction() {
    console.log('refreshing')
    this.state.manager.aggregateUnderlyings(this.state.address)
      .then((underlying) => underlying.toList().filter((u) => !u.balance.isZero()))
      .then((underlyings) => {
        this.setState({underlyings});
        return underlyings
      })
      .then(console.table);

    this.state.manager.summary(this.state.address)
      .then(summaries => summaries
        .filter((p) => !p.summary.earnedRewards.isZero()
                        || !p.summary.stakedBalance.isZero()
                        || (p.summary.isActive && !p.summary.unstakedBalance.isZero())
                        )
      )
      .then(summaries => {
        this.setState({summaries});
        return summaries;
      })
      .then(console.table);
  }

  harvestButtonAction() {
    console.log('harvesting');
    const minHarvestInput = document.getElementById("minHarvest").value;
    const minHarvest = minHarvestInput ? ethers.utils.parseUnits(minHarvestInput, 18) : ethers.constants.WeiPerEther.div(10);
    this.state.manager.getRewards(minHarvest);
  }

  exitInactiveButtonAction() {
    console.log('exiting inactive');
    this.state.manager.exitInactive();
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
        <header className="App-header">
          <h1>Harvest Finance Dashboard</h1>
          {connectBtn}
          {refreshBtn}
          {table}
          {harvestAll}
          {exitInactive}
          {underlyingTable}
          <p>Add assets to wallet: &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://harvestfi.github.io/add-farm/">FARM</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://harvestfi.github.io/add-fusdc/">fUSDC</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://harvestfi.github.io/add-fusdt/">fUSDT</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://harvestfi.github.io/add-fdai/">fDAI</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://harvestfi.github.io/add-fwbtc/">fwBTC</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://harvestfi.github.io/add-frenbtc/">frenBTC</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://harvestfi.github.io/add-fcrvrenwbtc/">fcrvRenWBTC</a>&nbsp;&#x2014;&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://farm.chainwiki.dev">Harvest Wiki</a>
          </p>
          <p>Please consider donating: 0x84BB14595Fd30a53cbE18e68085D42645901D8B6</p>
        </header>
      </div>
    );
  }

  renderMainTable() {
    if (this.state.summaries.length !== 0) {
      return <MainTable data={this.state.summaries}></MainTable>;
    }
    return <div></div>;
  }

  renderUnderlyingTable() {
    if (this.state.underlyings.length !== 0) {
      return (
      <div>
        <p>
          Your position includes LP tokens that can be redeemed for the following:
        </p>
        <p>
          <UnderlyingTable data={this.state.underlyings}></UnderlyingTable>
        </p>
      </div>
      );
    }
    return <div></div>
  }

  renderConnectStatus() {
    if (!this.state.provider) {
      return <div>
        Start here: <button onClick={this.connectMetamask.bind(this)}>Connect Wallet</button>
      </div>;
    }
    return <p>Your wallet address is: <span id="address"><a target="_blank" rel="noopener noreferrer" href={this.state.address ? "https://etherscan.io/address/" + this.state.address : "#"}>{this.state.address || "not connected"}</a></span></p>;
  }

  renderHarvestAll() {
    if (this.state.summaries.length !== 0){
      const harvestBtn = this.renderHarvestButton();
      return (
        <p>
          Harvest all farms with at least <input type="text" id="minHarvest" placeholder="min"></input> FARM rewards {harvestBtn}
        </p>);
    }
    return <div></div>;
  }

  renderRefreshButton() {
    const buttonText = (this.state.summaries.length === 0) ? 'Click to load the table!' : 'Refresh Table';

    return <div>
      <button
        disabled={!this.state.provider}
        onClick={this.refreshButtonAction.bind(this)}
      >{buttonText}</button>
    </div>;
  }

  renderHarvestButton() {
    return <button
      disabled={!this.state.provider}
      onClick={this.harvestButtonAction.bind(this)}
    >Harvest All</button>
  }

  renderExitInactiveButton() {
    let inactivePools = this.state.summaries.filter((sum) => sum.stakedBalance && !sum.isActive);
    if (inactivePools.length !== 0) {
      return <div><button
        disabled={!this.state.provider}
        onClick={this.exitInactiveButtonAction.bind(this)}
      >Exit inactive pools</button></div>;
    }
    return <div></div>;
  }
}


export default App;
