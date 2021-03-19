
import { Api } from "../api/api";
import { ErrorMessage, ExchangeRates } from "../models/exchange-rates";
import { TokenTypes, TokenSymbols, Inverse } from "../models/tokenModels";
import { BuyService } from "../service/buyService";

export class InvokeBuy{
    service= new BuyService();
    api= new Api();

    async searchForBuy(toToken: TokenTypes, fromToken:TokenTypes, inputAmount: number){
    //WEB3 CONFIG
  await Promise.all([
    this.service.getDexAg({toToken, fromToken,inputAmount}), 
    // this.service.getParaSwap({toToken, fromToken, inputAmount})
  ])
    }
    async printOutExchanges(toToken:TokenTypes, fromTokenList: TokenTypes[], inputAmount: number){
      return await Promise.all<ExchangeRates>([...
        fromTokenList.map(async fromToken=>
        await this.service.getParaSwap({toToken,fromToken, inputAmount})),
        ...fromTokenList.map(async fromToken=>
          await this.service.getParaSwap({toToken:fromToken,fromToken:toToken, inputAmount}))],
        ).then((item:ExchangeRates[]|any|ErrorMessage)=>{
        if(item?.forEach){
          item?.filter((u:ExchangeRates)=>u&&(u.tokens.toToken!=="USDT"&&u.tokens.toToken!=="USDC")).forEach((t:ExchangeRates)=>{
            console.log(t?.log)
          })
        }
          return item;
      })
    }
    async printExchangesAtDifferentPrices(toToken: TokenTypes,fromToken: TokenTypes,inputAmounts: number[]){
      let flip:boolean=false;

      return await Promise.all<ExchangeRates>(inputAmounts.map(async inputAmount=>{
        flip=!flip;
        if(flip){
          return await this.service.getParaSwap({toToken,fromToken,inputAmount})
      }
        else{
          return await this.service.getParaSwap({toToken:fromToken,fromToken:toToken,inputAmount})
        }
        })).then((item: ExchangeRates[])=>{
          // if(item?.forEach){
            for(let i=1; item.length>i;i+=2){
              for(let i=1; item.length>i;i+=2){
                if(item[i]){
              let amtMade=(item[i].exchangeRate-item[i-1].exchangeRate)*(item[i].srcAmt as any)
  
              console.log(item[i-1].log)
              console.log(item[i].log)
              console.log("amountMade: "+amtMade)
          
              }
            }
          }
        })
    }
    async printOutOneExchange(toToken: TokenTypes, fromToken: TokenTypes, inputAmount: number){
      return await this.service.getParaSwap({toToken, fromToken, inputAmount}).then((item)=>{
        console.log(item.log)
      })
    }
    async showDifferentPrices(toToken: TokenTypes, fromToken: TokenTypes, inputAmounts: number[],inverse?:Inverse){
      return await Promise.all(inputAmounts.map(inputAmount=>this.service.getParaSwap({toToken, fromToken, inputAmount,inverse}))).then(t=>{
        t.filter(t=>t&&t.srcAmt).map(t=>t.srcAmt+","+t.desAmt).forEach(j=>{
          console.log(j)
        })
    })
    }
    async arithmaticApproximation(tokenSymbol: TokenSymbols[]){
      return await Promise.all(tokenSymbol.map(async t=>{await this.service.arithmaticApproximation(t)})).then(r=>{

      })
    }
    async actualApproximation(tokenSymbol: TokenSymbols[]){
      return await Promise.all(tokenSymbol.map(async t=>{await this.service.actualApproximation(t)})).then(r=>{
      })
    }
    async findTradMax(tokenSymbol: TokenSymbols){
      return await Promise.all(tokenSymbol.inputAmounts!.map(async l=>await this.service.findMaxTrade(tokenSymbol,l))).then(r=>{
        console.log(r)
        r.forEach(t=>{
          console.log(t)
        })
      })
    }
    async maxTrade(tokenSymbol: TokenSymbols){
    return await Promise.all(tokenSymbol.inputAmounts!.map(async l=> {
      tokenSymbol.inputAmount=l;
      return await this.service.maxTrade(tokenSymbol)})
    ).then(t=>{
      let newList=t.filter(t=>t)

      console.log("Most profitable"+newList[newList.length-1])})
    }
}
