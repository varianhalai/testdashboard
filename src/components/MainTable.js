import React, {Component} from 'react';

import harvest from '../lib/index.js';
const ethers = harvest.ethers;


class Table extends Component {
  constructor(props, keys) {
    super(props)
    this.keys = keys;
  }

  render() {
    return (
      <div>
        <table id='summaries'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
      )
  }

  renderTableHeader() {
    return this.keys.map((key, index) => {
      return <th key={index}>{key}</th>
    });
  }
}

export class MainTable extends Table {
  constructor(props) {
    super(props, [
      'Pool',
      'Earning',
      'Staked Balance',
      'Earned Rewards',
      '% of Pool',
      'USD Value',
      'Unstaked Balance',
    ]);
  }

  renderTableData() {
    return this.props.data
      .map(harvest.utils.prettyPosition)
      .map((summary, index) => {
        return (
          <tr key={summary.address}>
            <td>{summary.name}</td>
            <td>{String(summary.isActive)}</td>
            <td>{summary.stakedBalance}</td>
            <td>{summary.earnedRewards}</td>
            <td>{summary.percentOfPool}</td>
            <td>{summary.usdValueOf}</td>            
            <td>{summary.unstakedBalance}</td>
          </tr>
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

  renderTableData() {
    return this.props.data
      .filter((u) => !u.balance.isZero())
      .map((u, index) => {
        return (
          <tr key={u.asset.address}>
            <td>{u.asset.name}</td>
            <td>{ethers.utils.formatUnits(u.balance, u.asset.decimals)}</td>
          </tr>
        );
      });
  }
}
