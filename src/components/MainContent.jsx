import React from 'react';
import { Row, Col } from "styled-bootstrap-grid";

import FarmTableSkeleton from "../components/farmingTable/FarmTableSkeleton.jsx";
import AssetTable from "../components/assetTable/AssetTable.jsx";
import Harvest from "../components/harvest/Harvest.jsx";
import StakePanel from "../components/stakePanel/StakePanel.jsx";
import Balance from "../components/balance/Balance.jsx";
import APY from "../components/apy/APY.jsx";
import AddTokens from "../components/addTokens/AddTokens";

import Loadable from 'react-loadable';




const MainContent = ({state, setState,openModal}) => {

    const FarmingTable = Loadable({
        loader: () => import('./farmingTable/FarmingTable'),
        loading() {
          return <FarmTableSkeleton state={state}/>
        }
      })
    return (
        <div className='main-content'>
            <Row >
                <Col >
                <FarmingTable state={state} setState={setState} />
                </Col>
            </Row>

            <Row style={{marginTop:"15px"}}>
                {/* Git hub pages would not recognize the margin from the bootstrap grid */}
                <Col lg="6">
                <Harvest state={state} setState={setState} />
                </Col>
                <Col lg="4">
                <StakePanel state={state} openModal={openModal} />
                </Col>
                <Col lg="2">
                <Balance state={state}/>  
                </Col>
                
                
                </Row>
                <Row style={{marginTop:"15px"}}>
                {/* Git hub pages would not recognize the margin from the bootstrap grid */}
                <Col lg ="6">
                <AddTokens state={state} />
                </Col>
                <Col lg="4">
                <AssetTable state={state} />
                </Col>
                <Col lg="2">
                <APY state={state} setState={setState} />
                </Col>
                </Row>
                
            
        </div>
    );
}

export default MainContent;
