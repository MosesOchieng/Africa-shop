// Load web3 library
const Web3 = require('web3');

// Load contract ABI
const contractABI = require('./contract_abi');

// Create web3 instance
const web3 = new Web3('http://localhost:8545'); // Replace with your node URL

// Set contract address and create contract instance
const contractAddress = '0x123...'; // Replace with your contract address
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Define functions to interact with the contract
async function getFarmersCount() {
  const farmersCount = await contractInstance.methods.farmersCount().call();
  return farmersCount;
}

async function addFarmer(name, location) {
  const accounts = await web3.eth.getAccounts();
  const result = await contractInstance.methods.addFarmer(name, location).send({ from: accounts[0] });
  return result;
}

async function getFarmer(id) {
  const farmer = await contractInstance.methods.farmers(id).call();
  return farmer;
}

async function getIndustriesCount() {
  const industriesCount = await contractInstance.methods.industriesCount().call();
  return industriesCount;
}

async function addIndustry(name, location) {
  const accounts = await web3.eth.getAccounts();
  const result = await contractInstance.methods.addIndustry(name, location).send({ from: accounts[0] });
  return result;
}

async function getIndustry(id) {
  const industry = await contractInstance.methods.industries(id).call();
  return industry;
}

async function getProductsCount() {
  const productsCount = await contractInstance.methods.productsCount().call();
  return productsCount;
}

async function addProduct(name, industryId) {
  const accounts = await web3.eth.getAccounts();
  const result = await contractInstance.methods.addProduct(name, industryId).send({ from: accounts[0] });
  return result;
}

async function getProduct(id) {
  const product = await contractInstance.methods.products(id).call();
  return product;
}

// Export functions
module.exports = {
  getFarmersCount,
  addFarmer,
  getFarmer,
  getIndustriesCount,
  addIndustry,
  getIndustry,
  getProductsCount,
  addProduct,
  getProduct
};
