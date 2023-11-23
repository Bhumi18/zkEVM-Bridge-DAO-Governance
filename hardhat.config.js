require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
  throw new Error("PRIVATE_KEY not set");
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "polygonzkevm",
  networks: {
    polygonzkevm: {
      url: process.env.POLYGON_ZKEVM_RPC || "https://rpc.public.zkevm-test.net",
      accounts: [privateKey],
    },
    goerli: {
      url:
        process.env.GOERLI_RPC ||
        "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [privateKey],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
      {
        version: "0.6.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
      {
        version: "0.5.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
      {
        version: "0.4.19",
        settings: {
          optimizer: {
            enabled: false,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      polygonzkevm: `${process.env.ETHERSCAN_ZKEVM_API_KEY}`,
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "polygonzkevm",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/",
        },
      },
    ],
  },
};
