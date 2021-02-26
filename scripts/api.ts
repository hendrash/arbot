import { ActionType } from "hardhat/types";
import { ArgTypes } from "./models/interfaces";
import {DexAg, /*OneSplitContract, UniswapRouterContract*/} from "./models/providers" 
export class Api {
    
     
    // public async fetchOneSplitData(args: ArgTypes) {
    //     return await OneSplitContract.methods.getExpectedReturn(args.fromToken, args.toToken,args.amount, 10, args.flag).call({from: ''});
    // }
    public async fetchDexAgData(args: ArgTypes){
        return await DexAg.getPrice({to: args.toToken, from:args.fromToken, fromAmount: args.amount, dex: 'all'})
    }
}