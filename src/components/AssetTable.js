import React from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

import harvest from "../lib/index.js";
const { ethers } = harvest;

const TableContainer = styled.div`
  ::-webkit-scrollbar {
    width: .1rem;
  };
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102%;

  @media(max-width: 1100px) {
    width: 101%;
  }
  @media(max-width: 600px) {
    margin-top: 1rem;
  }
  
 
  

  div[role="table"] {
    background-color: ${(props) => props.theme.table.tableBackground};
    padding-bottom: 1rem;
    padding-right: .5rem;
    overflow-y: scroll;
    max-height: 18rem;
    ::-webkit-scrollbar {
      width: .1rem;
    }
    
    
  }

  .rdt_TableHeadRow {
    background: ${(props) => props.theme.table.tableHeadBackground};
    border: ${(props) => props.theme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .rdt_TableBody {
   
    border-left: ${(props) => props.theme.style.mainBorder};
    border-right: ${(props) => props.theme.style.mainBorder};
    border-bottom: ${(props) => props.theme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    
  }

  .rdt_TableRow {
    background-color: ${(props) => props.theme.table.tableRowBackground};
    font-family: ${fonts.contentFont};
    color: ${(props) => props.theme.style.primaryFontColor};
    padding: 1rem;
    font-size: 1.4rem;
    @media(max-width: 1300px) {
      padding: .75rem;
      font-size: 1.2rem;
    }
    @media(max-width: 330px) {
      font-size: .9rem;
    }
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.table.tableHeadBackground};
    font-family: ${fonts.headerFont};
    font-size: 1.6rem;
    padding: 1rem;
    letter-spacing: -1px;
    @media(max-width: 330px) {
      font-size: 1.2rem;
    }
    

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
    asset: 'Add assets to get started'
  },
]
const columns = [
  {
    name: "Asset",
    selector: (data) => data.asset.name,
    compact: true
    
    
  },
  {
    name: "Underlying Balance",
    selector: (data) =>
      ethers.utils.formatUnits(data.balance, data.asset.decimals),
    grow: 2,
    compact: true,
    
    
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
            responsive={true}
          />}
        </TableContainer>
      
    </ThemeProvider>
  );
};

export default AssetTable;
