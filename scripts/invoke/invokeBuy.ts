
import { Api } from "../api/api";
import { ExchangesTokensTypes } from "../models/tokenModels";
import { BuyService } from "../service/buyService";

export class InvokeBuy{
    service= new BuyService();
    api= new Api();

    async searchForBuy(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
    //WEB3 CONFIG
  await Promise.all([
    // this.service.getDexAg({inputTokenSymbol, outputTokenSymbol,inputAmount}), 
    this.service.getParaSwap({inputTokenSymbol, outputTokenSymbol, inputAmount})])
    }
    
}
