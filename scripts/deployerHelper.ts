import { AdamOptimizer, layers, Sequential } from "@tensorflow/tfjs";
import { InvokeBuy } from "./invoke/invokeBuy";
import { ExchangesTokensTypes, ExchangeTokenList, TokenSymbols } from "./models/tokenModels";

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

    async showSingleExchangeRate(){
      let exList=[]
      for(let i=1;i<101;i++){
        exList.push(i)
      }
        return await this.service.showDifferentPrices(ExchangesTokensTypes.WETH,ExchangesTokensTypes.DAI, exList);
    }
    async showSingleExchangeRateDiaToWeth(){
      let exList=[]
      for(let i=1;i<101;i++){
        exList.push(i)
      }
        return await this.service.showDifferentPrices(ExchangesTokensTypes.DAI,ExchangesTokensTypes.WETH, exList);
    }

    /*
    Actual Approximation converts one currency to another using paraswap
    */
    async actualApproximation(){
      let numList: any[]=[]
      for(let i=1;i<101;i++){
        numList.push({inputTokenSymbol:ExchangesTokensTypes.DAI,outputTokenSymbol: ExchangesTokensTypes.WETH,inputAmount:
          (i)})
      }
      
      await this.service.actualApproximation(numList)      
    }
    async findMaxTrade(){
    await this.iterateThroughList({inputTokenSymbol: ExchangesTokensTypes.DAI, outputTokenSymbol:ExchangesTokensTypes.WETH},async (ts)=>{
     await this.service.findTradMax(ts);
    })
    }
    async iterateThroughList(tokenSymbol: TokenSymbols,iterate: (ts: TokenSymbols)=>any){
      tokenSymbol.inputAmounts=[];
      for(let i=0;i<2;i++){
        tokenSymbol.inputAmounts.push(i);
      }
      return await iterate(tokenSymbol);

    }   
}
// await service.searchForBuy(ExchangesTokensTypes.USDC,ExchangesTokensTypes.DAI,10000)