// const Web3 = require('web3');
// const abs = require('./utils/addresses');
import {ExchangeTypes} from "../models/tokenModels"
// const abis = require("./abis");
// const abi = require("./utils/abis");
const DEXAG = require('dexag-sdk');
const UNISWAP_ROUTER_ABI = require('@uniswap/sdk')
// import {DEXAG} from 'dexag-sdk'
// import DEXAG from 'dexag-sdk';
import {web3} from 'hardhat';
// import { UNISWAP_ROUTER_ABI } from "../abis/uniswap_abi";


// const web3 = require('hardhat')
// import {web3} from 'web3';
// WEB3 CONFIG
// import {Abis} from "./abi"


export const DexAg=DEXAG.default.fromProvider(web3.currentProvider)
// export const OneSplitContract = new web3.eth.Contract(abis.ONE_SPLIT_ABI,ExchangeTypes.ONE_SPLIT_ADDRESS)
// export const UniswapRouterContract = new web3.eth.Contract(UNISWAP_ROUTER_ABI,ExchangeTypes.UNISWAP_ROUTER_ADDRESS)
