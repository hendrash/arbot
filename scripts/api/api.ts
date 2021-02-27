import { ExchangesTokensTypes, ExchangeTokenList } from "../models/tokenModels"
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
    async getDexAg(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
        return await DexAg.getPrice({
            to:outputTokenSymbol,
            from:inputTokenSymbol,
            fromAmount: inputAmount , 
            dex: 'all'
        })
        
    }
    async getParaSwap(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol: ExchangesTokensTypes, inputAmount: number):Promise<OptimalRatesWithPartnerFees> {
       const paraswap = await this.paraswap.getRate(inputTokenSymbol, outputTokenSymbol, inputAmount+"");
       if(paraswap as OptimalRatesWithPartnerFees ){
        return paraswap as OptimalRatesWithPartnerFees;   
       } 
       throw (paraswap as APIError).message;
        
       
    }
}