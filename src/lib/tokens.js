import {ERC20_ABI, UNISWAP_PAIR_ABI, BALANCER_ABI, CURVE_ABI} from './data/ABIs.js';
import ethers from 'ethers';
import data from './data/deploys.js';

/**
 * Extra functions for erc20
 */
export class EnhancedERC20 extends ethers.Contract {
  /**
   *
   * @param {Object} address the address of the erc20
   * @param {Object} decimals the erc20 decimals
   * @param {Object} abi abi
   * @param {Object} provider web3 provider
   */
  constructor(address, decimals, abi, provider) {
    super(address, abi, provider);
    this.asset = data.assetByAddress(address);
    this.decimals = this.asset.decimals;
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
 * LP Token wrapper
 */
export class LPToken extends ethers.Contract {
  /**
   *
   * @param {Object} pool object from data/deploy.js
   * @param {Object} abi abi
   * @param {Object} provider web3 provider
   */
  constructor(pool, abi, provider) {
    super(pool.asset.address, abi, provider);
    this.type = pool.asset.type;
    this.tokenDecimals = pool.asset.decimals;
  }

  /**
   *
   * @param {Object} pool object from data/deploy.js
   * @param {Object} provider web3 provider
   * @return {LPToken} an LPToken subclass instances
   */
  static fromPool(pool, provider) {
    switch (pool.asset.type) {
      case 'balancer':
        return new BalancerLPToken(pool, provider);
      case 'uniswap':
        return new UniswapLPToken(pool, provider);
      case 'curve':
        return new CurveLPToken(pool, provider);
      default:
        return new LPToken(pool, ERC20_ABI, provider);
    }
  }
}

/**
 * LP Token wrapper
 */
export class UniswapLPToken extends LPToken {
  /**
   *
   * @param {Object} pool object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(pool, provider) {
    super(pool, UNISWAP_PAIR_ABI, provider);

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
    this._token0 = new EnhancedERC20(
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
    this._token1 = new EnhancedERC20(
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
 * LP Token wrapper
 */
export class CurveLPToken extends LPToken {
  /**
   *
   * @param {Object} pool object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(pool, provider) {
    super(pool, CURVE_ABI, provider);
    this.curveInfo = pool.asset.curveInfo;
  }

  /**
   * Get current tokens and memoize
   */
  async currentTokens() {
    if (this._getCurrentTokens) {
      return this._getCurrentTokens;
    }

    this._getCurrentTokens = this.curveInfo.assets.map((asset) => {
      return new EnhancedERC20(asset.address, asset.decimals, ERC20_ABI, this.provider);
    });
    return this._getCurrentTokens;
  }


  /**
   * Get current tokens and memoize
   * Returns balances keyed by token address.
   */
  async getReserves() {
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
 * LP Token wrapper
 */
export class BalancerLPToken extends LPToken {
  /**
   *
   * @param {Object} pool object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(pool, provider) {
    super(pool, BALANCER_ABI, provider);
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
          new EnhancedERC20(token, 18, ERC20_ABI, this.provider),
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
