import React,{useState} from "react";
import styled from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";

import harvest from "./lib/index.js";

// components

import { UnderlyingTable } from "./components/MainTable.js";

import Wallet from "./components/Wallet";
import FarmingTable from "./components/FarmingTable";
import AssetTable from './components/AssetTable';
import Harvest from "./components/Harvest";
import StakePanel from './components/StakePanel';
import {style,fonts} from './styles/appStyles';
import BalanceAndAPY from "./components/BalanceAndAPY.jsx";

const { ethers } = harvest;

const Panel = styled.div`
  position: relative;
  padding: 1.5rem;
  border: ${style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0rem;
  margin-top: -1.5rem;
  background-color: ${style.panelBackground};
  z-index: 1;
  box-sizing: border-box;
  box-shadow: ${style.panelBoxShadow};

  &.four-corner {
    border-top-left-radius: 1rem;
    background-color: #1d1d1d;
    color: #fff;
    font-size: 1.6rem;
    font-family: TechnaSans;
  }
  
`;

const PanelContainer = styled.div`
  margin-top: 5rem;
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 0.4rem;
  border-top: ${style.smallerBorder};
  border-left: ${style.smallerBorder};
  border-right: ${style.smallerBorder};
  padding: 0.75rem 1.25rem;
  padding-bottom: 2.25rem;
  background-color: ${style.panelTabBG};
  box-sizing: border-box;
  box-shadow: ${style.panelTabBoxShadow};
  font-size: 2.6rem;
  font-weight: 700;
  cursor: pointer;

  a {
    color: ${style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.headerFont};
  }

  &.wiki-tab {
    position: relative;
    background-color: ${style.wikiTabBG};
    top: 0.5rem;

    &:hover {
      top: 0rem;

      a {
        top: 0rem;
      }
    }

    a {
      color: #fff;
      position: relative;
      top: -0.5rem;
    }
  }
`;

const PanelTabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

function App () {
  
  const [state,setState] = useState({
      provider: undefined,
      signer: undefined,
      manager: undefined,
      address: '',
      summaries: [],
      underlyings: [],
      usdValue: 0,
      showErrorModal: false,
  })


 const disconnect = () => {
    setState({
      provider: undefined,
      signer: undefined,
      manager: undefined,
      address: '',
      summaries: [],
      underlyings: [],
      usdValue: 0,
      showErrorModal: false,
    });
  }

 const setConnection = ( provider, signer, manager ) => {
    
  setState({...state,provider: provider,signer:signer,manager:manager});
}
  

 const setAddress = (address) => {
    setState((state) => ({...state,address: address}));
  }
  

  const refresh = () => {
    state.manager
      .aggregateUnderlyings(state.address)
      .then((underlying) =>
        underlying.toList().filter((u) => !u.balance.isZero()),
      )
      .then((underlyings) => {
        setState({...state,underlyings:underlyings});
        return underlyings;
      });

    state.manager
      .summary(state.address)
      .then((summaries) =>
        summaries.filter(
          (p) =>
            !p.summary.earnedRewards.isZero() ||
            !p.summary.stakedBalance.isZero() ||
            (p.summary.isActive && !p.summary.unstakedBalance.isZero()),
        ),
      )
      .then((summaries) => {
        let total = ethers.BigNumber.from(0);
        summaries.forEach((pos) => {
          total = total.add(pos.summary.usdValueOf);
        });
        setState((state) => ({ ...state,summaries:summaries, usdValue: total }));
        return summaries;
      });
  }

 const exitInactiveButtonAction = () => {
    state.manager.exitInactive();
  }

 

  // const renderExitInactiveButton = () => {
  //   let inactivePools = state.summaries.filter(
  //     (sum) => sum.stakedBalance && !sum.isActive,
  //   );
  //   if (inactivePools.length !== 0) {
  //     return (
  //       <div>
  //         <button
  //           disabled={!state.provider}
  //           onClick={exitInactiveButtonAction}
  //         >
  //           Exit inactive pools
  //         </button>
  //       </div>
  //     );
  //   }
  //   return null;
  // }
  
 

  const renderUnderlyingTable = () => {
    if (state.underlyings.length !== 0) {
      return (
        <div>
          <p>
            Your position includes LP tokens that can be redeemed for the
            following:
          </p>
          <UnderlyingTable data={state.underlyings}></UnderlyingTable>
        </div>
      );
    }
    return null;
  }

  
//  const renderRefreshButton = () => {
//   const buttonText =
//     state.summaries.length === 0
//       ? "Click to load the table!"
//       : "Refresh Table";

//   return (
//     <div>
//       <button
//         disabled={!state.provider || state.summaries.length === 0} // disable if, on initial, the table is still loading
//         onClick={refresh}
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// } 
//     const refreshBtn = renderRefreshButton();
    // const exitInactive = renderExitInactiveButton();
    // const underlyingTable = renderUnderlyingTable();

    return (
      <Container>
        <Row>
          <Col col>
            <main>
              <PanelContainer>
                <PanelTabContainer>
                  <PanelTab>
                    <a href="https://harvest.finance">harvest.finance</a>
                  </PanelTab>
                  <PanelTab className="wiki-tab">
                    <a
                      href="https://farm.chainwiki.dev/en/home"
                      target="_blank"
                    >
                      wiki
                    </a>
                  </PanelTab>
                </PanelTabContainer>

                <Panel>
                  <Wallet
                    state={state}
                    setState = {setState}
                    disconnect={disconnect}
                    setConnection={setConnection}
                    setAddress={setAddress}
                    refresh={refresh}
                    provider={state.provider}
                    address={state.address}
                  />
                  <FarmingTable
                    data={state.summaries}
                    usdValue={state.usdValue}
                  />

                
                <Row>
                  <Col lg='4'>
                    <Harvest
                      provider={state.provider}
                      manager={state.manager}
                    />
                    <StakePanel
                      provider={state.provider}
                      manager={state.manager}
                    />
                    </Col>
                    <AssetTable 
                      underlyings={state.underlyings}
                      />
                    <Col lg='4'>
                    <BalanceAndAPY />
                  </Col>
                  </Row>
                </Panel>
              </PanelContainer>
            </main>
            
          </Col>
        </Row>

        
      
      </Container>
    );
  
    }





export default App;
