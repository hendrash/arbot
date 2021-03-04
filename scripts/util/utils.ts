import * as web3 from 'web3';


 const TOKEN_DISPLAY_DECIMALS = 2; // Show 2 decimal places
export const FromWei = (amount: string, symbol:string) => {
  amount = (+amount).toLocaleString('fullwide', { useGrouping: false });
  switch (symbol) {
    case "USDT": case "USDC": // 6 decimals
      return web3.default.utils.fromWei(amount, "lovelace");
    case "WBTC": // 8 decimals
      return (web3.default.utils.fromWei(amount, 'gwei')) //* 100
    case "WETH": case "DAI": case "SAI": default: // 18 decimals
      return web3.default.utils.fromWei(amount, "ether");
  }
};
// UTILITIES
// export const Now = () => moment().tz("America/Chicago").format();

export const ToWei = (tokenAmount:string, symbol:string) => {
  // Trim extra decimal places if necessary
  if (String(tokenAmount).indexOf('.') > -1) {

    tokenAmount = trimExtraDecimals(tokenAmount, symbol);
  }
    switch (symbol) {
      case "USDT": case "USDC": // 6 decimals
        return web3.default.utils.toWei(tokenAmount, "lovelace");
      case "WBTC": // 8 decimals
        return web3.default.utils.fromWei(tokenAmount, 'gwei') // 100
      case "WETH": case "DAI": case "SAI": default: // 18 decimals
        return web3.default.utils.toWei(tokenAmount, "ether");
    }
  };
  
 

  function trimExtraDecimals(amount: any, symbol: string) {
    const fractionLength = String(amount).split('.')[1].length;
    const maxLength = getDecimals(symbol);
  
    return fractionLength > maxLength
      ? parseFloat(String(amount)).toFixed(maxLength)
      : String(amount);
  }
  function getDecimals(symbol: string) {
    switch (symbol) {
      case "USDT": case "USDC":
        return 6;
      case "WBTC":
        return 8;
      case "WETH": case "DAI": case "SAI": default:
        return 18;
    }
  }