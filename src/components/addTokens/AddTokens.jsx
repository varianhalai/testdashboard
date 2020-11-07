import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import "react-multi-carousel/lib/styles.css";

// images
import logo from "../../assets/logo.png";
import usdcIcon from "../../assets/png_usdc_56px@3x.png";
import usdtIcon from "../../assets/png_usdt_56px@3x.png";
import daiIcon from "../../assets/png_dai_56px@3x.png";
import wbtcIcon from "../../assets/png_wbtc_56px@3x.png";
import frenbtcIcon from "../../assets/png_frenbtc_56px@3x.png";
import crvrenwbtcIcon from "../../assets/png_crvrenwbtc_56px@3x.png";
import sushi from '../../assets/sushi.png'
import uni from '../../assets/uni.png'
import yearn from '../../assets/yearn.png'


const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding:  1rem 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  @media(max-width: 1002px) {
    margin-bottom: 1.5rem;
    
  }

  h1 {
    font-family: ${fonts.headerFont};
    margin-bottom: 2.2rem;
    font-size: 2rem;
    text-align: center;
  }

  .token-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    &.first {
      margin-bottom: 2rem;
    }
  }
  

  

  
`;



const tokens = [
  {
    name: "FARM",
    url: "https://harvestfi.github.io/add-farm/",
    image: logo,
  },
  {
    name: "fUSDC",
    url: "https://harvestfi.github.io/add-fusdc/",
    image: usdcIcon,
  },
  {
    name: "fUSDT",
    url: "https://harvestfi.github.io/add-fusdt/",
    image: usdtIcon,
  },
  {
    name: "fDAI",
    url: "https://harvestfi.github.io/add-fdai/",
    image: daiIcon,
  },
  {
    name: "fwBTC",
    url: "https://harvestfi.github.io/add-fwbtc/",
    image: wbtcIcon,
  },
  
];
const tokens2 = [
  {
    name: "frenBTC",
    url: "https://harvestfi.github.io/add-frenbtc/",
    image: frenbtcIcon,
  },
  {
    name: "fcrvRenWBTC",
    url: "https://harvestfi.github.io/add-fcrvrenwbtc/",
    image: crvrenwbtcIcon,
  },
  {
    name: "SUSHI",
    url: "https://varianhalai.github.io/add-sushi/",
    image: sushi,
  },
  {
    name: "Uni",
    url: "https://varianhalai.github.io/add-uni/",
    image: uni,
  },
  {
    name: "YCRV",
    url: "https://varianhalai.github.io/add-ycrv/",
    image: yearn,
  },
]

const Token = ({ className,name, url, image }) => (
  <div className={className}>
    <a target="_blank" rel="noopener noreferrer" href={url}>
    
    <img alt={name} src={image}></img>
    <span>{name}</span>
    </a>
  </div>
);

const StyledToken = styled(Token)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 20%;
  

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
    font-size: 1.5rem;
  }

  img {
    height: 3.7rem;
    width: 3.7rem;
    margin-bottom: 0.5rem;
  }

 

  @media only screen and (max-width: 768px) {
    display: block;
    width: 25%;
    margin-bottom: 1.7rem;
  }
`;




const AddTokens = (props) => {

 
  return (
    <ThemeProvider theme={props.state.theme === "dark" ? darkTheme : lightTheme}>
       <Panel>
        <h1>Add assets to wallet</h1>
        <div className="token-container first">
        {tokens.map((t) => (
            <StyledToken key={t.name} {...t} />
          ))}
        </div>
        <div className="token-container">
        {tokens2.map((t) => (
            <StyledToken key={t.name} {...t} />
          ))}
        </div>
      </Panel> 
      
    </ThemeProvider>
  );
};

export default AddTokens;
