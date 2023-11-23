const hre = require("hardhat");

async function main() {
  console.log("hi");
  const l2BridgeAddress = "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

  const L2Contract = await hre.ethers.getContractFactory("L2Contract");
  const l2Contract = await L2Contract.deploy(l2BridgeAddress);
  await l2Contract.deployed();

  console.log("L2Contract deployed to:", l2Contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// L2Contract deployed to: 0x1d1EFA4cA285cd86D3520a644e79c8984B9cC931
