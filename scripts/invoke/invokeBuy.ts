
import { Api } from "../api/api";
import { ExchangesTokensTypes } from "../models/tokenModels";
import { Service } from "../service/service";

export class InvokeBuy{
    service= new Service();
    api= new Api();

    async searchForBuy(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
    //WEB3 CONFIG
  let temp=await Promise.all([
    this.service.getDexAg(inputTokenSymbol, outputTokenSymbol,inputAmount)])
    temp.forEach(t=>{
      console.log(t)
    })  
  }
    
    
}
