import { SimpleComputedRate } from "paraswap";
import { InvokeSell } from "../invoke/invokeSell";
import { ExchangesTokensTypes } from "../models/tokenModels";

export class Exchange{
    sell = new InvokeSell();
    async buySellParaSwap(buy:SimpleComputedRate, sell:SimpleComputedRate){
        return await this.sell.searchForSellParaSwap(ExchangesTokensTypes.DAI, ExchangesTokensTypes.WETH,Number(sell.rate))
    }
}