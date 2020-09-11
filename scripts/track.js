import fs from 'fs';
import harvest from '../src/lib/index.js';
import {PoolManager} from '../src/lib/manager.js';
import * as utils from '../src/lib/utils.js';

const {ethers} = harvest;
const {prettyPosition, prettyUnderlying} = utils;

const INTERVAL = 5 * 60 * 1000; // 5 minutes

const me = process.argv[2];
const infuraId = process.argv[3];

const FILE = `./scripts/bal_logs_${me}.json`;

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify({}));
}

/**
 * @param {string} address address
 * @param {string} infuraId infuraId
 */
async function logBalances(address, infuraId) {
  const provider = new ethers.providers.InfuraProvider(
      'homestead',
      infuraId,
  );
  const man = PoolManager.allPastPools(provider);
  const summaries = await man.summary(address);
  const underlyings = await man.underlying(address);

  let totalRewards = ethers.BigNumber.from(0);

  const positions = summaries
      .map(prettyPosition)
      .filter((p) => p.earnedRewards !== '0.0' || p.stakedBalance !== '0.0');

  summaries.forEach((pos) => {
    totalRewards = totalRewards.add(pos.summary.earnedRewards);
  });

  const output = {
    positions,
    underlyings: underlyings.map(prettyUnderlying).filter((u) => !!u)};


  console.log('------LOGGING OUTPUT-----');
  const timestamp = Date.now();
  console.log(`The time is ${timestamp}`);
  console.table('REWARDS');
  console.table(output.positions);
  console.log(
      `Total claimable rewards: ${ethers.utils.formatEther(totalRewards)}`,
  );
  console.log('');

  output.underlyings.forEach((u) => {
    console.log(u.asset);
    console.table(u.underlyingBalances);
    console.log('');
  });

  console.log('------DUMPING TO FILE-----');

  const history = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  history[String(timestamp)] = output;
  fs.writeFileSync(FILE, JSON.stringify(history));
}

logBalances(me, infuraId);
setInterval(() => logBalances(me, infuraId), INTERVAL);
