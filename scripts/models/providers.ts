const Web3 = require('web3');
const abs = require('./utils/addresses');
const abi = require("./utils/abis");
const DEXAG = require('dexag-sdk');
// WEB3 CONFIG

export const OneSplitContract = new Web3.eth.Contract(abi.ONE_SPLIT_ABI,abs.ONE_SPLIT_ADDRESS)
export const UniswapRouterContract = new Web3.eth.Contract(abi.UNISWAP_ROUTER_ABI,abs.UNISWAP_ROUTER_ADDRESS)
export const DexAg=DEXAG.default.fromProvider(Web3.currentProvider)