
import { BigNumber } from "ethers/lib/ethers";
import { Api } from "../api/api";
import { ErrorMessage, ExchangeRates } from "../models/exchange-rates";
import { ExchangesTokensTypes } from "../models/tokenModels";
import { BuyService } from "../service/buyService";

export class InvokeBuy{
    service= new BuyService();
    api= new Api();

    async searchForBuy(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
    //WEB3 CONFIG
  await Promise.all([
    this.service.getDexAg({inputTokenSymbol, outputTokenSymbol,inputAmount}), 
    // this.service.getParaSwap({inputTokenSymbol, outputTokenSymbol, inputAmount})
  ])
    }
    async printOutExchanges(inputTokenSymbol:ExchangesTokensTypes, outputTokenSymbolList: ExchangesTokensTypes[], inputAmount: number){
      return await Promise.all<ExchangeRates>([...
        outputTokenSymbolList.map(async outputTokenSymbol=>
        await this.service.getParaSwap({inputTokenSymbol,outputTokenSymbol, inputAmount})),
        ...outputTokenSymbolList.map(async outputTokenSymbol=>
          await this.service.getParaSwap({inputTokenSymbol:outputTokenSymbol,outputTokenSymbol:inputTokenSymbol, inputAmount}))],
        ).then((item:ExchangeRates[]|any|ErrorMessage)=>{
        if(item?.forEach){
          item?.filter((u:ExchangeRates)=>u&&(u.tokens.inputTokenSymbol!=="USDT"&&u.tokens.inputTokenSymbol!=="USDC")).forEach((t:ExchangeRates)=>{
            console.log(t?.log)
          })
        }
          return item;
      })
    }
    async printExchangesAtDifferentPrices(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol: ExchangesTokensTypes,inputAmounts: number[]){
      let flip:boolean=false;

      return await Promise.all<ExchangeRates>(inputAmounts.map(async inputAmount=>{
        flip=!flip;
        if(flip){
          return await this.service.getParaSwap({inputTokenSymbol,outputTokenSymbol,inputAmount})
      }
        else{
          return await this.service.getParaSwap({inputTokenSymbol:outputTokenSymbol,outputTokenSymbol:inputTokenSymbol,inputAmount})
        }
        })).then((item: ExchangeRates[])=>{
          // if(item?.forEach){
            for(let i=1; item.length>i;i+=2){
              if(item[i]){
            let amtMade=((item[i].srcAmt as any)*item[i-1].exchangeRate*item[i].exchangeRate)-(item[i].srcAmt as any)
            console.log(item[i-1].log)
            console.log(item[i].log)  
            console.log("amountMade: "+amtMade)}
            }
        })
    }
    async printOutOneExchange(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol: ExchangesTokensTypes, inputAmount: number){
      return await this.service.getParaSwap({inputTokenSymbol, outputTokenSymbol, inputAmount}).then((item)=>{
        console.log(item.log)
      })
    }
    async showDifferentPrices(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol: ExchangesTokensTypes, inputAmounts: number[]){
      return await Promise.all(inputAmounts.map(inputAmount=>this.service.getParaSwap({inputTokenSymbol, outputTokenSymbol, inputAmount}))).then(t=>{
        t.forEach(t=>console.log(t.log));
        
      })
    }
}
