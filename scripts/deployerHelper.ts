import { AdamOptimizer, layers, Sequential } from "@tensorflow/tfjs";
import { InvokeBuy } from "./invoke/invokeBuy";
import { ExchangesTokensTypes, ExchangeTokenList } from "./models/tokenModels";

// require('@tensorflow/tfjs-node'); 
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
        exList.push((200*i))
        exList.push(200*i)
      }
      return await this.service.printExchangesAtDifferentPrices(ExchangesTokensTypes.DAI,ExchangesTokensTypes.WETH, exList);
    }

    async showDifferentExchangeRates(){
      let exList=[]
      for(let i=1;i<10;i++){
        exList.push(i)
      }
        return await this.service.showDifferentPrices(ExchangesTokensTypes.WETH,ExchangesTokensTypes.DAI, exList);
    }
    async arithmaticApproximation(){
      let numList: any[]=[]
      for(let i=20;i<40;i++){
        numList.push({inputTokenSymbol:ExchangesTokensTypes.DAI,outputTokenSymbol: ExchangesTokensTypes.WETH,inputAmount:
          (114*i)})
      }
      
      await this.service.arithmaticApproximation(numList)      
    }   
}
// await service.searchForBuy(ExchangesTokensTypes.USDC,ExchangesTokensTypes.DAI,10000)