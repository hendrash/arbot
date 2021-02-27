
import { ExchangesTokensTypes } from "../models/tokenModels";
import { Service } from "../service/service";

export class Invoke{
    service= new Service();

    async checkArb(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
    //WEB3 CONFIG

  await Promise.all([this.service.getDexAg(inputTokenSymbol, outputTokenSymbol,inputAmount), this.service.getParaSwap(inputTokenSymbol, outputTokenSymbol, inputAmount)])
    // const inputAmt = toWei(inputAmount.toString(), inputToken)
    }
    // async runSplit(){
    //     ONESPLIT_DISABLE_FLAGS.map(async flag=>(await this.api.fetchOneSplitData({
            
    //     }))

    //     )
    // }

    
}
