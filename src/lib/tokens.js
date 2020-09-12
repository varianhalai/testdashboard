import {ERC20_ABI, UNISWAP_PAIR_ABI, BALANCER_ABI, CURVE_ABI, FTOKEN_ABI} from './data/ABIs.js';
import ethers from 'ethers';
import data from './data/deploys.js';

/**
 * Extra functions for erc20
 */
export class ERC20Extended extends ethers.Contract {
  /**
   *
   * @param {Object} address the address of the erc20
   * @param {Object} decimals the erc20 decimals
   * @param {Object} abi abi
   * @param {Object} provider web3 provider
   */
  constructor(address, decimals, abi, provider) {
    if (!provider) {throw new Error('Must give a provider')}
    super(address, abi, provider);
    this.asset = data.assetByAddress(address);
    this.tokenDecimals = this.asset.decimals;
    this.name = this.asset.name;
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {BigNumberish} tokens the address
   * @return {String} the percentage, string formatted
   */
  async percentageOfTotal(tokens) {
    const total = await this.totalSupply();

    return ethers.utils.formatUnits(tokens.mul(100).div(total), 2) + '%';
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {String} address the address
   * @return {String} the percentage, string formatted
   */
  async percentageOwnership(address) {
    return this.percentageOfTotal(await this.balanceOf(address));
  }

}
/**
 * Token wrapper
 */
export class Token extends ERC20Extended {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} abi abi
   * @param {Object} provider web3 provider
   */
  constructor(asset, abi, provider) {
    super(asset.address, asset.decimals, abi, provider);
    this.type = asset.type;
    this.tokenDecimals = asset.decimals;
  }

  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   * @return {Token} an Token subclass instances
   */
  static fromAsset(asset, provider) {
    switch (asset.type) {
      case 'balancer':
        return new BalancerToken(asset, provider);
      case 'uniswap':
        return new UniswapToken(asset, provider);
      case 'curve':
        return new CurveToken(asset, provider);
      case 'ftoken':
        return new FToken(asset, provider);
      default:
        return new Token(asset, ERC20_ABI, provider);
    }
  }

}

/**
 * FToken wrapper
 */
export class FToken extends Token {
  constructor(asset, provider) {
    super(asset, FTOKEN_ABI, provider);
    this.underlyingAsset = asset.underlyingAsset;
  }

  /**
   * Get the underlying balance of token0 and token1 given N LP shares
   * @param {BigNumberish} tokens the number of LP tokens
   */
  async calcShare(tokens) {
    const [total, underlyingBalanceWithInvestment] = await Promise.all(
        [
          this.totalSupply(),
          this.underlyingBalanceWithInvestment(),
        ],
    );

    const balance = underlyingBalanceWithInvestment.mul(tokens).div(total);

    // if this wraps a lower asset, call it
    if (this.underlyingAsset.type) {
      return await Token.fromAsset(this.underlyingAsset, this.provider).calcShare(balance);
    }

    return [
      {
        asset: data.assetByAddress(this.underlyingAsset.address),
        balance,
      },
    ];
  }

  /**
   * Get the underlying balance of tokens
   * @param {String} address the address
   */
  async underlyingBalanceOf(address) {
    if (this.underlyingAsset.type) {
      return await Token.fromAsset(this.underlyingAsset).underlyingBalanceOf(address);
    }

    const balance = await this.balanceOf(address);
    return this.calcShare(balance);
  }

}

/**
 * UniswapToken wrapper
 */
export class UniswapToken extends Token {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(asset, provider) {
    super(asset, UNISWAP_PAIR_ABI, provider);

    this.reserve0 = async () => (
      await this.getReserves()[0]
    );
    this.reserve1 = async () => (
      await this.getReserves()[1]
    );
  }

  /**
   * Get token0
   */
  async getToken0() {
    if (this._token0) {
      return this._token0;
    }
    const address = await this.token0();
    this._token0 = new ERC20Extended(
        address, 18, ERC20_ABI, this.provider,
    );
    return this._token0;
  }

  /**
   * Get token1
   */
  async getToken1() {
    if (this._token1) {
      return this._token1;
    }
    const address = await this.token1();
    this._token1 = new ERC20Extended(
        address, 18, ERC20_ABI, this.provider,
    );
    return this._token1;
  }

