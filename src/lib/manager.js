import data from "./data/deploys.js";
import ethers from "ethers";
import { RewardsPool } from "./pool.js";
import { UnderlyingBalances } from "./tokens.js";

/**
 * Reward pool wrapper
 */
export class PoolManager {
  /**
   *  Instantiate from the hardcoded pools
   *
   * @param {Array} pools a list of pools
   * @param {Object} provider web3 provider
   */
  constructor(pools, provider) {
    this.pools = pools;
    this.provider = provider;
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekOne(provider) {
    return new PoolManager(RewardsPool.weekOne(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekTwo(provider) {
    return new PoolManager(RewardsPool.weekTwo(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static activePools(provider) {
    return new PoolManager(RewardsPool.activePools(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static inactivePools(provider) {
    return new PoolManager(RewardsPool.inactivePools(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static allPastPools(provider) {
    return new PoolManager(RewardsPool.allPastPools(provider), provider);
  }

  /**
   * @param {Array} pools user address to check balances
   * @param {String} functionPath function to invoke
   * @param {Array} args array of function args
   * @param {String} propName name of prop to put result in
   * @return {Array} results
   */
  static _mapToPools(pools, functionPath, args, propName) {
    const f = async (pool) => {
      const prop = propName ? propName : functionPath[functionPath.length - 1];

      // traverse props iteratively
      let func = pool;
      /* eslint-disable-next-line guard-for-in */
      functionPath.forEach((elem) => {
        func = func[elem];
        if (!func) return;
      });

      if (func) {
        const output = {};
        output.name = pool.name;
        output.address = pool.address;
        output[prop] = await func.apply(pool, [...args]);
        return output;
      }
    };
    return Promise.all(pools.map(f));
  }

  /**
   * @param {string} address user address
   * @param {bool} passthrough unwrap interior tokens
   * @return {Array} lp token balances
   */
  underlying(address, passthrough) {
    return PoolManager._mapToPools(
      this.pools,
      ["underlyingBalanceOf"],
      [address, passthrough],
      "underlyingBalances",
    ).then((vs) => vs.filter((v) => !!v));
  }

  /**
   * Return aggregate underlying positions across all pools
   * @param {string} address user address
   * @param {bool} passthrough unwrap interior tokens
   * @return {Array} lp token balances
   */
  aggregateUnderlyings(address) {
    return this.underlying(address, true).then((underlyings) => {
      let aggregateUnderlyings = new UnderlyingBalances();
      underlyings.reduce((acc, next) => {
        return acc.combine(next.underlyingBalances);
      }, aggregateUnderlyings);
      return aggregateUnderlyings;
    });
  }

  /**
   * @param {string} address user address
   * @return {Array} summaries
   */
  summary(address) {
    return PoolManager._mapToPools(
      this.pools,
      ["summary"],
      [address],
      "summary",
    );
  }
}

export default {
  data,
  ethers,
  RewardsPool,
  PoolManager,
};