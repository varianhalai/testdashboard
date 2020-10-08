import React, {Component} from 'react';

import harvest from '../lib/index.js';
const {ethers, utils} = harvest;


class Table extends Component {
  constructor(props, keys) {
    super(props)
    this.keys = keys;
  }

  render() {
    return (
      <div id='table-container'>
        <div id='summaries'>
            {this.renderTableHeader()}
            {this.renderTableData()}
        </div>
        {this.renderNAV()}
      </div>
      )
  }

  renderTableHeader() {
    return (<div id="summaries--header">
        {this.keys.map((key, index) => {
      return <p key={index}>{key}</p>
    })}
    </div>
    )
  }

  renderNAV() {
    if (this.props.data.length !== 0) {
      const formatted = utils.prettyMoney(this.props.usdValue);
      return <p id="table--total">Based on Coingecko prices, your staked assets and earned rewards are worth about <strong>{formatted}</strong></p>;
    }
    return <div></div>;
  }

}

export class MainTable extends Table {
  constructor(props) {
    super(props, [
      'Pool',
      'Earning',
      'Earned Rewards',
      'Staked Balance',
      '% of Pool',
      'Value',
      'Unstaked Balance',
    ]);
  }

  renderTableData() {
    return this.props.data
      .map(utils.prettyPosition)
      .map((summary, index) => {
        return (
          <div id="summaries--row" key={summary.address}>
            <div>{summary.name}</div>
            <div>{String(summary.isActive)}</div>
            <div>{summary.earnedRewards}</div>
            <div>{summary.stakedBalance}</div>
            <div>{summary.percentOfPool}</div>
            <div>{summary.usdValueOf}</div>
            <div>{summary.unstakedBalance}</div>
          </div>
        );
      });
  }
}

export class UnderlyingTable extends Table {
  constructor(props) {
    super(props, [
      'Asset',
      'Underlying Balance',
    ]);
  }

  render() {
    return (
      <div id='table-container'>
        <div id='underlyings'>
            {this.renderTableHeader()}
            {this.renderTableData()}
        </div>
      </div>
      )
  }

  renderTableHeader() {
    return (<div id="underlying--header">
        {this.keys.map((key, index) => {
      return <p key={index}>{key}</p>
    })}
    </div>
    )
  }

  renderTableData() {
    return this.props.data
      .filter((u) => !u.balance.isZero())
      .map((u, index) => {
        return (
          <div id="underlying--row" key={u.asset.address}>
            <div>{u.asset.name}</div>
            <div>{ethers.utils.formatUnits(u.balance, u.asset.decimals)}</div>
          </div>
        );
      });
  }
}
