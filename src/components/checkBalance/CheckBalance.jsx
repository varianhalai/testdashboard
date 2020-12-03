import React,{useState,useEffect} from 'react';
import styled,{ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme, fonts} from '../../styles/appStyles';
import web3 from '../../lib/web3';

// images
import logo from "../../assets/logo.png";
import usdcIcon from "../../assets/png_usdc_56px@3x.png";
import usdtIcon from "../../assets/png_usdt_56px@3x.png";
import daiIcon from "../../assets/png_dai_56px@3x.png";
import wbtcIcon from "../../assets/png_wbtc_56px@3x.png";
import frenbtcIcon from "../../assets/png_frenbtc_56px@3x.png";
import crvrenwbtcIcon from "../../assets/png_crvrenwbtc_56px@3x.png";
import sushi from '../../assets/sushi_wbtc.svg'
import yearn from '../../assets/yearn.png'
import crv3 from '../../assets/3CRV.png'
import wbtc from '../../assets/eth_wbtc.svg';
import usdt from '../../assets/eth_usdt.svg';
import usdc from '../../assets/eth_usdc.svg';
import ethDai from '../../assets/eth_dai.svg';

const CheckBalance = (props) => {
    const [addressToCheck,setAddresToCheck] = useState('');
    const [assetsToCheck,setAssetsToCheck] = useState([]);
    const tokens = [
        {
          id:0,
          name: "FARM",
          symbol: "FARM",
          url: "https://harvestfi.github.io/add-farm/",
          image: logo,
          address: '0xa0246c9032bC3A600820415aE600c6388619A14D',
          decimals: 18,
        },
        {
          id: 1,
          name: "fUSDC",
          symbol: "fUSDC",
          url: "https://harvestfi.github.io/add-fusdc/",
          image: usdcIcon,
          address: '0xc3f7ffb5d5869b3ade9448d094d81b0521e8326f',
          decimals: 18,
        },
        {
          id: 2,
          name: "fUSDT",
          symbol: "fUSDT",
          url: "https://harvestfi.github.io/add-fusdt/",
          image: usdtIcon,
          address: '0x053c80eA73Dc6941F518a68E2FC52Ac45BDE7c9C',
          decimals: 18,
        },
        {
          id: 3,
          name: "fDAI",
          symbol: "fDAI",
          url: "https://harvestfi.github.io/add-fdai/",
          image: daiIcon,
          address: '0x5d9d25c7C457dD82fc8668FFC6B9746b674d4EcB',
          decimals: 18,
        },
        {
          id: 4,
          name: "fwBTC",
          symbol: "fwBTC",
          url: "https://harvestfi.github.io/add-fwbtc/",
          image: wbtcIcon,
          address: '0x5d9d25c7C457dD82fc8668FFC6B9746b674d4EcB',
          decimals: 8,
        },
        {
          id: 5,
          name: "yCRV",
          symbol: "yCRV",
          image: yearn,
          address: "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
          decimals: 18,
        },
        {
          id: 6,
          name: "3CRV",
          url: "https://harvestfi.github.io/add-3crv/",
          image: crv3,
          address: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
          decimals: 18,
        },
        {
          id: 7,
            name: "frenBTC",
            symbol: "frBTC",
            image: frenbtcIcon,
            address: '0xC391d1b08c1403313B0c28D47202DFDA015633C4',
            decimals: 18,
          },
          {
            id: 8,
            name: "fcrvRenWBTC",
            symbol: "fcrBTC",
            image: crvrenwbtcIcon,
            address: '0x9aA8F427A17d6B0d91B6262989EdC7D45d6aEdf8',
            decimals: 18,
          },
          {
            id: 9,
            name: "SUSHI:WBTC-TBTC",
            image: sushi,
            address: '0x2dbc7dd86c6cd87b525bd54ea73ebeebbc307f68',
            decimals: 18,
          },
          {
            id: 10,
            name: "UNI:ETH-WBTC",
            image: wbtc,
            address: '0x2dbc7dd86c6cd87b525bd54ea73ebeebbc307f68',
            decimals: 18,
          },
          {
            id: 11,
            name: "UNI:ETH-USDT",
            symbol: 'UNI-V2',
            image: usdt,
            address: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
            decimals: 18,
          },
          {
            id: 12,
            name: "UNI:ETH-USDCT",
            symbol: 'UNI-V2',
            image: usdc,
            address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
            decimals: 18,
          },
          {
            id: 13,
            name: "UNI:ETH-DAI",
            symbol: 'UNI-V2',
            image: ethDai,
            address: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
            decimals: 18,
          }
        
      ];

    const readOnly = async (walletAddress,tokenAddress) => {

        
        // The minimum ABI to get ERC20 Token balance
        let minABI = [
          // balanceOf
          {
            "constant":true,
            "inputs":[{"name":"_owner","type":"address"}],
            "name":"balanceOf",
            "outputs":[{"name":"balance","type":"uint256"}],
            "type":"function"
          },
          // decimals
          {
            "constant":true,
            "inputs":[],
            "name":"decimals",
            "outputs":[{"name":"","type":"uint8"}],
            "type":"function"
          }
        ];
        // Get ERC20 Token contract instance
        let contract = new web3.eth.Contract(minABI, tokenAddress);
        // calculate a balance
       let balance = await contract.methods.balanceOf(walletAddress).call();
       let result = parseFloat(balance) / 1000000000000000000
        
        return result
      }

    

      const addAll =  () => {
        tokens.map(token => {
         readOnly(addressToCheck,token.address)
         .then(res => {
           if(res !== 0) {
            console.log(res)
           }
           
         })
         .catch(err => {
           console.log(err)
         })
          
        })
      }

      const changeHandler = (e) => {
        setAddresToCheck(e.target.value)
      }

      

    return (
        <ThemeProvider theme={props.state.theme === "dark" ? darkTheme : lightTheme}>
       <Panel>
        <h1>Check Your balances!</h1>
        <div className="address-input">
          <input 
          type="text" 
          placeholder="Enter desired address"
          onChange={changeHandler}
          />
        </div>
        <div className="inner">
        <div className="token-container">
          {tokens.map((t) => (
              <StyledToken key={t.name} {...t} >
                  <img alt={t.name} src={t.image}></img>
                  <span>{t.name}</span>
              </StyledToken>
            ))}
          </div>
        </div>
        {/* //inner */}
       
          <button 
          onClick={addAll}
          className="check-all button">Check Balances</button>
        
        
      </Panel> 
    </ThemeProvider>
  );
};
       
