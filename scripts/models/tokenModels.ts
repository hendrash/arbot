
export enum ExchangesTokensTypes {
    WETH, DAI, USDC, USDT, LINK, AAVE, UNI, SAI, MKR
}
export enum ExchangeTypes {
    ONE_SPLIT_ADDRESS,
    ZRX_EXCHANGE_ADDRESS,
    UNISWAP_FACTORY_ADDRESS,
    UNISWAP_ROUTER_ADDRESS,
    ARBITRAGE_ADDRESS
}

export const exchangeTokenList: Addr[] = [{
    name: ExchangesTokensTypes.WETH, address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
}, {
    name: ExchangesTokensTypes.DAI, address: "0x6b175474e89094c44da98b954eedeac495271d0f"
}, {
    name: ExchangesTokensTypes.USDC, address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
}, {
    name: ExchangesTokensTypes.USDT, address: "0xdac17f958d2ee523a2206206994597c13d831ec7"
}, {
    name: ExchangesTokensTypes.LINK, address: "0x514910771af9ca656af840dff83e8264ecf986ca"
}, {
    name: ExchangesTokensTypes.AAVE, address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
}, {
    name: ExchangesTokensTypes.UNI, address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
}, {
    name: ExchangesTokensTypes.SAI, address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
}, {
    name: ExchangesTokensTypes.MKR, address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
}]

export const exchange: Addr[] = [
    {
        name: ExchangeTypes.ONE_SPLIT_ADDRESS,
        address: "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"
    },
    {
        name: ExchangeTypes.ZRX_EXCHANGE_ADDRESS,
        address: "0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef"
    }, {
        name: ExchangeTypes.UNISWAP_FACTORY_ADDRESS,
        address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    }, {
        name: ExchangeTypes.UNISWAP_ROUTER_ADDRESS,
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    }, {
        name: ExchangeTypes.ARBITRAGE_ADDRESS,
        address: "0x28984a014388ea6fc64da978cfac490dd71171db"
    }]

export type Addr = {
    name: ExchangesTokensTypes | ExchangeTypes,
    address: string
}


const ONE_SPLIT_ADDRESS = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E";
const ZRX_EXCHANGE_ADDRESS = "0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef";
const UNISWAP_FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const ARBITRAGE_ADDRESS = "0x28984a014388ea6fc64da978cfac490dd71171db";
