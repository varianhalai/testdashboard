import React,{useState,useEffect} from "react";
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
    max-height: 23.2rem;
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

const columns = [
  {
    name: "Pool",
    selector: "name",
  },
  {
    name: "Earning",
    selector: (data) => data.isActive.toString(),
    compact: true,
    hide: 'md'
  },
  {
    name: "Rewards",
    selector: "earnedRewards",
    compact: true,
    hide: 'md'
  },
  {
    name: "Staked",
    selector: "stakedBalance",
    hide: 'sm'
    
  },
  {
    name: "% of Pool",
    selector: "percentOfPool",
    compact: true,
    hide: 'md'
  },
  {
    name: "Unstaked",
    selector: "unstakedBalance",
    compact: true,
    hide: 'lg'
  },
  {
    name: "Value",
    selector: "usdValueOf",
    sortable: true,
  },
];



const FarmingTable = ({ state }) => {

  

  const [displayTable,setDisplay]=useState(false);

  useEffect(() => {
    if(state.apy) {
      setDisplay(true)
    }
  },[state.apy,state.summaries.length])

  return (
      <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
        
        {displayTable ? 
        <TableContainer>
          {state.summaries.length === 0 ? <NotStaking state={state} />:
          <DataTable
          noHeader={true}
          noDivider={true}
          columns={columns}
          noDataComponent={false}
          data={state.summaries.map(utils.prettyPosition)}
        />  }
        </TableContainer> 
        : <FarmTableSkeleton state={state} />}
          
    </ThemeProvider>
    
  );
};

export default FarmingTable;
