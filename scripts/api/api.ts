import { ExchangesTokensTypes, ExchangeTokenList, TokenSymbols } from "../models/tokenModels"
import { ToWei } from "../util/utils"
import {web3} from "hardhat"

import {  APIError, OptimalRatesWithPartnerFees, ParaSwap } from "paraswap";
// const { web3, ethers } = require("hardhat");
import { DexAg } from "./providers"
import { type } from "os";
const DEXAG = require('dexag-sdk');

export class Api{

    readonly paraswap = new ParaSwap();
    constructor(){
        
      
            web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY as string)
    }
    async getDexAg(tokenSymbol:TokenSymbols){
        return await DexAg.getPrice({
            to:tokenSymbol.outputTokenSymbol,
            from:tokenSymbol.inputTokenSymbol,
            fromAmount: tokenSymbol.inputAmount , 
            dex: 'all'
        })
        
    }
    async getParaSwap(tokenSymbol:TokenSymbols):Promise<OptimalRatesWithPartnerFees> {
       const paraswap = await this.paraswap.getRate(tokenSymbol.inputTokenSymbol, tokenSymbol.outputTokenSymbol, tokenSymbol.inputAmount+"");
       if(paraswap as OptimalRatesWithPartnerFees ){
        return paraswap as OptimalRatesWithPartnerFees;   
       } 
       throw (paraswap as APIError).message;
        
       
    }
}