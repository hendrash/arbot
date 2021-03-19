import { AdamOptimizer, layers, Sequential } from "@tensorflow/tfjs";
import { InvokeBuy } from "./invoke/invokeBuy";
import { TokenTypes, ExchangeTokenList, TokenSymbols } from "./models/tokenModels";
import { ToWei } from "./util/utils";

// require('@tensorflow/tfjs-node'); 
export class DeployerHelper{

  service= new InvokeBuy()
  

   exchangeTokenList =ExchangeTokenList;

     async printOutExchange(){
        let list:any=[]
        this.exchangeTokenList.forEach((v,k)=>{
          list.push(k)
        })
        return await this.service.printOutExchanges(TokenTypes.DAI,list, 4000)
    }
    async printOutOneExchange(){
      return await this.service.printOutOneExchange(TokenTypes.WETH, TokenTypes.DAI, 1)
    }
    async printExchangesAtDifferentPrices(){
      let exList=[]
      for(let i=1;i<10;i++){
        exList.push((200*i))
        exList.push(200*i)
      }
      return await this.service.printExchangesAtDifferentPrices(TokenTypes.DAI,TokenTypes.WETH, exList);
    }

    async showSingleExchangeRate(){
      let exList=[]
      for(let i=1;i<101;i++){
        exList.push(i)
      }
        return await this.service.showDifferentPrices(TokenTypes.WETH,TokenTypes.DAI, exList);
    }
    async showSingleExchangeRateDiaToWeth(){
      let exList=[]
      for(let i=1;i<101;i++){
        exList.push(i)
      }
        return await this.service.showDifferentPrices(TokenTypes.DAI,TokenTypes.WETH, exList,"flip");
    }

    /*
    Actual Approximation converts one currency to another using paraswap
    */
    async actualApproximation(){
      let numList: any[]=[]
      for(let i=1;i<200;i++){
        numList.push({toToken:TokenTypes.DAI,fromToken: TokenTypes.WETH,inputAmount:
          (i*100)})
      }
      
      await this.service.actualApproximation(numList)      
    }
    async findMaxTrade(){
    await this.iterateThroughList({toToken: TokenTypes.DAI, fromToken:TokenTypes.WETH},async (ts)=>{
     await this.service.findTradMax(ts);

    })
    }
    // async
    async iterateThroughList(tokenSymbol: TokenSymbols,iterate: (ts: TokenSymbols)=>any){
      tokenSymbol.inputAmounts=[];
      for(let i=1;i<10;i++){
        tokenSymbol.inputAmounts.push(i);
      }
      return await iterate(tokenSymbol);

    }
    async maxTrade(){
      let inputAmounts=[];
      for(let i=1;i<5;i++){
        inputAmounts.push(Number(ToWei(i*10+"","DAI")));
      }

     return await this.service.maxTrade({toToken: TokenTypes.DAI, fromToken:TokenTypes.WETH,inputAmounts});
     
    }   
}

// await service.searchForBuy(TokenTypes.USDC,TokenTypes.DAI,10000)