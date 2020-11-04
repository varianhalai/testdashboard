import React,{useEffect} from 'react';
import styled from 'styled-components';
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";
import harvest from "../lib/index";
import detectEthereumProvider from "@metamask/detect-provider"

const { ethers } = harvest;

const Panel = styled.div`
  position: relative;
  padding: 2.5rem 2.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0rem;
  margin-top: -1.5rem;
  background-color: ${(props) => props.theme.style.panelBackground};
  z-index: 1;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  
  &.welcome-text {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 0.5rem;
    h1 {
      font-size: 2.5rem;
      font-family: ${fonts.headerFont};
      margin: 1rem 0;
    }
    h4 {
      font-size: 2rem;
      font-family: ${fonts.contentFont};
      margin: 1rem 0;
    } h6 {
      font-family: ${fonts.headerFont};
      width: 60%;
      margin: 1rem auto;
      font-family: ${fonts.contentFont};
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
    button {
      font-size: 1.5rem;
      font-family: ${fonts.headerFont};
      margin: 1rem 0;
      position: relative;
      &:hover {
        top: 1.5px;
      }

      .foot-note {
        font-family: font-family: ${fonts.contentFont};
      }
    }
  }

  
  
`;

const WelcomeText = 
    ({
        disconnect,
        refresh,
        setAddress,
        setConnection,
        openModal,
        state,
    }) => {

        useEffect(() => {
            if (state.address !== "") {
              refresh(state);
            }
          }, [state.address]);

    const connectMetamask = (signer, manager) => {
        detectEthereumProvider().then((provider) => {
          if (!provider) {
            openModal(
              "No provider, please install a supported Web3 wallet.",
              "error",
            );
          } else {
            window.ethereum.enable().then(() => {
              setProvider(provider);
            });
          }
        });
      };

      const setProvider = async (provider) => {
        const ethersProvider = new ethers.providers.Web3Provider(provider);
    
        const signer = ethersProvider.getSigner();
    
        const manager = harvest.manager.PoolManager.allPastPools(
          signer ? signer : provider,
        );
    
        setConnection(provider, signer, manager);
    
        window.ethereum.on("accountsChanged", () => {
          disconnect();
        });
    
        // get the user address
        signer
          .getAddress() // refreshButtonAction called initially to load table
          .then((address) => {
            setAddress(address);
          });
      };
    return (
        <Panel className='welcome-text'>
                    
            <h1>Harvest Finance Dashboard</h1>
            <h4>Connect a wallet to get started</h4>
            <button 
            className='button'
            onClick={() => connectMetamask(state.provider)}
            >Connect Wallet</button>
            <h6 className='foot-note'>You will need a web3 wallet such as metamask to access this application.</h6>
            
        </Panel>
    );
}

export default WelcomeText;
