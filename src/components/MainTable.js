import React from "react";
import styled from "styled-components";

import harvest from "../lib/index.js";
const { ethers, utils } = harvest;

const TableContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  margin: 20px 0;
  max-width: calc(100vw - 20px);
  overflow-x: auto;
`;

const MainTableInner = styled.div`
  width: max-content;
  border-bottom: 1px solid #e5e7eb;
`;

const TableHeader = ({ className, keys }) => (
  <div className={className}>
    {keys.map((key, index) => {
      return <p key={index}>{key}</p>;
    })}
  </div>
);

const StyledTableHeader = styled(TableHeader)`
  display: grid;
  padding: 24px 15px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
  text-align: left;
`;

const MainTableHeader = styled(StyledTableHeader)`
  grid-template-columns: 1.5fr 1fr 2fr 2fr 1fr 1fr 1fr;
`;

const TableRow = styled.div`
  display: grid;
  font-size: 14px;
  padding: 15px;
  background-color: white;
  text-align: left;
`;

const MainTableRow = styled(TableRow)`
  grid-template-columns: 1.5fr 1fr 2fr 2fr 1fr 1fr 1fr;
`;

const UnderlyingTableHeader = styled(StyledTableHeader)`
  grid-template-columns: 1fr 1fr;
`;

const UnderlyingTableRow = styled(TableRow)`
  grid-template-columns: 1fr 1fr;
`;

const TotalDisplay = styled.p`
  background-color: white;
  font-size: 14px;
  padding: 24px 0;
`;

export const MainTable = ({ data, usdValue }) => {
  const keys = [
    "Pool",
    "Earning",
    "Earned Rewards",
    "Staked Balance",
    "% of Pool",
    "Value",
    "Unstaked Balance",
  ];

  return (
    <TableContainer>
      <MainTableInner>
        <MainTableHeader keys={keys} />
        {data.map(utils.prettyPosition).map((summary, index) => (
          <MainTableRow key={summary.address}>
            <div>{summary.name}</div>
            <div>{String(summary.isActive)}</div>
            <div>{summary.earnedRewards}</div>
            <div>{summary.stakedBalance}</div>
            <div>{summary.percentOfPool}</div>
            <div>{summary.usdValueOf}</div>
            <div>{summary.unstakedBalance}</div>
          </MainTableRow>
        ))}
      </MainTableInner>
      {data.length > 0 && (
        <TotalDisplay>
          Based on Coingecko prices, your staked assets and earned rewards are
          worth about <strong>{utils.prettyMoney(usdValue)}</strong>
        </TotalDisplay>
      )}
    </TableContainer>
  );
};

export const UnderlyingTable = ({ data }) => {
  const keys = ["Asset", "Underlying Balance"];

  return (
    <TableContainer>
      <UnderlyingTableHeader keys={keys} />
      {data
        .filter((u) => !u.balance.isZero())
        .map((u, index) => {
          return (
            <UnderlyingTableRow key={u.asset.address}>
              <div>{u.asset.name}</div>
              <div>{ethers.utils.formatUnits(u.balance, u.asset.decimals)}</div>
            </UnderlyingTableRow>
          );
        })}
    </TableContainer>
  );
};
