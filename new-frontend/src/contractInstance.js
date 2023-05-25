import { Provider } from "@ethersproject/providers";
import { marketplaceAbi, farmDaoAbi, farmdaoContractAddress, marketplaceContractAddress, aggregatorAbi, aggregatorV3InterfaceAddress } from "./constants";
import { ethers } from "ethers";

const getProviderOrSigner = async (needSigner = false) => {
  try {

    let farmDaoContract; 
    let marketplaceContract; 
    let priceFeed; 
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const aggregatorProvider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia")

    // const network = await provider.getNetwork(); 
    const signer = await provider.getSigner(); 

    // Testing whether the aggregator code matches the latest version
    // const test = await aggregatorProvider.getCode(aggregatorV3InterfaceAddress); 

    if (needSigner) {
      farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, signer); 
      marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceAbi, signer); 
      priceFeed = new ethers.Contract(aggregatorV3InterfaceAddress, aggregatorAbi, aggregatorProvider); 
    } else {
      farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, provider); 
      marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceAbi, provider);
      priceFeed = new ethers.Contract(aggregatorV3InterfaceAddress, aggregatorAbi, aggregatorProvider); 
    }

    return { farmDaoContract, marketplaceContract, priceFeed }
  } catch (error) {
    console.error(error)
  }
}

export default getProviderOrSigner; 