  /**
   * Get the underlying balance of token0 and token1 given N LP shares
   * @param {BigNumberish} tokens the number of LP tokens
   */
  async calcShare(tokens) {
    const [total, [reserve0, reserve1], token0, token1] = await Promise.all(
        [
          this.totalSupply(),
          this.getReserves(),
          this.getToken0(),
          this.getToken1(),
        ],
    );

    return [
      {
        asset: data.assetByAddress(token0.address),
        balance: reserve0.mul(tokens).div(total),
      },
      {
        asset: data.assetByAddress(token1.address),
        balance: reserve1.mul(tokens).div(total),
      },
    ];
  }

  /**
   * Get the underlying balance of token0 and token1
   * @param {String} address the address
   */
  async underlyingBalanceOf(address) {
    return this.calcShare(await this.balanceOf(address));
  }
}

/**
 * CurveToken wrapper
 */
export class CurveToken extends Token {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(asset, provider) {
    super(asset, CURVE_ABI, provider);
    this.curveInfo = asset.curveInfo;
  }

  /**
   * Get current tokens and memoize
   */
  async currentTokens() {
    if (this._getCurrentTokens) {
      return this._getCurrentTokens;
    }

    this._getCurrentTokens = this.curveInfo.assets.map((asset) => {
      return new ERC20Extended(asset.address, asset.decimals, ERC20_ABI, this.provider);
    });
    return this._getCurrentTokens;
  }


  /**
   * Get current tokens and memoize
   * Returns balances keyed by token address.
   */
  async getReserves() {
    // console.log(ent)
    const tokens = await this.currentTokens();

    const balances = await Promise.all(tokens.map((entry) => {
      return entry.balanceOf(this.curveInfo.poolAddress);
    }));

    const output = tokens.map((tok, idx) => {
      return {
        asset: tok.asset,
        balance: balances[idx],
      };
    });

    return output;
  }

  /**
   * Get the underlying balance of tokens given N LP shares
   * @param {BigNumberish} tokens the number of LP tokens
   */
  async calcShare(tokens) {
    const [total, reserves] = await Promise.all(
        [
          this.totalSupply(),
          // async () => ethers.BigNumber.from('10000000'),
          // async () => ethers.BigNumber.from('10000000'),
          this.getReserves(),
        ],
    );

    const f = (reserve) => {
      return {
        asset: reserve.asset,
        balance: reserve.balance.mul(tokens).div(total),
      };
    };

    const shares = reserves.map(f);

    return shares;
  }

  /**
   * Get the underlying balance of tokens
   * @param {String} address the address
   */
  async underlyingBalanceOf(address) {
    const balance = await this.balanceOf(address);
    return this.calcShare(balance);
  }
}

/**
 * BalancerToken wrapper
 */
export class BalancerToken extends Token {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(asset, provider) {
    super(asset, BALANCER_ABI, provider);
  }

  /**
   * Get current tokens and memoize
   */
  async currentTokens() {
    if (this._getCurrentTokens) {
      return this._getCurrentTokens;
    }
    const tokens = [];
    (await this.getCurrentTokens()).forEach((token) => {
      tokens.push(
          new ERC20Extended(token, 18, ERC20_ABI, this.provider),
      );
    });
    this._getCurrentTokens = tokens;
    return this._getCurrentTokens;
  }

  /**
   * Get current tokens and memoize
   * Returns balances keyed by token address.
   */
  async getReserves() {
    const tokens = await this.currentTokens();

    const balances = await Promise.all(tokens.map((entry) => {
      return entry.balanceOf(this.address);
    }));

    const output = tokens.map((tok, idx) => {
      return {
        asset: tok.asset,
        balance: balances[idx],
      };
    });

    return output;
  }

  /**
   * Get the underlying balance of tokens given N LP shares
   * @param {BigNumberish} tokens the number of LP tokens
   */
  async calcShare(tokens) {
    const [total, reserves] = await Promise.all(
        [
          this.totalSupply(),
          this.getReserves(),
        ],
    );

    const f = (reserve) => {
      return {
        asset: reserve.asset,
        balance: reserve.balance.mul(tokens).div(total),
      };
    };

    const shares = reserves.map(f);

    return shares;
  }

  /**
   * Get the underlying balance of tokens
   * @param {String} address the address
   */
  async underlyingBalanceOf(address) {
    const balance = await this.balanceOf(address);
    return this.calcShare(balance);
  }
}
