const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { ethers } = require("ethers");
const { interface, bytecode } = require("./compile");
require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.MNMC,
  process.env.INFURA_ROBSTEN_URL
);
const web3 = new Web3(provider);
const deploy = async () => {
  try {
    console.log("Running deployWithEthers script...");
    const constructorArgs = ["Hi"]; // Put constructor args (if any) here for your contract

    const signer = new ethers.providers.Web3Provider(provider).getSigner();

    let factory = new ethers.ContractFactory(interface, bytecode, signer);

    let contract = await factory.deploy(...constructorArgs);

    console.log("Contract Address: ", contract.address);

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed();
    console.log("Deployment successful.");
    provider.engine.stop();
  } catch (e) {
    console.log("err1", e);
    process.exit(1);
  }
};
deploy();
