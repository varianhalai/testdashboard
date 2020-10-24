import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

import harvest from "../lib/index.js";
const { ethers, utils } = harvest;

const TableContainer = styled.div`
  div[role="table"] {
    background-color: #000;
    padding: 0rem 0.5rem 0rem 0rem;
  }

  .rdt_TableHeadRow {
    margin-bottom: 1.5rem;
    background: #252525;
    border: 3px solid #363636;
    box-sizing: border-box;
    box-shadow: 0.3rem 0.3rem 0px #363636;
    border-radius: 0.5rem;
    font-size: 2rem;
  }

  .rdt_TableBody {
    background: #1d1d1d;
    border: 3px solid #363636;
    box-sizing: border-box;
    box-shadow: 0.3rem 0.3rem 0px #363636;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: #1d1d1d;
    font-family: TechnaSans;
    font-size: 1.8rem;
    color: #fff;
  }

  div[role="columnheader"] {
    color: #fff;
    background-color: #252525;
    font-family: DDIN;
    font-size: 2rem;

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: #fff;
    }
  }
`;

const columns = [
  {
    name: "pool",
    selector: "name",
  },
  {
    name: "earning",
    selector: (data) => data.isActive.toString(),
  },
  {
    name: "rewards",
    selector: "earnedRewards",
  },
  {
    name: "staked",
    selector: "stakedBalance",
  },
  {
    name: "% of pool",
    selector: "percentOfPool",
  },
  {
    name: "unstaked",
    selector: "unstakedBalance",
  },
  {
    name: "value",
    selector: "usdValueOf",
    sortable: true,
  },
];

const FarmingTable = ({ data, usdValue }) => {
  return (
    <TableContainer>
      <DataTable
        noHeader={true}
        noDivider={true}
        columns={columns}
        noDataComponent={false}
        data={data.map(utils.prettyPosition)}
      />
    </TableContainer>
  );
};

export default FarmingTable;
