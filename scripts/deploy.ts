import { ethers } from "hardhat";
import { DeployerHelper } from "./deployerHelper";
import { InvokeBuy } from "./invoke/invokeBuy";
import { ExchangesTokensTypes, ExchangeTokenList } from "./models/tokenModels";




async function main() {
  let dh= new DeployerHelper();
  // WEB3 CONFIG
  /*
  const factory = await ethers.getContractFactory("Counter");

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy();

  // The address the Contract WILL have once mined
  console.log(contract.address);

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash);
 
  console.log("printing....")
  await contract.deployed();
*/




  //  await dh.printOutExchange();
  // The contract is NOT deployed yet; we must wait until it is mined
  
  // await dh.printExchangesAtDifferentPrices()
  // await dh.printOutOneExchange()
  
  await dh.showDifferentExchangeRates()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
