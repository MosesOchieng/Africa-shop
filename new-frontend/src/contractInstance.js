import { Provider } from "@ethersproject/providers";
import { marketplaceAbi, farmDaoAbi, farmdaoContractAddress, marketplaceContractAddress } from "./constants ";
import { ethers } from "ethers";

const getProviderOrSigner = async (needSigner = false) => {
  try {

    let farmDaoContract; 
    let marketplaceContract; 
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const network = await provider.getNetwork(); 
    const signer = await provider.getSigner(); 

    if (needSigner) {
      farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, signer); 
      marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceAbi, signer); 
    } else {
        farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, provider); 
        marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceAbi, provider); 
    }

    return { farmDaoContract, marketplaceContract }
  } catch (error) {
    console.error(error)
  }
}

export default getProviderOrSigner; 
