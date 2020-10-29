import React from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import harvest from "../lib/index.js";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";
import Loader from 'react-loader-spinner'

const { utils } = harvest;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div[role="table"] {
    background-color: ${(props) => props.theme.table.tableBackground};
    padding: 0rem 0.5rem 0rem 0rem;
  }

  .rdt_TableHeadRow {
    margin-bottom: 1.5rem;
    background: ${(props) => props.theme.table.tableHeadBackground};
    border: ${(props) => props.theme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${(props) => props.theme.table.tableItemBoxShadow};
    border-radius: 0.5rem;
  }

  .rdt_TableBody {
    background: #1d1d1d;
    border: ${(props) => props.theme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${(props) => props.theme.table.tableItemBoxShadow};
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: ${(props) => props.theme.table.tableRowBackground};
    font-family: ${fonts.contentFont};
    color: ${(props) => props.theme.style.primaryFontColor};
    font-size: 1.7rem;
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.table.tableHeadBackground};
    font-family: ${fonts.headerFont};
    font-size: 2.2rem;

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: ${(props) => props.theme.style.primaryFontColor};
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

const FarmingTable = ({ state }) => {
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <TableContainer>
      {state.summaries.length ===0 ? <Loader
         type="TailSpin"
         color = {state.theme === "dark" ? '#42857D' : "#A2E7DB"}
         height={100}
         width={100}
 
      /> : 
      <DataTable
        noHeader={true}
        noDivider={true}
        columns={columns}
        noDataComponent={false}
        data={state.summaries.map(utils.prettyPosition)}
      />}
    </TableContainer>
      
    </ThemeProvider>
  );
};

export default FarmingTable;
