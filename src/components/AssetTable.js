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
    min-height: 22.5rem;
    max-height: 22.5rem;
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
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: ${(props) => props.theme.table.tableRowBackground};
    font-family: ${fonts.contentFont};
    color: ${(props) => props.theme.style.primaryFontColor};
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.table.tableHeadBackground};
    font-family: ${fonts.headerFont};
    font-size: 1.8rem;

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: ${(props) => props.theme.style.primaryFontColor};
    }
  }
`;

const Note = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: ${(props) => props.theme.style.primaryFontColor};
`;

const data = [
  {
    id:0,
    asset: 'USDC',
    value: '$144'
  },
  {
    id:1,
    asset: 'ETH',
    value: '23.42'
  },
  {
    id:2,
    asset: 'FARM',
    value: '29.15'
  },
  {
    id:3,
    asset: 'USDC',
    value: '$144'
  },
  {
    id:4,
    asset: 'ETH',
    value: '23.42'
  },
  {
    id:5,
    asset: 'FARM',
    value: '29.15'
  },
]
const columns = [
  {
    name: "Asset",
    // selector: (data) => data.asset.name,
    selector: "asset"
  },
  {
    name: "Underlying Balance",
    // selector: (data) =>
    //   ethers.utils.formatUnits(data.balance, data.asset.decimals),
    selector: 'value'
  },
];

const AssetTable = ({ state }) => {
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {/* {state.underlyings.length && ( */}
        <TableContainer>
          {/* <Note>*Your staked assets underlying values</Note> */}
          <DataTable
            noHeader={true}
            noDivider={true}
            columns={columns}
            noDataComponent={false}
            data={data}
            
          />
        </TableContainer>
      
    </ThemeProvider>
  );
};

export default AssetTable;
