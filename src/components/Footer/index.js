import React from "react";
import styled from "styled-components";

import logo from "../../assets/logo@3x.png";
import usdcIcon from "../../assets/png_usdc_56px@3x.png";
import usdtIcon from "../../assets/png_usdt_56px@3x.png";
import daiIcon from "../../assets/png_dai_56px@3x.png";
import wbtcIcon from "../../assets/png_wbtc_56px@3x.png";
import frenbtcIcon from "../../assets/png_frenbtc_56px@3x.png";
import crvrenwbtcIcon from "../../assets/png_crvrenwbtc_56px@3x.png";
import wikiIcon from "../../assets/wiki.png";

const DONATION_ADDRESS = "0x84BB14595Fd30a53cbE18e68085D42645901D8B6";
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
];

const Container = styled.div`
  margin: 0px 0px 0px 0px;
  margin-top: 40px;

  h3 {
    text-align: left;
    font-size: 24px;
    margin-bottom: 40px;
    font-weight: bold;
  }

  @media only screen and (max-width: 768px) {
    width: 100vw;

    h3 {
      text-align: center;
    }
  }
`;

const TokenList = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const _Token = ({ className, name, url, image }) => (
  <div className={className}>
    <a target="_blank" rel="noopener noreferrer" href={url}>
      <img alt={name} src={image}></img>
      {name}
    </a>
  </div>
);

const Token = styled(_Token)`
  display: flex;
  justify-content: space-between;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
  }

  img {
    height: 56px;
    width: 56px;
    margin-bottom: 4px;
  }

  @media only screen and (max-width: 768px) {
    width: 50%;
    margin-bottom: 50px;
  }
`;

const WikiLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  a {
    color: #6336ff;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
  }

  img {
    width: 29px;
    height: 32px;
    margin-right: 5px;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 0px;
  }
`;

const DonationLink = styled.div`
  min-width: 740px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 10px 30px 10px;
  background: #fafbfe;
  box-shadow: inset -5px -5px 10px #fafbff, inset 5px 5px 10px #d3e0ec;
  border-radius: 30px;

  img {
    height: 24px;
    width: 24px;
    margin-right: 10px;
  }

  #address {
    font-family: monospace;
  }

  @media only screen and (max-width: 768px) {
    min-width: 0;
    max-width: 100vw !important;
    margin: 30px 10px 30px 10px;
    height: 70px;

    img {
      display: none;
    }
  }
`;

const Footer = () => (
  <Container>
    <h3>Add assets to wallet</h3>
    <TokenList>
      {tokens.map((t) => (
        <Token {...t} />
      ))}
    </TokenList>
    <WikiLink>
      <img alt="wiki" className="icon" src={wikiIcon}></img>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://farm.chainwiki.dev"
        >
          Harvest Wiki
        </a>
      </p>
    </WikiLink>
    <DonationLink>
      <img src={logo}></img>
      <p>
        Please consider donating:{" "}
        <span id="address">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://etherscan.io/address/${DONATION_ADDRESS}`}
          >
            {DONATION_ADDRESS}
          </a>
        </span>
      </p>
    </DonationLink>
  </Container>
);

export default Footer;
