const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // We get the contract to deploy
  const L2Contract = await hre.ethers.getContractFactory("L2Contract");
  const l2ContractAddress = process.env.L2_CONTRACT;
  const l1ContractAddress = process.env.L1_CONTRACT;
  const l2Contract = L2Contract.attach(l2ContractAddress);

  await l2Contract.deployed();

  const l1ContractAbi =
    require("../artifacts/contracts/GovernorAlpha.sol/GovernorAlpha.json").abi;
  const iface = new hre.ethers.utils.Interface(l1ContractAbi);
  const calldata = iface.encodeFunctionData("castVote", [
    "0xB4e6ee231C86bBcCB35935244CBE9cE333D30Bdf",
    1,
    true,
  ]);
  const to = l1ContractAddress;
  const tx = await l2Contract.sendMessageToL1(to, calldata);
  console.log(`sent tx hash ${tx.hash}`);
  console.log(`https://testnet-zkevm.polygonscan.com/tx/${tx.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
