import data from './data/deploys.js';
import ethers from 'ethers';
import {REWARDS_ABI} from './data/ABIs.js';
import {Token} from './tokens.js';

/**
 * Reward pool wrapper
 */
export class HarvestRewardsPool extends ethers.Contract {
  /**
   *
   * @param {Object} pool object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(pool, provider) {
    super(pool.address, REWARDS_ABI, provider);
    this.name = pool.asset.name;
    this._pool = pool;

    this.lptoken = Token.fromAsset(pool.asset, provider);

    // function aliases
    this.unstakedBalance = this.lptoken.balanceOf;
    this.stakedBalance = this.balanceOf;
    this.earnedRewards = this.earned;

    if (this.lptoken.underlyingBalanceOf) {
      this.underlyingBalanceOf = async (address) => {
        try {
          const balance = await this.balanceOf(address);
          return this.lptoken.calcShare(balance);
        } catch (e) {console.log(e)}
      };
    }
  }

  /**
   * @param {Object} provider web3 provider
   * @return {Array} array of HarvestRewardsPool
   */
  static knownPools(provider) {
    return data.pools.map((pool) =>
      new HarvestRewardsPool(pool, provider),
    );
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekOne(provider) {
    return data.weekOnePools.map((pool) =>
      new HarvestRewardsPool(pool, provider),
    );
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekTwo(provider) {
    return data.weekTwoPools.map((pool) =>
      new HarvestRewardsPool(pool, provider),
    );
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static activePools(provider) {
    return data.activePools.map((pool) =>
      new HarvestRewardsPool(pool, provider),
    );
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static inactivePools(provider) {
    return data.inactivePools.map((pool) =>
      new HarvestRewardsPool(pool, provider),
    );
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static allPastPools(provider) {
    return data.allPastPools.map((pool) =>
      new HarvestRewardsPool(pool, provider),
    );
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {BigNumberish} tokens the address
   * @return {String} the percentage, string formatted
   */
  async percentageOfTotal(tokens) {
    const total = await this.totalSupply();

    const based = tokens.mul(ethers.constants.WeiPerEther).div(total);

    return ethers.utils.formatUnits(based, 16).slice(0, 5) + '%';
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {String} address the address
   * @return {String} the percentage, string formatted
   */
  async percentageOwnership(address) {
    return this.percentageOfTotal(await this.balanceOf(address));
  }

  /**
   * @return {bool} isActive
   */
  isActive() {
    return data.isAddressActive(this.address);
  }

  /**
   * Return a summary of the state of the pool
   * @param {String} address the address for which we compute the summary
   * @return {Object} summary
   */
  async summary(address) {
    const underlying = async (address) => {
      if (this.underlyingBalanceOf) {
        return await this.underlyingBalanceOf(address);
      }
      return {};
    };
    const [
      stakedBalance,
      unstakedBalance,
      earnedRewards,
      underlyingBalanceOf,
      percentageOwnership,
    ] = await Promise.all([
      this.stakedBalance(address),
      this.unstakedBalance(address),
      this.earnedRewards(address),
      underlying(address),
      this.percentageOwnership(address),
    ]);


    const output = {
      user: address,
      pool: this._pool,
      isActive: this.isActive(),
      stakedBalance,
      unstakedBalance,
      earnedRewards,
      percentageOwnership,
    };
    if (underlyingBalanceOf) output.underlyingBalanceOf = underlyingBalanceOf;
    return output;
  }
}
