import React from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import AssetTableSkeleton from './AssetTableSkeleton'
import harvest from "../../lib/index.js";
const { ethers } = harvest;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100.3%;
  position: relative;
  
  
  
  
  
 
  

  div[role="table"] {
    background-color: ${(props) => props.theme.style.panelBackground};
    border-top-left-radius: 0rem;
    padding-right: .35rem;
    padding-bottom: .35rem;
    
    
    
  }

  .rdt_TableHeadRow {
    
    border: ${(props) => props.theme.style.mainBorder};
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    background-color: ${(props) => props.theme.style.lightBackground};
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0rem;
  }

  .rdt_TableBody {
   
    border-left: ${(props) => props.theme.style.mainBorder};
    border-right: ${(props) => props.theme.style.mainBorder};
    border-bottom: ${(props) => props.theme.style.mainBorder};
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;

  }

  .rdt_TableRow {
    
    font-family: ${fonts.contentFont};
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.style.lightBackground};
    padding: 1rem ;
    font-size: 1.7rem;
    
   
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.headerFont};
    font-size: 2rem;
    padding: 1rem .5rem;
    letter-spacing: -1px;
    
   
    
    
    
    

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: ${(props) => props.theme.style.primaryFontColor};
    }
  }
`;



const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 2rem 2rem;
  background-color: ${(props) => props.theme.style.highlight};
  box-shadow: ${(props) => props.theme.style.panelTabBoxShadow};
  position: relative;
  top: 1.2rem;
  color: ${(props) => props.theme.style.buttonFontColor};

  
  

  p {
    color: ${(props) => props.theme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.contentFont};
    font-size: 2rem;
    position: relative;
    top: .1rem;
    @media(max-width: 500px) {
      font-size: 1.5rem;
      top: .3rem;
    }
    
   
  }
  @media(max-width: 605px) {
    font-size: 1.9rem;
    padding: 0.75rem 1rem 2.2rem 1rem;
    position: relative;
    top: .1rem;
    
  }
  @media(max-width: 550px) {
    margin-right: .5rem;
  }
  @media(max-width: 380px) {
    font-size: 1.5rem;
    padding: 0.75rem .75rem 2rem .75rem;
    position: relative;
    margin-right: .5rem;
    top: .5rem;
    p {
      top: .4rem;
    }
  }
  @media(max-width: 333px) {
    margin-right: .3rem;
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
    center: true
    
    
  },
  {
    name: "Underlying Balance",
    selector: (data) =>
      ethers.utils.formatUnits(data.balance, data.asset.decimals),
    center: true,
  },
];



const AssetTable = ({ state }) => {
  
  
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ? <PanelTabContainerLeft> 
          <PanelTab>
            <p>
              your underlying assets
            </p>
          </PanelTab> 
          </PanelTabContainerLeft> : null}
     

        {state.display ? <TableContainer>
          {state.underlyings.length ? <DataTable
            noHeader={true}
            noDivider={true}
            columns={columns}
            noDataComponent={false}
            data={state.underlyings}
            overflowY={true}
          /> : 
          <DataTable
            noHeader={true}
            noDivider={true}
            columns={noAssetColumns}
            noDataComponent={false}
            data={noAssetData}
          />}
        </TableContainer> : <AssetTableSkeleton state={state} />}
      
    </ThemeProvider>
  );
};

export default AssetTable;
