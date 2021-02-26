import { ExchangesTokensTypes, ExchangeTokenList } from "../models/tokenModels"
import { ToWei } from "../utils"
import {web3} from "hardhat"
import { Api } from "../api/api";
// const { web3, ethers } = require("hardhat");
const DEXAG = require('dexag-sdk');

export class Agregators{
    private api = new Api();
    constructor(){
            const dexAg= DEXAG.default.fromProvider(web3.currentProvider)
    }
    async getDexAg(inputTokenSymbol: ExchangesTokensTypes,outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
        web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY as string)
        const inputAddr=ExchangeTokenList.get(inputTokenSymbol)
        const outputAddr=ExchangeTokenList.get(outputTokenSymbol)
        const inputAssetAmount= ToWei(inputAmount.toString(), inputTokenSymbol)
        const dexAg = await this.api.fetchDexAgData({
            toToken:outputTokenSymbol,
            fromToken:inputTokenSymbol,
            amount: inputAmount ,
        })
        console.log(dexAg)
    
    }
}