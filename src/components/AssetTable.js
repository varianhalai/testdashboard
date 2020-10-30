import React from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

import harvest from "../lib/index.js";
const { ethers } = harvest;

const TableContainer = styled.div`

  
  div[role="table"] {
    ::-webkit-scrollbar {
      width: 1px;
    }
    overflow-y:scroll;
    background-color: ${(props) => props.theme.table.tableBackground};
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
  }

  .rdt_TableHeadRow {
    margin-bottom: 1rem;
    background: ${(props) => props.theme.table.tableHeadBackground};
    border: ${(props) => props.theme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${(props) => props.theme.table.tableItemBoxShadow};
    border-radius: 0.5rem;
  }

  .rdt_TableBody {
    border: ${(props) => props.theme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${(props) => props.theme.table.tableItemBoxShadow};
    border-radius: 0.5rem;
    ::-webkit-scrollbar {
      width: 1px;
    }
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: ${(props) => props.theme.table.tableRowBackground};
    font-family: ${fonts.contentFont};
    font-size: 1.4rem;
    color: ${(props) => props.theme.style.primaryFontColor};
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.table.tableHeadBackground};
    font-family: ${fonts.headerFont};
    font-size: 1.4rem;

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: ${(props) => props.theme.style.primaryFontColor};
    }
  }
`;


const noAssetColumns = [
  {
    name: "You currently have no assets",
    // selector: (data) => data.asset.name,
    selector: "asset",
    center: true
  },
]
const noAssetData = [
  {
    id:0,
    asset: 'Add assets below'
  },
]
const columns = [
  {
    name: "Asset",
    selector: (data) => data.asset.name,
    
  },
  {
    name: "Underlying Balance",
    selector: (data) =>
      ethers.utils.formatUnits(data.balance, data.asset.decimals),
    grow: 2
    
  },
];

const AssetTable = ({ state }) => {
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
        <TableContainer>
          {state.underlyings.length ? <DataTable
            noHeader={true}
            noDivider={true}
            columns={columns}
            noDataComponent={false}
            data={state.underlyings}
          /> : 
          <DataTable
            noHeader={true}
            noDivider={true}
            columns={noAssetColumns}
            noDataComponent={false}
            data={noAssetData}
          />}
        </TableContainer>
      
    </ThemeProvider>
  );
};

export default AssetTable;
