import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import harvest from "../lib/index.js";
import {style,fonts,table} from '../styles/appStyles';

const { utils } = harvest;

const TableContainer = styled.div`
  div[role="table"] {
    background-color: ${table.tableBG};
    padding: 0rem 0.5rem 0rem 0rem;
  }

  .rdt_TableHeadRow {
    margin-bottom: 1.5rem;
    background: ${table.tableHeadBG};
    border: ${style.smallerBorder};
    box-sizing: border-box;
    box-shadow: ${table.tableItemBoxShadow};
    border-radius: 0.5rem;
    font-size: 2rem;
  }

  .rdt_TableBody {
    background: #1d1d1d;
    border: ${style.smallerBorder};
    box-sizing: border-box;
    box-shadow: ${table.tableItemBoxShadow};
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: ${table.tableRowBG};
    font-family: ${fonts.contentFont};
    font-size: 1.8rem;
    color: #fff;
  }

  div[role="columnheader"] {
    color: #fff;
    background-color: ${table.tableHeadBG};
    font-family: ${fonts.headerFont};
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
