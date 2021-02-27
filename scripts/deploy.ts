import { ethers } from "hardhat";
import { InvokeBuy } from "./invoke/invokeBuy";
import { ExchangesTokensTypes } from "./models/tokenModels";




async function main() {
  // WEB3 CONFIG
 
  const factory = await ethers.getContractFactory("Counter");

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy();

  let service= new InvokeBuy()


  // The address the Contract WILL have once mined
  console.log(contract.address);

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash);
 
  console.log("printing....")
  await service.searchForBuy(ExchangesTokensTypes.WETH,ExchangesTokensTypes.DAI,1000)

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed();
 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
