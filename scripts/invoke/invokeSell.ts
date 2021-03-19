import { TokenTypes, TokenSymbols } from "../models/tokenModels";
import { SaleService } from "../service/saleService";


export class InvokeSell{
    service= new SaleService();
    async searchForSellParaSwap(toToken: TokenTypes, fromToken:TokenTypes, inputAmount: number){
        await Promise.resolve(this.service.paraSwapCheckProfit({toToken, fromToken, inputAmount}))
    }
}