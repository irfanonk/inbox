const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
require("dotenv").config();

// console.log("env", process.env);
const provider = new HDWalletProvider(
  process.env.MNMC,
  process.env.INFURA_GOERLY_URL
  //process.env.INFURA_RINKEBY_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
      .send({ gas: 1_000_000, from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (error) {
    console.log("err", error);
    process.exit(1);
  }
};
deploy();
