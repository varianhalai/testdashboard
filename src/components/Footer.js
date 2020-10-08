import React from "react";

const tokens = [
  {
    name: "FARM",
    url: "https://harvestfi.github.io/add-farm/",
    image: "/dashboard/logo@3x.png",
  },
  {
    name: "fUSDC",
    url: "https://harvestfi.github.io/add-fusdc/",
    image: "/dashboard/png_usdc_56px@3x.png",
  },
  {
    name: "fUSDT",
    url: "https://harvestfi.github.io/add-fusdt/",
    image: "/dashboard/png_usdt_56px@3x.png",
  },
  {
    name: "fDAI",
    url: "https://harvestfi.github.io/add-fdai/",
    image: "/dashboard/png_dai_56px@3x.png",
  },
  {
    name: "fwBTC",
    url: "https://harvestfi.github.io/add-fwbtc/",
    image: "/dashboard/png_wbtc_56px@3x.png",
  },
  {
    name: "frenBTC",
    url: "https://harvestfi.github.io/add-frenbtc/",
    image: "/dashboard/png_frenbtc_56px@3x.png",
  },
  {
    name: "fcrvRenWBTC",
    url: "https://harvestfi.github.io/add-fcrvrenwbtc/",
    image: "/dashboard/png_crvrenwbtc_56px@3x.png",
  },
];

const Footer = () => (
  <div id="footer">
    <h3>Add assets to wallet</h3>
    <div className="assets">
      {tokens.map(({ name, url, image }) => (
        <div className="asset">
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <img alt={name} src={image}></img>
            {name}
          </a>
        </div>
      ))}
    </div>
    <div id="wiki-link">
      <img alt="wiki" className="icon" src="/dashboard/wiki.png"></img>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://farm.chainwiki.dev"
        >
          Harvest Wiki
        </a>
      </p>
    </div>
    <div id="donation-link">
      <img src="/dashboard/logo@3x.png"></img>
      <p>
        Please consider donating:{" "}
        <span id="address">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://etherscan.io/address/0x84BB14595Fd30a53cbE18e68085D42645901D8B6"
          >
            0x84BB14595Fd30a53cbE18e68085D42645901D8B6
          </a>
        </span>
      </p>
    </div>
  </div>
);

export default Footer;
