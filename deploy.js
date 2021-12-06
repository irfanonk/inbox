const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
require("dotenv").config();

// console.log("env", process.env);
const provider = new HDWalletProvider(
  process.env.MNMC,
  process.env.INFURA_RINKEBY_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
        arguments: ["Hi"],
      })
      .send({ from: accounts[0], gas: "1000000" });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (error) {
    console.log("err", error);
    process.exit(1);
  }
};
deploy();
