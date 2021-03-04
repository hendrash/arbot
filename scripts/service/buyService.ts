import {BigNumber} from 'bignumber.js'
import { SimpleComputedRate } from "paraswap";
import { any } from 'underscore';
import { Api } from "../api/api";
import { ExchangeRates } from '../models/exchange-rates';
import { TokenSymbols } from "../models/tokenModels";
import { Exchange } from "../util/exchange";
import { FromWei, ToWei } from "../util/utils";

const DEXAG = require('dexag-sdk');

export class BuyService{
    private api = new Api();
    private exchange = new Exchange();
    
    constructor(){
    }
    async getDexAg(tokenSymbol: TokenSymbols){
       const dexAg = await this.api.getDexAg(tokenSymbol)
       console.log(dexAg)
       return dexAg;
    }
    async getParaSwap(tokenSymbol: TokenSymbols):Promise<any>{
  
        const paraSwap = await this.api.getParaSwap(tokenSymbol);

        let srcAmt:any;
        let desAmt: any
        if(paraSwap.bestRoute){
            srcAmt=new BigNumber(tokenSymbol.inputAmount);
            desAmt= new BigNumber(FromWei(paraSwap.bestRoute[0].destAmount,tokenSymbol.outputTokenSymbol));
        return {
            exchange: paraSwap.bestRoute[0].exchange,
            exchangeRate:desAmt/srcAmt,
            desAmt:desAmt,
            srcAmt: tokenSymbol.inputAmount,
            tokens: tokenSymbol,
            log:(paraSwap.bestRoute[0].exchange+"\t"+tokenSymbol.inputTokenSymbol+": "+srcAmt+"\t"+tokenSymbol.outputTokenSymbol+": "+desAmt+"\tExchange rate:"+
            desAmt/srcAmt
            
            )
        }; 
    }
        else{
            console.log(paraSwap)
            return;
        }

    }
}