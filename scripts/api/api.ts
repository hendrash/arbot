import { web3 } from "hardhat";
import { APIError, OptimalRatesWithPartnerFees, ParaSwap } from "paraswap";
import { TokenSymbols } from "../models/tokenModels";
import { ToWei } from "../util/utils";
// const { web3, ethers } = require("hardhat");
import { DexAg } from "./providers";

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
        
       const paraswap = await this.paraswap.getRate(tokenSymbol.inputTokenSymbol, tokenSymbol.outputTokenSymbol, ToWei(tokenSymbol.inputAmount+"",tokenSymbol.inputTokenSymbol)+"");
       if(paraswap as OptimalRatesWithPartnerFees ){
        return paraswap as OptimalRatesWithPartnerFees;   
       } 
       throw (paraswap as APIError).message;
        
       
    }

}