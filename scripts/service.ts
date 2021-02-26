import { Api } from "./api";
import { ExchangesTokensTypes, ExchangeTokenList } from "./models/tokenModels";
import { ToWei } from "./utils";

const { web3, ethers } = require("hardhat");
const DEXAG = require('dexag-sdk');

export class Service{
private api = new Api();
    constructor(){
            const dexAg= DEXAG.default.fromProvider(web3.currentProvider)
    }
    checkArb(inputTokenSymbol: ExchangesTokensTypes, outputTokenSymbol:ExchangesTokensTypes, inputAmount: number){
    //WEB3 CONFIG

    
    web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY)
    const inputAddr=ExchangeTokenList.get(inputTokenSymbol)
    const outputAddr=ExchangeTokenList.get(outputTokenSymbol)
    const inputAssetAmount= ToWei(inputAmount.toString(), inputTokenSymbol)
    this.api.fetchDexAgData({
        toToken:outputTokenSymbol,
        fromToken:inputTokenSymbol,
        amount: inputAmount ,
    })
console.log("HELLO WORLD")
    
    // const inputAmt = toWei(inputAmount.toString(), inputToken)
    }
    // async runSplit(){
    //     ONESPLIT_DISABLE_FLAGS.map(async flag=>(await this.api.fetchOneSplitData({
            
    //     }))

    //     )
    // }
}