import ethers from 'ethers';

/**
 * Prettifies money
 * @param {Number} USD value in microdollars
 * @return {String} pretty
 */
export function prettyMoney(microdollars) {
  return Intl
    .NumberFormat('en-US', {style: 'currency', currency: 'USD'})
    .format(microdollars / 1000000);
}

/**
 * Prettifies a positions for console.table
 * @param {Object} sum position summary
 * @return {Object} pretty
 */
export function prettyPosition(sum) {
  const {
    name,
    summary: {
      pool: {asset: {decimals}},
      address, isActive, stakedBalance, unstakedBalance, earnedRewards,
      percentageOwnership, usdValueOf,
    },
  } = sum;

  // const bnValueOf = ethers.BigNumber.from(usdValueOf);
  // const prettyUsdValue = `$${ethers.utils.formatUnits(bnValueOf, 2)}`;
  const prettyUsdValue = prettyMoney(usdValueOf);

  return {
    name,
    isActive,
    address: address,
    stakedBalance: ethers.utils.formatUnits(stakedBalance, decimals),
    unstakedBalance: ethers.utils.formatUnits(unstakedBalance, decimals),
    earnedRewards: ethers.utils.formatUnits(earnedRewards, 18),
    percentOfPool: percentageOwnership,
    usdValueOf: prettyUsdValue,
  };
}

/**
 * Prettifies a positions for console.table
 * @param {Object} u
 * @return {Object} pretty
 */
export function prettyUnderlying(u) {
  const underlyingBalancesList = u.underlyingBalances.toList();

  if (underlyingBalancesList[0].balance.isZero()) {
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
    underlyingBalances: underlyingBalancesList.map(transformUnderlying),
  };
}

export default {
  prettyUnderlying,
  prettyPosition,
  prettyMoney,
};
