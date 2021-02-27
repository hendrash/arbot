import { ExchangesTokensTypes, ExchangeTokenList } from "../models/tokenModels"
import { ToWei } from "../utils"
import {web3} from "hardhat"

import { ParaSwap } from "paraswap";
// const { web3, ethers } = require("hardhat");
import { DexAg } from "./providers"
const DEXAG = require('dexag-sdk');

export class Api{

    readonly paraswap = new ParaSwap();
    constructor(){
        
        const dexAg= DEXAG.default.fromProvider(web3.currentProvider)
            web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY as string)
    }
    async getDexAg(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
        return await DexAg.getPrice({
            to:outputTokenSymbol,
            from:inputTokenSymbol,
            fromAmount: inputAmount , 
            dex: 'all'
        })
        
    }
    async getParaSwap(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol: ExchangesTokensTypes, inputAmount: number) {
       return await this.paraswap.getRate(inputTokenSymbol, outputTokenSymbol, inputAmount+"");
    }
}