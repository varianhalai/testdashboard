import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

const TableContainer = styled.div`
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
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: ${(props) => props.theme.table.tableRowBackground};
    font-family: ${(props) => props.theme.contentFont};
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
const columns = [
  {
    name: "Asset",
    selector: "asset",
  },
  {
    name: "Underlying Balance",
    selector: "value",
  },
];
const data = [
  {
    id: 0,
    asset: "USDC",
    value: "144",
  },
  {
    id: 1,
    asset: "ETH",
    value: "23.42",
  },
  {
    id: 2,
    asset: "FARM",
    value: "29.15",
  },
];

const AssetTable = ({ state }) => {
  useEffect(() => {
    console.log("UNDERDLYINGS", state.underlyings);
  }, [state.underlyings]);
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <TableContainer>
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
