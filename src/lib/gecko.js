const axios = require('axios');

/**
 * Memoizing coin gecko api
 */
class Gecko {
  /**
   * @param {String} url the api url
   */
  constructor(url) {
    this.url = url ? url : 'https://api.coingecko.com/api/v3/simple/token_price/ethereum';
    this._memos = {};
  }

  /**
   * @param {String} address token address
   * @param {Number} time current time
   * @return {Number} price
   */
  checkMemo(address, time) {
    if (this.memo[address] && this.memo[address].validUntil >= time) {
      return this.memo[address].price;
    }
  }

  /**
   * @param {String} address token address
   * @param {Number} price price in USD
   * @param {Number} validUntil validity of memoization
   */
  memoize(address, price, validUntil) {
    this._memos[address] = {
      validUntil,
      price,
    };
  }

  /**
   * NOTE: silently fails to return unknown or non-existing assets
   * @param {Array} addresses token addresses
   */
  async _getPrices(addresses) {
    const result = {};
    const time = Date.now();

    addresses.forEach((address) => {
      const memo = this.checkMemo(address, time);
      if (memo) {
        result[address] = memo;
      }
    });

    const s = addresses.filter((address) => !(result[address])).join(',');
    const url = `${this.url}?contract_addresses=${s}&vs_currencies=USD`;

    const response = await axios.get(url);

    Object.entries(response).forEach(([address, {usd}]) => {
      result[address] = usd;
      this.memoize(address, usd, time + 5 * 60 * 1000);
    });

    return result;
  }

  /**
   * @param {String} address token address
   * @return {Promise} axios output
   */
  getPrice(address) {
    return this._getPrices(address);
  }

  /**
   * @param {Array} addresses token addresses
   * @return {Promise} axios output
   */
  getPrices(addresses) {
    return this._getPrices(addresses);
  }
}

module.exports = {
  Gecko,
};
