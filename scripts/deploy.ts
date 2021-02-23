import { ethers } from "hardhat";

const Web3 = require('web3');
async function main() {
  // WEB3 CONFIG
  Web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  const factory = await ethers.getContractFactory("Counter");

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy();

  // The address the Contract WILL have once mined
  console.log(contract.address);

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash);

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
