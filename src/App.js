import detectEthereumProvider from '@metamask/detect-provider';
import harvest, {ethers} from './lib/index.js';

import React from 'react';
import './App.css';
import MainTable from './components/MainTable.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      provider: undefined,
      signer: undefined,
      address: '',
      manager: undefined,
      summaries: [],
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

    // get the user address
    signer.getAddress()
      .then((address) => this.setState({address}));
  }

  connectMetamask() {
    detectEthereumProvider()
      .then(window.ethereum.enable())
      .then((provider) => this.setProvider(provider));
  }

  refreshButtonAction() {
    console.log('refreshing')
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

  render() {
    const connectBtn = this.renderConnectStatus();
    const refreshBtn = this.renderRefreshButton();
    const harvestAll = this.renderHarvestAll();
    const table = <MainTable data={this.state.summaries}></MainTable>;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Harvest Finance Dashboard</h1>
          {connectBtn}
          {refreshBtn}
          {table}
          {harvestAll}
          <p>Add assets to wallet: &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://silagepete.github.io/add-farm/">FARM</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://silagepete.github.io/add-fusdc/">fUSDC</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://silagepete.github.io/add-fusdt/">fUSDT</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://silagepete.github.io/add-fdai/">fDAI</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://silagepete.github.io/add-fwbtc/">fwBTC</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://silagepete.github.io/add-frenbtc/">frenBTC</a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://silagepete.github.io/add-fcrvrenwbtc/">fcrvRenWBTC</a>&nbsp;&#x2014;&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://farm.chainwiki.dev">Harvest Wiki</a>
          </p>
        </header>
      </div>
    );
  }

  renderConnectStatus() {
    if (!this.state.provider) {
      return <div>
        Please connect your wallet <button onClick={this.connectMetamask.bind(this)}>Connect Wallet</button>
      </div>;
    }
    return <p>Your wallet address is: <span id="address">{this.state.address || "not connected"}</span></p>;
  }

  renderHarvestAll() {
    if (this.state.summaries.length !== 0){
      const harvestBtn = this.renderHarvestButton();
      return (
        <div>
          Harvest all farms with at least <input type="text" id="minHarvest" placeholder="min"></input> FARM rewards {harvestBtn}
        </div>);
    }
    return <div></div>;
  }

  renderRefreshButton() {
    return <button
      disabled={!this.state.provider}
      onClick={this.refreshButtonAction.bind(this)}
    >Refresh Table</button>
  }

  renderHarvestButton() {
    return <button
      disabled={!this.state.provider}
      onClick={this.harvestButtonAction.bind(this)}
    >Harvest All</button>
  }
}


export default App;
