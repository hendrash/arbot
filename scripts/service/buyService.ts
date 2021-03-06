import { BigNumber } from 'bignumber.js';
import { OptimalRatesWithPartnerFees, ParaSwap } from 'paraswap';
import { result } from 'underscore';

import { Api } from "../api/api";
import { ExchangesTokensTypes, TokenSymbols } from "../models/tokenModels";
import { Exchange } from "../util/exchange";
import { FromWei } from "../util/utils";

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

        
            let result= this.stableCoinToNotStable(tokenSymbol, paraSwap);
            if(result){
            return {
            exchange: paraSwap.bestRoute[0].exchange,
            exchangeRate: result.exchangeRate,
            desAmt:result.desAmt,
            srcAmt: tokenSymbol.inputAmount,
            tokens: tokenSymbol,
            log:(paraSwap.bestRoute[0].exchange+"\t"+tokenSymbol.inputTokenSymbol+": "+result.srcAmt+"\t"+tokenSymbol.outputTokenSymbol+": "+result.desAmt+"\tExchange rate:"+
            result.exchangeRate
            )
        }; 
    }
        else{
            console.log(paraSwap)
            return;
        }
    }
    async arithmaticApproximation(tokenSymbol: TokenSymbols){
        await this.comparExchanges(tokenSymbol, (o1,o2)=>{
           let result1:any= this.stableCoinToNotStable(tokenSymbol, o1);
           let tokenSymbols2= {outputTokenSymbol: tokenSymbol.inputTokenSymbol, inputTokenSymbol: tokenSymbol.outputTokenSymbol, inputAmount: tokenSymbol.inputAmount}
            let result2:any=this.stableCoinToNotStable(tokenSymbols2,o2)
            // console.log("("+result2.exchangeRate+"-"+result1.exchangeRate+")"+tokenSymbol.inputAmount)+"="
            let total=(result2?.exchangeRate-result1?.exchangeRate)*tokenSymbol.inputAmount ;
            console.log(tokenSymbol.inputAmount+","+total)
        })
    }
    async comparExchanges(tokenSymbol: TokenSymbols,fun: (optimal:OptimalRatesWithPartnerFees,optimal2:OptimalRatesWithPartnerFees)=>any ){
    const paraSwap1= await this.api.getParaSwap(tokenSymbol)
    let result1=this.stableCoinToNotStable(tokenSymbol, paraSwap1)
      if(result1){
      let tokenSymbols2= {outputTokenSymbol: tokenSymbol.inputTokenSymbol, inputTokenSymbol: tokenSymbol.outputTokenSymbol, inputAmount: tokenSymbol.inputAmount}
      const paraSwap2= await this.api.getParaSwap(tokenSymbols2);
      let result2=this.stableCoinToNotStable(tokenSymbols2, paraSwap2)
      if(result2){
            return fun(paraSwap1, paraSwap2)
      }
       }
    }
    
    async actualApproximation(tokenSymbol: TokenSymbols){
        const token1=this.stableCoinToNotStable(tokenSymbol, await this.api.getParaSwap(tokenSymbol));
        let result1:TokenSymbols= {inputTokenSymbol:tokenSymbol.outputTokenSymbol,outputTokenSymbol:tokenSymbol.inputTokenSymbol,inputAmount: token1?.desAmt}
        // console.log(token1?.desAmt +"\tinput:\t"+result1.inputTokenSymbol+"\toutput:\t"+result1.outputTokenSymbol)

        const token2=this.stableCoinToNotStable(result1, await this.api.getParaSwap(result1));
        // console.log(token2?.desAmt +"\tinput:\t"+result1.inputTokenSymbol+"\toutput:\t"+result1.outputTokenSymbol)
        
        // let result2: TokenSymbols={inputTokenSymbol: tokenSymbol.inputTokenSymbol,outputTokenSymbol:tokenSymbol.outputTokenSymbol,inputAmount: token2?.desAmt }

        console.log(tokenSymbol.inputAmount +","+(token2?.desAmt-tokenSymbol.inputAmount))
    }

    stableCoinToNotStable(tokenSymbol: TokenSymbols, paraSwap: OptimalRatesWithPartnerFees,){
        let srcAmt: any;
        let desAmt: any;
        if(paraSwap.bestRoute){
            srcAmt=new BigNumber(tokenSymbol.inputAmount);
            desAmt= new BigNumber(FromWei(paraSwap.bestRoute[0].destAmount,tokenSymbol.outputTokenSymbol));   
        srcAmt=new BigNumber(tokenSymbol.inputAmount)
        if(tokenSymbol.inputTokenSymbol===ExchangesTokensTypes.WETH){
            return {
                srcAmt,desAmt,
                exchangeRate:(desAmt/srcAmt)};
        }
        else if(tokenSymbol.inputTokenSymbol===ExchangesTokensTypes.DAI){
            return{   srcAmt,desAmt, exchangeRate:(srcAmt/desAmt)}
        }
        return { srcAmt,desAmt,   exchangeRate:(srcAmt/desAmt)} 
    
    }
    }
}