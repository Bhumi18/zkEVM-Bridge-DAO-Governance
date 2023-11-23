require("dotenv").config();

async function main() {
  // uni
  const Uni = await ethers.getContractFactory("Uni");
  let uni = Uni.deploy(
    "0xB4e6ee231C86bBcCB35935244CBE9cE333D30Bdf",
    "0xB4e6ee231C86bBcCB35935244CBE9cE333D30Bdf",
    "1700722610"
  );
  uni = await (await uni).deployed();
  console.log(`uni deployed to ${uni.address}`);

  // timelock
  const Timelock = await hre.ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy(
    "0xB4e6ee231C86bBcCB35935244CBE9cE333D30Bdf",
    "181440"
  );
  await timelock.deployed();
  console.log("timelock deployed to:", timelock.address);

  //
  const l2ContractAddress = process.env.L2_CONTRACT;
  const l1BridgeAddress = "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";
  // We get the contract to deploy
  const GovernorAlpha = await hre.ethers.getContractFactory("GovernorAlpha");
  const governorAlpha = await GovernorAlpha.deploy(
    "0x4D21136a064B4A32db470AAc3743C2A8442F67bC",
    "0x93C81F9d6f8A7AF47280756C61684fcD9C32cDDe",
    l2ContractAddress,
    l1BridgeAddress
  );
  await governorAlpha.deployed();
  console.log("governorAlpha deployed to:", governorAlpha.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// uni deployed to 0x93C81F9d6f8A7AF47280756C61684fcD9C32cDDe
// timelock deployed to: 0x4D21136a064B4A32db470AAc3743C2A8442F67bC
// governorAlpha deployed to: 0xF5c88c7f5586449883aC010edC633df9174ef1FB
