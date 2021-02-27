import { SimpleComputedRate } from "paraswap";
import { Api } from "../api/api";
import { TokenSymbols } from "../models/tokenModels";
import { Exchange } from "../util/exchange";

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
    async getParaSwap(tokenSymbol: TokenSymbols){
        const paraSwap = await this.api.getParaSwap(tokenSymbol);
        const buy=(paraSwap.others as SimpleComputedRate[]).reduce((a,b)=>{
        return (Math.min(Number(a.rate), Number(b.rate))===Number(a.rate)?a:b)   
       })
       const sell=(paraSwap.others as SimpleComputedRate[]).reduce((a,b)=>{
        return (Math.max(Number(a.rate), Number(b.rate))===Number(a.rate)?a:b)   
       })
        console.log("Buy Dia" )
        console.log(paraSwap)
        console.log("\n\n\n\n")
        await this.exchange.buySellParaSwap(sell,buy)
        
        return paraSwap;
    }
}1474986