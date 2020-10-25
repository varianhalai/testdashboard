import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { darkTheme, fonts } from "../styles/appStyles";
import { Col } from "styled-bootstrap-grid";

const TableContainer = styled.div`
  div[role="table"] {
    background-color: ${darkTheme.table.tableBackground};
    padding: 0rem 0.5rem 0rem 0rem;
  }

  .rdt_TableHeadRow {
    margin-bottom: 1.5rem;
    background: ${darkTheme.table.tableHeadBackground};
    border: ${darkTheme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${darkTheme.table.tableItemBoxShadow};
    border-radius: 0.5rem;
  }

  .rdt_TableBody {
    background: #1d1d1d;
    border: ${darkTheme.style.mainBorder};
    box-sizing: border-box;
    box-shadow: ${darkTheme.table.tableItemBoxShadow};
    border-radius: 0.5rem;
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: ${darkTheme.table.tableRowBackground};
    font-family: ${fonts.contentFont};
    color: #fff;
  }

  div[role="columnheader"] {
    color: #fff;
    background-color: ${darkTheme.table.tableHeadBackground};
    font-family: ${fonts.headerFont};
    font-size: 1.4rem;

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: #fff;
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

const AssetTable = ({ underlyings }) => {
  useEffect(() => {
    console.log("UNDERDLYINGS", underlyings);
  }, [underlyings]);
  return (
    <TableContainer>
      <DataTable
        noHeader={true}
        noDivider={true}
        columns={columns}
        noDataComponent={false}
        data={data}
      />
    </TableContainer>
  );
};

export default AssetTable;
