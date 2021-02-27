import { ExchangesTokensTypes, TokenSymbols } from "../models/tokenModels";
import { SaleService } from "../service/saleService";

export class InvokeSell{
    service= new SaleService();
    async searchForSellParaSwap(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
        await Promise.resolve(this.service.paraSwapCheckProfit({inputTokenSymbol, outputTokenSymbol, inputAmount}))
    }
}