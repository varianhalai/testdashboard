import React,{useEffect} from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import {style,fonts,table} from '../styles/appStyles';
import { Col } from "styled-bootstrap-grid";

const TableContainer = styled.div`
width: 100%;
text-align: center;
div[role="table"] {
    background-color: ${table.tableBG};
    padding: 0rem 0.5rem 0rem 0rem;
  }

  .rdt_TableHeadRow {
    margin-bottom: 1.5rem;

    background: ${table.tableHeadBG};
    border: ${style.smallerBorder};
    box-sizing: border-box;
    box-shadow: ${table.tableItemBoxShadow};
    border-radius: 0.5rem;
    font-size: 2rem;
  }

  .rdt_TableBody {
    background: #1d1d1d;
    border: ${style.smallerBorder};
    box-sizing: border-box;
    box-shadow: ${table.tableItemBoxShadow};
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .rdt_TableRow {
    border-bottom: 0px;
    background-color: ${table.tableRowBG};
    font-family: ${fonts.contentFont};
    font-size: 1.8rem;
    color: #fff;
  }

  div[role="columnheader"] {
    color: #fff;
    background-color: ${table.tableHeadBG};
    font-family: ${fonts.headerFont};
    font-size: 2rem;

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: #fff;
    }
  }

  .no-balance {
      color: white;
  }
`;
const columns = [
    {
        name: 'asset',
        selector: 'asset'
    },
    {
        name: 'value',
        selector: 'value'
    },
    {
      
    }


]
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


const AssetTable = ({underlyings}) => {
    useEffect(() => {
      console.log(underlyings)
      
    },[underlyings])
    return (
      
        <Col col lg='4'>
        <TableContainer>
        <DataTable
        noHeader={true}
        noDivider={true}
        columns={columns}
        noDataComponent={false}
        data={data}
        />


        </TableContainer>
        </Col>
    );
}

export default AssetTable;
