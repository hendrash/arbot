import { Api } from "../api/api";
import { TokenSymbols } from "../models/tokenModels";

export class SaleService{
    private api= new Api();
    
    async paraSwapCheckProfit(tokenSymbols: TokenSymbols){
        const paraswap = await this.api.getParaSwap(tokenSymbols)
        console.log("Sell Dia")
        console.log(paraswap)
        return paraswap;
    }
}