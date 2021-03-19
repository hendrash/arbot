import axios from "axios";
import { web3 } from "hardhat";
import { APIError, OptimalRatesWithPartnerFees, OptimalRatesWithPartnerFeesSell, ParaSwap } from "paraswap";
import { TokenSymbols } from "../models/tokenModels";
import { ToWei } from "../util/utils";
// const { web3, ethers } = require("hardhat");
import { DexAg } from "./providers";

const DEXAG = require('dexag-sdk');

export class Api{

    private readonly URL_BASE = 'https://apiv2.paraswap.io/v2';
    readonly paraswap = new ParaSwap();
    constructor(){
        
      
            web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY as string)
    }
    async getDexAg(tokenSymbol:TokenSymbols){
        return await DexAg.getPrice({
            to:tokenSymbol.fromToken,
            from:tokenSymbol.toToken,
            fromAmount: tokenSymbol.inputAmount , 
            dex: 'all'
        })
        
    }
    async getParaSwap(tokenSymbol:TokenSymbols):Promise<OptimalRatesWithPartnerFees> {
       const paraswap = await this.paraswap.getRate(tokenSymbol.toToken, tokenSymbol.fromToken, ToWei(tokenSymbol.inputAmount+"",tokenSymbol.toToken)+"");
       if(paraswap as OptimalRatesWithPartnerFees ){
        return paraswap as OptimalRatesWithPartnerFees;   
       } 
       throw (paraswap as APIError).message;
    }
    async getRates(tokenSymbol: TokenSymbols) {
        
        const { data } = await axios.get(`${this.URL_BASE}/prices/?from=${tokenSymbol.fromToken}&to=${tokenSymbol.toToken}&amount=${ToWei(tokenSymbol.inputAmount+"",tokenSymbol.toToken)}&side=SELL&version=3.0.0&max_impact=100`);

        return data.priceRoute as OptimalRatesWithPartnerFeesSell;
    }


}