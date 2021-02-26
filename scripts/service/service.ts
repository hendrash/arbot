import { Agregators } from "../agregators/agregators";
import { Api } from "../api/api";
import { ExchangesTokensTypes, ExchangeTokenList } from "../models/tokenModels";

export class Service{
    agregators: any;
constructor(){
     this.agregators = new Agregators();
}
    async checkArb(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
    //WEB3 CONFIG

  await Promise.all([this.agregators.getDexAg(inputTokenSymbol, outputTokenSymbol,inputAmount)])
    // const inputAmt = toWei(inputAmount.toString(), inputToken)
    }
    // async runSplit(){
    //     ONESPLIT_DISABLE_FLAGS.map(async flag=>(await this.api.fetchOneSplitData({
            
    //     }))

    //     )
    // }
    
}
