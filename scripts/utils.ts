const {web3} = require('hardhat')
require('bignumber')
const moment=require('moment-timezone')

 const TOKEN_DISPLAY_DECIMALS = 2; // Show 2 decimal places
const FromWei = (amount: string, symbol:string) => {
  amount = (+amount).toLocaleString('fullwide', { useGrouping: false });
  switch (symbol) {
    case "USDT": case "USDC": // 6 decimals
      return web3.utils.fromWei(amount, "Lovelace");
    case "WBTC": // 8 decimals
      return web3.utils.fromWei(amount, 'gwei') * 100
    case "WETH": case "DAI": case "SAI": default: // 18 decimals
      return web3.utils.fromWei(amount, "Ether");
  }
};
// UTILITIES
const Now = () => moment().tz("America/Chicago").format();

const ToWei = (tokenAmount:string, symbol:string) => {
    switch (symbol) {
      case "USDT": case "USDC": // 6 decimals
        return web3.utils.toWei(tokenAmount, "Lovelace");
      case "WBTC": // 8 decimals
        return web3.utils.fromWei(tokenAmount, 'gwei') / 100
      case "WETH": case "DAI": case "SAI": default: // 18 decimals
        return web3.utils.toWei(tokenAmount, "Ether");
    }
  };
 
