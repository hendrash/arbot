import { BigNumber } from 'bignumber.js';
import { OptimalRatesWithPartnerFees, ParaSwap } from 'paraswap';
import { max, result } from 'underscore';

import { Api } from "../api/api";
import { TokenTypes, TokenSymbols } from "../models/tokenModels";
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

        
            let result= this.stableCoinToNotStable(tokenSymbol, paraSwap);
            if(result){
            return {
            exchange: paraSwap.bestRoute[0].exchange,
            exchangeRate: result.exchangeRate,
            desAmt:(tokenSymbol.inverse&&tokenSymbol.inverse==="flip")?(1/result.desAmt):result.desAmt,
            srcAmt: tokenSymbol.inputAmount,
            tokens: tokenSymbol,
            log:(paraSwap.bestRoute[0].exchange+"\t"+tokenSymbol.toToken+": "+result.srcAmt+"\t"+tokenSymbol.fromToken+": "+result.desAmt+"\tExchange rate:"+
            result.exchangeRate
            )
        }; 
    }
        else{
            console.log(paraSwap)
            return;
        }
    }

    async comparExchanges(tokenSymbol: TokenSymbols,fun: (optimal:OptimalRatesWithPartnerFees,optimal2:OptimalRatesWithPartnerFees)=>any ){
    const paraSwap1= await this.api.getParaSwap(tokenSymbol)
    let result1=this.stableCoinToNotStable(tokenSymbol, paraSwap1)
      if(result1){
      let tokenSymbols2= {fromToken: tokenSymbol.toToken, toToken: tokenSymbol.fromToken, inputAmount: tokenSymbol.inputAmount}
      const paraSwap2= await this.api.getParaSwap(tokenSymbols2);
      let result2=this.stableCoinToNotStable(tokenSymbols2, paraSwap2)
      if(result2){
            return await fun(paraSwap1, paraSwap2)
      }
       }
    }
    
    async actualApproximation(tokenSymbol: TokenSymbols){
        try{
        const token1=this.stableCoinToNotStable(tokenSymbol, await this.api.getParaSwap(tokenSymbol));
        let result1:TokenSymbols= {toToken:tokenSymbol.fromToken,fromToken:tokenSymbol.toToken,inputAmount: token1?.desAmt}
        // console.log(token1?.desAmt +"\tinput:\t"+result1.toToken+"\toutput:\t"+result1.fromToken)

        const token2=this.stableCoinToNotStable(result1, await this.api.getParaSwap(result1));
        // console.log(token2?.desAmt +"\tinput:\t"+result1.toToken+"\toutput:\t"+result1.fromToken)
        
        // let result2: TokenSymbols={toToken: tokenSymbol.toToken,fromToken:tokenSymbol.fromToken,inputAmount: token2?.desAmt }

        console.log(tokenSymbol.inputAmount +","+(token2?.desAmt-(tokenSymbol.inputAmount as number)))}
        catch(exception:any){
        }
    }
   

    stableCoinToNotStable(tokenSymbol: TokenSymbols, paraSwap: OptimalRatesWithPartnerFees,){
        let srcAmt: any;
        let desAmt: any;
        if(paraSwap.bestRoute){
            srcAmt=new BigNumber((tokenSymbol.inputAmount as number));
            desAmt= new BigNumber(FromWei(paraSwap.bestRoute[0].destAmount,tokenSymbol.fromToken));   
        srcAmt=new BigNumber(tokenSymbol.inputAmount as number)
        if(tokenSymbol.toToken===TokenTypes.WETH){
            return {
                srcAmt,desAmt,
                exchangeRate:(srcAmt/desAmt)};
        }
        else if(tokenSymbol.toToken===TokenTypes.DAI){
            return{   srcAmt,desAmt, exchangeRate:(srcAmt/desAmt)}
        }
        return { srcAmt,desAmt,   exchangeRate:(desAmt/srcAmt)} 
    
    }
    }
    async arithmaticApproximation(tokenSymbol: TokenSymbols){
        await this.comparExchanges(tokenSymbol, (o1,o2)=>{
           let result1:any= this.stableCoinToNotStable(tokenSymbol, o1);
           let tokenSymbols2= {fromToken: tokenSymbol.toToken, toToken: tokenSymbol.fromToken, inputAmount: tokenSymbol.inputAmount}
            let result2:any=this.stableCoinToNotStable(tokenSymbols2,o2)
            // console.log("("+result2.exchangeRate+"-"+result1.exchangeRate+")"+tokenSymbol.inputAmount)+"="
            let total=(result2?.exchangeRate-result1?.exchangeRate)*(tokenSymbol.inputAmount as number);
            console.log(tokenSymbol.inputAmount+","+total)
        })
    }
    async findMaxTrade(tokenSymbol: TokenSymbols,t: number){
        let target:any;
            tokenSymbol.inputAmount=t;
           await tokenSymbol.inputAmounts!.forEach(async ()=>{
                 await this.compareTokens(tokenSymbol,(t1)=>{
                     console.log(t1)
                if(!target||target.destAmount<t1.destAmount){
                    target=t1;
                }
                return target;
            })
            })
            
            return target;
    }

    async compareTokens(tokenSymbol: TokenSymbols, fun: (optimal2:OptimalRatesWithPartnerFees,optimal?:OptimalRatesWithPartnerFees)=>any){
        try{
            let o1:any;
            let o2:any;
        const token1=this.stableCoinToNotStable(tokenSymbol, o1=await this.api.getParaSwap(tokenSymbol));
        let result1:TokenSymbols= {toToken:tokenSymbol.fromToken,fromToken:tokenSymbol.toToken,inputAmount: token1?.desAmt}
        // console.log(token1?.desAmt +"\tinput:\t"+result1.toToken+"\toutput:\t"+result1.fromToken)

        const token2=this.stableCoinToNotStable(result1, o2=await this.api.getParaSwap(result1));
        // console.log(token2?.desAmt +"\tinput:\t"+result1.toToken+"\toutput:\t"+result1.fromToken)
        
        // let result2: TokenSymbols={toToken: tokenSymbol.toToken,fromToken:tokenSymbol.fromToken,inputAmount: token2?.desAmt }
        
        // console.log(tokenSymbol.inputAmount +","+(token2?.desAmt-(tokenSymbol.inputAmount as number)))
        let targetFunction=fun(o1, o2)
        return {token1, token2,targetFunction}
    }
        catch(exception:any){
        }
    }
    async getExchangeRateApproximationDiaToWeth(){
        return  (await this.api.getParaSwap({toToken:TokenTypes.DAI,fromToken: TokenTypes.WETH,inputAmount:1})).destAmount
    }
    async getAmountDiaWeth(tokenSymbol:TokenSymbols){
        let approxAmount:any= await this.getExchangeRateApproximationDiaToWeth();
        //tokenSymbol.inputAmount=approxAmount;
    //WETH TO DIA
        let desAmt:any =(await this.api.getParaSwap(tokenSymbol)).destAmount;
        // this.api.getParaSwap(approxAmount*desAmt)
        
    }
    maximum: any;
    async maxTrade(tokenSymbol: TokenSymbols){
        let resp=await this.api.getRates(tokenSymbol)
        let desAmt=FromWei(resp.destAmount,tokenSymbol.fromToken)
        let token2:TokenSymbols=({toToken:tokenSymbol.fromToken, fromToken: tokenSymbol.toToken});
        token2.inputAmount=Number(desAmt);
        let final=Number(FromWei((await this.api.getRates(token2)).destAmount,tokenSymbol.toToken))
        console.log(final)
        if(!this.maximum||tokenSymbol.inputAmount &&final>tokenSymbol.inputAmount){
            this.maximum=resp;
           console.log(final) 
            return final;
        }       

    }
}