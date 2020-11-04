import React,{useState,useEffect} from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import AddTokenSkeleton from './AddTokenSkeleton';

// images
import logo from "../../assets/logo.png";
import usdcIcon from "../../assets/png_usdc_56px@3x.png";
import usdtIcon from "../../assets/png_usdt_56px@3x.png";
import daiIcon from "../../assets/png_dai_56px@3x.png";
import wbtcIcon from "../../assets/png_wbtc_56px@3x.png";
import frenbtcIcon from "../../assets/png_frenbtc_56px@3x.png";
import crvrenwbtcIcon from "../../assets/png_crvrenwbtc_56px@3x.png";
import sushi from '../../assets/sushi.png'

const Header = styled.h1`
  font-family: ${fonts.headerFont};
  margin-bottom: 2.4rem;
  font-size: 2.6rem;
`;
const Panel = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.4rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  @media(max-width: 1002px) {
    margin-bottom: 1.5rem;
    
  }
`;

const TokenList = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
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
    name: "Sushi",
    url: "https://varianhalai.github.io/add-sushi/",
    image: sushi,
  },
  // {
  //   name: "Uni",
  //   url: "https://harvestfi.github.io/add-uni/",
  //   image: crvrenwbtcIcon,
  // },
  // {
  //   name: "YCRV",
  //   url: "https://harvestfi.github.io/add-ycrv/",
  //   image: crvrenwbtcIcon,
  // },
];

const Token = ({ className, name, url, image }) => (
  <div className={className}>
    <a target="_blank" rel="noopener noreferrer" href={url}>
      <img alt={name} src={image}></img>
      {name}
    </a>
  </div>
);

const StyledToken = styled(Token)`
  display: flex;
  justify-content: space-between;
  position: relative;
  

  &:hover {
    top: .2rem;
  }
  

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-size: 1.5rem;
    margin-bottom: 1.6rem;
  }

  img {
    height: 3.5rem;
    width: 3.5rem;
    margin-bottom: 0.5rem;
  }

  @media only screen and (max-width: 768px) {
    display: block;
    width: 25%;
    margin-bottom: 1.5rem;
  }
`;

const AddTokens = ({ state }) => {

  const [display,setDisplay]=useState(false);
  const [delay,setDelay] = useState(2200);
  useEffect(() => {
    if(state.usdValue) {
      setDisplay(true)
    }
  },[state.usdValue])
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {display ? <Panel>
        <Header>Add assets to wallet</Header>

        <TokenList>
          {tokens.map((t) => (
            <StyledToken key={t.name} {...t} />
          ))}
        </TokenList>
      </Panel> :
      <AddTokenSkeleton state={state} />}
      
    </ThemeProvider>
  );
};

export default AddTokens;
