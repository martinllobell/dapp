async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const P2PBetting = await ethers.getContractFactory("P2PBetting");
    const p2pBetting = await P2PBetting.deploy(
      /* Constructor arguments: fee, owner, subscriptionId */
      2000, // Example fee
      deployer.address, // Example owner
      8293 // Example subscriptionId
    );
  
    await p2pBetting.deployed();
  
    console.log("P2PBetting deployed to:", p2pBetting.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  