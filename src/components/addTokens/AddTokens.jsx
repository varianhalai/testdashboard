import React,{useState,useEffect} from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import AddTokenSkeleton from './AddTokenSkeleton';
import Carousel from "react-multi-carousel";
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
  padding:  1rem 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  @media(max-width: 1002px) {
    margin-bottom: 1.5rem;
    
  }
  .carousel-container {
    width: 90%;
    margin-left: 5rem;
    padding: 0;
    @media(max-width: 1487px) {
      margin-left: 2rem;
    }
    @media(max-width: 850px) {
      margin-left: 5rem;
    }
    @media(max-width: 500px) {
      margin-left: 1rem;
    }
    
  }

  .carousel-button-group {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    z-index: 100;
    bottom: 5.5rem;
    pointer-events: none;
    
    
    .fa-2x {
        cursor: pointer;
        border:none;
        pointer-events: auto;
        border-radius: 8px;
        background-color: transparent;
        &:hover {
            background-color:rgb(232, 232, 232);
            box-shadow: 2px 1px 1px #ddd;
        };
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
  {
    name: "frenBTC",
    url: "https://harvestfi.github.io/add-frenbtc/",
    image: frenbtcIcon,
  },
  // {
  //   name: "fcrvRenWBTC",
  //   url: "https://harvestfi.github.io/add-fcrvrenwbtc/",
  //   image: crvrenwbtcIcon,
  // },
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
];

const Token = ({ className, name, url, image }) => (
  <div className={className}>
    <a target="_blank" rel="noopener noreferrer" href={url}>
      <img alt={name} src={image}></img>
      <span>{name}</span> 
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
    font-family: ${fonts.contentFont}
    font-size: 1.5rem;
  }

  img {
    height: 3.7rem;
    width: 3.7rem;
    margin-bottom: 0.5rem;
  }

  @media(max-width: 1450px) {
    margin: 0 2rem;
  }

  @media only screen and (max-width: 768px) {
    display: block;
    width: 25%;
    margin-bottom: 1.7rem;
  }
`;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1000, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
      carouselState: { currentSlide, totalItems, slidesToShow }
  } = rest;

  return (
      <div className="carousel-button-group">
          <i className="fas fa-caret-left fa-2x" 
          onClick={() => previous()}></i>
          <i className="fas fa-caret-right fa-2x" 
          onClick={() => next()}></i>
      </div>
  );
};

const AddTokens = (props) => {

  const [display,setDisplay]=useState(false);
  useEffect(() => {
    if(props.state.usdValue) {
      setDisplay(true)
    }
  },[props.state.usdValue])
  return (
    <ThemeProvider theme={props.state.theme === "dark" ? darkTheme : lightTheme}>
      {display ? <Panel>
        <Header>Add assets to wallet</Header>

        <Carousel 
        responsive={responsive}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        infinite={true}
        containerClass="carousel-container"
        renderButtonGroupOutside={true}
        arrows={false}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customButtonGroup={<ButtonGroup
          next={props.next}
          previous={props.previous}
          rest={props.rest}
      />}
        >
          {tokens.map((t) => (
            <StyledToken key={t.name} {...t} />
          ))}
        </Carousel>
      </Panel> :
      <AddTokenSkeleton state={props.state} />}
      
    </ThemeProvider>
  );
};

export default AddTokens;
