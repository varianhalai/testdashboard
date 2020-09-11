import ethers from 'ethers';

/**
 * Prettifies a positions for console.table
 * @param {Object} sum position summary
 * @return {Object} pretty
 */
export function prettyPosition(sum) {
  const {
    name,
    summary: {
      pool: {address, asset: {decimals}},
      isActive, stakedBalance, unstakedBalance, earnedRewards,
      percentageOwnership,
    },
  } = sum;

  return {
    name,
    address,
    isActive,
    stakedBalance: ethers.utils.formatUnits(stakedBalance, decimals),
    unstakedBalance: ethers.utils.formatUnits(unstakedBalance, decimals),
    earnedRewards: ethers.utils.formatUnits(earnedRewards, 18),
    percentOfPool: percentageOwnership,
  };
}

/**
 * Prettifies a positions for console.table
 * @param {Object} u
 * @return {Object} pretty
 */
export function prettyUnderlying(u) {
  if (u.underlyingBalances[0].balance.isZero()) {
    return;
  }

  /**
   * @param {Object} underlying output of underlyingBalanceOf
   * @return {Object} transformed
   */
  function transformUnderlying(underlying) {
    const {name, decimals} = underlying.asset;
    return {
      name,
      balance: ethers.utils.formatUnits(underlying.balance, decimals),
    };
  }

  return {
    asset: u.name,
    underlyingBalances: u.underlyingBalances.map(transformUnderlying),
  };
}

export default {
  prettyUnderlying,
  prettyPosition,
};
