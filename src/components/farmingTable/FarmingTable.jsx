import React,{useEffect} from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import harvest from "../../lib/index";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";


import FarmTableSkeleton from './FarmTableSkeleton';
import NotStaking from './NotStaking';


const { utils } = harvest;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%:
  padding-bottom: 3rem;
  



  div[role="table"] {
    background-color: ${(props) => props.theme.table.tableBackground};
    padding: .35rem;
    
    
  }

  .rdt_TableHeadRow {
    background: ${(props) => props.theme.table.tableHeadBackground};
    border: ${(props) => props.theme.style.mainBorder};
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .rdt_TableBody {
    background: #1d1d1d;
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
    background-color: ${(props) => props.theme.table.tableRowBackground};
    font-family: ${fonts.contentFont};
    color: ${(props) => props.theme.style.primaryFontColor};
    font-size: 1.7rem;
   
   
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.table.tableHeadBackground};
    font-family: ${fonts.headerFont};
    font-size: 2rem;
    letter-spacing: -1.5px;
    
  
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
    name: "Pool",
    selector: "name",
  },
  {
    name: "Earning",
    selector: (data) => data.isActive.toString(),
    compact: true
    
  },
  {
    name: "Rewards",
    selector: "earnedRewards",
    compact: true,
    
    
  },
  {
    name: "Staked",
    selector: "stakedBalance",
    compact: true
    
    
  },
  {
    name: "% of Pool",
    selector: "percentOfPool",
    compact: true,
    
  },
  {
    name: "Unstaked",
    selector: "unstakedBalance",
    compact: true,
    
  },
  {
    name: "Value",
    selector: "usdValueOf",
    sortable: true,
    compact: true
  },
];





const FarmingTable = ({ state,setState }) => {

  const getRewards= () => {
    let result = state.summaries.map(utils.prettyPosition)
    let min = 10;
    for(let i = 0; i < result.length; i++) {
         if (result[i].earnedRewards > 0 && result[i].earnedRewards < min ) {
           min = result[i].earnedRewards
         }
    }
    console.log(min)
    setState({...state,minimumHarvestAmount: min})
 }


  return (
      <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
        
        {state.display ? 
        <TableContainer>
          {state.summaries.length === 0 ? <NotStaking state={state} />:
          <DataTable
          noHeader={true}
          noDivider={true}
          columns={columns}
          noDataComponent={false}
          data={state.summaries.map(utils.prettyPosition)}
          onRowClicked={getRewards}
          
        />  }
        </TableContainer> 
        : <FarmTableSkeleton state={state} />}
          
    </ThemeProvider>
    
  );
};

export default FarmingTable;
