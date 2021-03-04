
export enum ExchangesTokensTypes {
    WETH="WETH", DAI="DAI", USDC="USDC", USDT="USDT", LINK="LINK", AAVE="AAVE", UNI="UNI", SAI="SAI", MKR="MKR"
}
export enum ExchangeTypes {
    ONE_SPLIT_ADDRESS="ONE_SPLIT_ADDRESS",
    ZRX_EXCHANGE_ADDRESS="ZRX_EXCHANGE_ADDRESS",
    UNISWAP_FACTORY_ADDRESS="UNISWAP_FACTORY_ADDRESS",
    UNISWAP_ROUTER_ADDRESS="UNISWAP_ROUTER_ADDRESS",
    ARBITRAGE_ADDRESS="ARBITRAGE_ADDRESS"
}

export const ExchangeTokenList = new Map([
    [ExchangesTokensTypes.WETH, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
    [ExchangesTokensTypes.DAI, "0x6b175474e89094c44da98b954eedeac495271d0f"],
    [ExchangesTokensTypes.USDC, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"],
    [ExchangesTokensTypes.USDT, "0xdac17f958d2ee523a2206206994597c13d831ec7"],
    [ExchangesTokensTypes.LINK, "0x514910771af9ca656af840dff83e8264ecf986ca"],
    [ExchangesTokensTypes.AAVE, "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"],
    [ExchangesTokensTypes.UNI, "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"],
    [ExchangesTokensTypes.SAI, "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"],
    [ExchangesTokensTypes.MKR, "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"],
])

export const exchange = new Map([

    [ExchangeTypes.ONE_SPLIT_ADDRESS, "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"],
    [ExchangeTypes.ZRX_EXCHANGE_ADDRESS, "0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef"],
    [ExchangeTypes.UNISWAP_FACTORY_ADDRESS, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"],
    [ExchangeTypes.UNISWAP_ROUTER_ADDRESS, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"],
    [ExchangeTypes.ARBITRAGE_ADDRESS, "0x28984a014388ea6fc64da978cfac490dd71171db"]
])



export const ADDRESS = process.env.ADDRESS;
export const GAS_PRICE = process.env.GAS_PRICE;
export const GAS_LIMIT = process.env.GAS_LIMIT;
export const ESTIMATED_GAS = process.env.ESTIMATED_GAS;
export const TEST_MODE = true;
export const TEST_CCONTRACT = "TradingBot"

export type TokenSymbols={
    inputTokenSymbol: ExchangesTokensTypes,
    outputTokenSymbol: ExchangesTokensTypes,
    inputAmount: number | string
}