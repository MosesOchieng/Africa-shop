const { ethers } = require("hardhat"); 
require("dotenv").config({ path: ".env" }); 

async function main() {
  const daoContractFactory = await ethers.getContractFactory("FarmDAO");
  const marketplaceContractFactory = await ethers.getContractFactory("Marketplace"); 

  const daoContract = await daoContractFactory.deploy("FarmDAO Contract"); 
  await daoContract.deployed(); 

  const marketplaceContract = await marketplaceContractFactory.deploy(daoContract.address);
  await marketplaceContract.deployed();
  
  console.log("FarmDAO contract address: ", daoContract.address);
  console.log("Marketplace contract address: ", marketplaceContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// FarmDAO contract address:  0x14D4D952E641b8837408a087b20661885Bc94142
// Marketplace contract address:  0x3412b425Cd05968DF71119C2B02deDe6e6CEDDA2

// FarmDAO contract address:  0x50d13F167AA9EB92e9e7D70425939bAF0370Baf7
// Marketplace contract address:  0xa144EB01347ce7E3D7D5adf2B1F0DbEE275Ebe4A

// FarmDAO contract address:  0x1092dF9273f46a10d9f497cec73610D32d8D9BD9
// Marketplace contract address:  0x0B73D490fF0368B4bDF6137F82afAC21E1FB5625

// FarmDAO contract address:  0xf1A7FB954B9ab4AD9Ab9F33040cDD55A5B59BcE0
// Marketplace contract address:  0x2F3fB598dbECbA243c573A700a9a093d4c1dFAbF