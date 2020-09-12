import axios from 'axios';
import ethers from 'ethers';

/**
 * Memoizing coin gecko api
 */
class GeckoApi {
  /**
   * @param {String} url the api url
   */
  constructor(url) {
    this.url = url;
    this._memos = {};
  }

  /**
   * @param {String} address token address
   * @param {Number} time current time
   * @return {Number} price
   */
  checkMemo(address, time) {
    if (this._memos[address] && this._memos[address].validUntil >= time) {
      return this._memos[address].price;
    }
  }

  /**
   * @param {String} address token address
   * @param {Number} price price in USD
   * @param {Number} validUntil validity of memoization
   * @return {BigNumber} price in pennies
   */
  memoize(address, price, validUntil) {
    const bnPrice = ethers.BigNumber.from(parseInt(price * 100));
    this._memos[address] = {
      validUntil,
      price,
    };
    return bnPrice;
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

    Object.entries(response.data).forEach(([address, {usd}]) => {
      result[address] = this.memoize(address, usd, time + 5 * 60 * 1000);
    });

    return result;
  }

  /**
   * @param {String} address token address
   * @return {Promise} axios output
   */
  getPrice(address) {
    return this._getPrices([address]);
  }

  /**
   * @param {Array} addresses token addresses
   * @return {Promise} axios output
   */
  getPrices(addresses) {
    return this._getPrices(addresses);
  }
}

const Gecko = (function () {
    const instances = {};

    function createInstance(url) {
        var object = new GeckoApi(url);
        return object;
    }

    function fromUrl(url) {
      url = url ? url : 'https://api.coingecko.com/api/v3/simple/token_price/ethereum';
      if (!instances[url]) {
          instances[url] = createInstance(url);
      }
      return instances[url];
    }

    function coingecko() {
      return fromUrl();
    }

    return {
        coingecko,
        fromUrl
    };
})();

export default Gecko;
