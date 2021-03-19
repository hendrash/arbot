import { SimpleComputedRate } from "paraswap";
import { InvokeSell } from "../invoke/invokeSell";
import { TokenTypes } from "../models/tokenModels";

export class Exchange{
    sell = new InvokeSell();
    async buySellSearchParaSwap(buy:SimpleComputedRate, sell:SimpleComputedRate){
        return await this.sell.searchForSellParaSwap(TokenTypes.DAI, TokenTypes.WETH,1000)
    }
}