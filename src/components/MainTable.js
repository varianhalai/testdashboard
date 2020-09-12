import React, {Component} from 'react';

import harvest from '../lib/index.js';

export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.keys = [
      'Pool',
      'Earning',
      'Staked Balance',
      'Unstaked Balance',
      'Earned Rewards',
      'Pool%',
    ];
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

  renderTableData() {
    return this.props.data
      .map(harvest.utils.prettyPosition)
      .map((summary, index) => {
        return (
          <tr key={summary.address}>
            <td>{summary.name}</td>
            <td>{String(summary.isActive)}</td>
            <td>{summary.stakedBalance}</td>
            <td>{summary.unstakedBalance}</td>
            <td>{summary.earnedRewards}</td>
            <td>{summary.percentOfPool}</td>
          </tr>
        );
      });
  }
}
