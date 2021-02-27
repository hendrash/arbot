import { SimpleComputedRate } from "paraswap";
import { Api } from "../api/api";
import { ExchangesTokensTypes } from "../models/tokenModels";
import { Exchange } from "../util/exchange";

const DEXAG = require('dexag-sdk');

export class Service{
    private api = new Api();
    private exchange = new Exchange();
    constructor(){
    }
    async getDexAg(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
       const dexAg = await this.api.getDexAg(inputTokenSymbol, outputTokenSymbol, inputAmount)
       console.log(dexAg)
       return dexAg;
    }
    async getParaSwap(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
        const paraSwap = await this.api.getParaSwap(inputTokenSymbol, outputTokenSymbol, inputAmount);
        const buy=(paraSwap.others as SimpleComputedRate[]).reduce((a,b)=>{
        return Math.min(Number(a.rate), Number(b.rate))===Number(a.rate)?a:b   
       })
        this.exchange.buySell(buy, paraSwap.bestRoute[0] as SimpleComputedRate)
        return paraSwap;
    }
}