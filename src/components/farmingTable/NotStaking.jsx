import React from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";



const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  padding-bottom: 3rem;



  div[role="table"] {
      width: 100%;
    background-color: ${(props) => props.theme.table.tableBackground};
    padding: .35rem;
    overflow-y: scroll;
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
    background: #1d1d1d;
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
    font-size: 1.5rem;
    
    @media(max-width: 1090px) {
      font-size: 1.2rem;
      
    }
    @media(max-width: 760px) {
      font-size: 1.5rem;
      
    }
    @media(max-width: 330px) {
      font-size: .9rem;
    }
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.table.tableHeadBackground};
    font-family: ${fonts.headerFont};
    font-size: 1.7rem;
    letter-spacing: -1.5px;
    @media(max-width: 1400px) {
      font-size: 1.6rem;
      
    }
    @media(max-width: 1090px) {
      font-size: 1.4rem;
      
    }
    media(max-width: 760px) {
      font-size: 1.7rem;
      
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
      name: "You currently are not staking any assets",
      // selector: (data) => data.asset.name,
      selector: "asset",
      center: true
    },
  ]
  const noAssetData = [
    {
      id:0,
      asset: 'Add assets to get started',
      center: true
    },
  ]



const NotStaking = ({ state }) => {


  return (
      <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
        
        <TableContainer>
          <DataTable
          noHeader={true}
          noDivider={true}
          columns={noAssetColumns}
          noDataComponent={false}
          data={noAssetData}
          />

        </TableContainer>    
    </ThemeProvider>
    
  );
};

export default NotStaking;
