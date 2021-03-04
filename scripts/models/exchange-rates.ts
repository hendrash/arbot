import { BigNumber } from "ethers";
import { type } from "os";
import { TokenType } from "paraswap/build/lib/token";
import { TokenSymbols } from "./tokenModels";

export type ExchangeRates={
    exchange:string;
    exchangeRate:number;
    desAmt:BigNumber;
    tokens: TokenSymbols;
    log?:string
    srcAmt?:BigNumber
    
}
export type ErrorMessage= {
    status:number;
    message:string
}