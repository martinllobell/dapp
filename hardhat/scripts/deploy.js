const fs = require("fs");
const path = require("path");


async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Desplegar contrato P2PBetting
  const P2PBetting = await ethers.getContractFactory("contracts/P2PBetting.sol:P2PBetting");
  const p2pBetting = await P2PBetting.deploy(
    2000, // Ejemplo de fee
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Ejemplo de propietario
    8293 // Ejemplo de subscriptionId
  );
  await p2pBetting.deployed();
  console.log("P2PBetting deployed to:", p2pBetting.address);

  // Desplegar contrato P2PBettingActions
  const P2PBettingActions = await ethers.getContractFactory("contracts/P2PBettingActions.sol:P2PBettingActions");
  const p2pBettingActions = await P2PBettingActions.deploy('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  await p2pBettingActions.deployed();
  console.log("P2PBettingActions deployed to:", p2pBettingActions.address);

  // Desplegar contrato P2PBettingFront
  const P2PBettingFront = await ethers.getContractFactory("contracts/P2PBettingFront.sol:P2PBettingFront");
  const p2pBettingFront = await P2PBettingFront.deploy(2000, '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  await p2pBettingFront.deployed(2000);
  console.log("P2PBettingFront deployed to:", p2pBettingFront.address);

  // Guardar direcciones de los contratos en un archivo JSON
  saveFrontendFiles({
    P2PBetting: p2pBetting.address,
    P2PBettingActions: p2pBettingActions.address,
    P2PBettingFront: p2pBettingFront.address,
  });
}

function saveFrontendFiles(contracts) {
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(contracts, undefined, 2)
  );

  const P2PBettingArtifact = artifacts.readArtifactSync("contracts/P2PBetting.sol:P2PBetting");
  fs.writeFileSync(
    path.join(contractsDir, "P2PBetting.json"),
    JSON.stringify(P2PBettingArtifact, null, 2)
  );

  const P2PBettingActionsArtifact = artifacts.readArtifactSync("contracts/P2PBettingActions.sol:P2PBettingActions");
  fs.writeFileSync(
    path.join(contractsDir, "P2PBettingActions.json"),
    JSON.stringify(P2PBettingActionsArtifact, null, 2)
  );

  const P2PBettingFrontArtifact = artifacts.readArtifactSync("contracts/P2PBettingFront.sol:P2PBettingFront");
  fs.writeFileSync(
    path.join(contractsDir, "P2PBettingFront.json"),
    JSON.stringify(P2PBettingFrontArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
