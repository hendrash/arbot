import { Api } from "../api/api";
import { ExchangesTokensTypes } from "../models/tokenModels";
// const { web3, ethers } = require("hardhat");
const DEXAG = require('dexag-sdk');

export class Service{
    private api = new Api();
    constructor(){
    }
    async getDexAg(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
       const dexAg = await this.api.getDexAg(inputTokenSymbol, outputTokenSymbol, inputAmount)
       console.log(dexAg)
       console.log("\n")
       return dexAg;
    }
    async getParaSwap(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
        const paraSwap = await this.api.getParaSwap(inputTokenSymbol, outputTokenSymbol, inputAmount);
        console.log(paraSwap)
        return paraSwap;
    }
}