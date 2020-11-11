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
  width: 99%:
  padding-bottom: 3rem;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  color: ${(props) => props.theme.style.primaryFontColor};
  border-radius: .5rem;
  

  



  
`;



const MainTableInner = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
  scrollbar-color: ${(props) => props.theme.style.blueBackground} ${(props) => props.theme.style.lightBackground} ;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 100%;
    height: .8rem;
    margin-top: -1.8rem
    
  }
  ::-webkit-scrollbar-track:no-button { 
    width: 100%;
    border-radius: .5rem;
    background-color: ${(props) => props.theme.style.lightBackground};
  }
  ::-webkit-scrollbar-button {
    color: ${(props) => props.theme.style.primaryFontColor};
    
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: black;
    background-color: ${(props) => props.theme.style.blueBackground};
 }
`;
const MainTableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr 3fr 3fr 3fr ;
  grid-gap: 20px;
  font-size: 2rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem 1rem;
  width: 180rem;
  div {
    margin: 0 1rem;
    min-width: 10rem;
  }
  border-bottom: 1px solid black;
`;
const MainTableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr 3fr 3fr 3fr ;
  grid-gap: 20px;
  font-size: 2rem;
  font-family: ${fonts.headerFont};
  padding: 1.5rem 1rem;
  border-bottom: 2px black solid;
  width: 180rem;
  p {
    margin: 0 1rem;
    min-width: 10rem;
  }

`;
// const StyledTableHeader = styled(TableHeader)`
//   display: grid;
//   padding: 24px 15px;
//   border-bottom: 1px solid #e5e7eb;
//   font-size: 13px;
//   text-align: left;
// `;




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
    setState({...state,minimumHarvestAmount: min})
 }




  return (
      <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
        
        {state.display ? 
        <TableContainer>
          {state.summaries.length === 0 ? <NotStaking state={state} />:
          <MainTableInner>
          <MainTableHeader>{columns.map(col => {
            return (
              <p>{col.name}</p>
            )
          })}</MainTableHeader>
          {state.summaries.map(utils.prettyPosition).map((summary, index) => (
          <MainTableRow key={summary.address}>
            <div>{summary.name}</div>
            <div>{String(summary.isActive)}</div>
            <div>{parseFloat(summary.earnedRewards).toFixed(10)}</div>
            <div>{parseFloat(summary.stakedBalance).toFixed(10)}</div>
            <div>{summary.percentOfPool}</div>
            <div>{summary.usdValueOf}</div>
            <div>{parseFloat(summary.unstakedBalance).toFixed(10)}</div>
          </MainTableRow>
        ))}
         
        </MainTableInner> }
        </TableContainer> 
        : <FarmTableSkeleton state={state} />}
          
    </ThemeProvider>
    
  );
};

export default FarmingTable;