export default CheckBalance;


const StyledToken = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 13%;
  margin: 1.5rem 0;
  

  &:hover {
    top: .2rem;
  }
  

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont}
    
  }

  img {
    height: 3.7rem;
    width: 3.7rem;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 1.5rem;
  }
  &.added {
    background-color: ${(props) => props.theme.style.panelBackground};
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding:  1rem 1.5rem 0rem; 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
 
  

  .inner {
    overflow-x: scroll;
    height: 22rem;
    scrollbar-color: ${(props) => props.theme.style.scrollBarColor} ${(props) => props.theme.style.lightBackground} ;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: .8ren;
      height: 100%;
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
      background-color: ${(props) => props.theme.style.scrollBarColor};
   }

    .token-container {
      
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;

        &.first {
          margin-bottom: 2rem;
        }
        
        @media(max-width: 1025px) {
          width: 90rem;
          
          
        }
      
      
      }
      @media(max-width: 1105px) {
        height: 18rem;
      }
      @media(max-width: 768px) {
        height: 20rem;
      }

    
    }
    

  h1 {
    font-family: ${fonts.headerFont};
    margin-bottom: 2.2rem;
    font-size: 2rem;
    text-align: center;
    position: relative;
  }
  .address-input {
    display: flex;
    flex-direction: column;
    align-items: center;
      input {
        width: 25%;
        border-radius: .5rem;
        font-size: 1.7rem;
        font-family: ${fonts.contentFont}
      }
  }

  .check-all {
    width: 10%;
    margin: -2rem auto 2rem auto;
  }

  
  

  
  
  @media(max-width: 1105px) {
    margin-bottom: 1.5rem;
    height: 32rem;
  }
 
  
`;