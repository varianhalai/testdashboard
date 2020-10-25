import React,{useEffect} from 'react';
import styled from 'styled-components';
import {style, fonts} from '../styles/appStyles';
import {Col} from "styled-bootstrap-grid";
import harvest from "../lib/index.js";
const { ethers } = harvest;

const GreenPanel = styled.div`
  position: relative;
  background-color: #212121;
  color: #fff;
  font-size: 1.4rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${style.panelBoxShadow};
  height: 14rem;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;

  &.net-worth {
      margin-top: 4rem;
  }

`;


const BalanceAndAPY = () => {
    return (
        
    <>
    <Col col lg="12">
        <GreenPanel>
            APY
        </GreenPanel>
    </Col>
    <Col col lg="12">
        <GreenPanel className='net-worth'>
            NET WORTH
        </GreenPanel>
    </Col>
    </>
     
      
    
       
    );
}

export default BalanceAndAPY;
