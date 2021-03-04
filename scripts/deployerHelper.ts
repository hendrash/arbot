import { Sequential,layers } from "@tensorflow/tfjs";
import { InvokeBuy } from "./invoke/invokeBuy";
import { ExchangesTokensTypes, ExchangeTokenList } from "./models/tokenModels";
require('@tensorflow/tfjs-node'); 
export class DeployerHelper{

  service= new InvokeBuy()
  

   exchangeTokenList =ExchangeTokenList;

     async printOutExchange(){
        let list:any=[]
        this.exchangeTokenList.forEach((v,k)=>{
          list.push(k)
        })
        return await this.service.printOutExchanges(ExchangesTokensTypes.DAI,list, 4000)
    }
    async printOutOneExchange(){
      return await this.service.printOutOneExchange(ExchangesTokensTypes.WETH, ExchangesTokensTypes.DAI, 1)
    }
    async printExchangesAtDifferentPrices(){
      let exList=[]
      for(let i=1;i<10;i++){
        exList.push(Math.pow((20*i),2))
        exList.push(Math.pow((20*i),2))
      }
      return await this.service.printExchangesAtDifferentPrices(ExchangesTokensTypes.WETH,ExchangesTokensTypes.DAI, exList);
    }

    async showDifferentExchangeRates(){
      let exList=[]
      for(let i=1;i<30;i++){
        exList.push(Math.pow((1*i),2))
      }
      
      new Sequential({layers:[
        layers.dense({units:123,inputShape:[2],activation: 'relu'}),
        layers.dense({units:1})  
      ]})
      return await this.service.showDifferentPrices(ExchangesTokensTypes.WETH,ExchangesTokensTypes.DAI, exList);
    }
    
}
// await service.searchForBuy(ExchangesTokensTypes.USDC,ExchangesTokensTypes.DAI,10000)