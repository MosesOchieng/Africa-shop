// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import "@aave/protocol-v2/contracts/libraries/DataTypes.sol";

contract FarmerDAO is Ownable {
    // Struct to hold farmer details
    struct Farmer {
        bool isRegistered;
        address walletAddress;
        address daoAddress;
        address partnerAddress;
    }

    // Event to be emitted when a new DAO is created
    event DaoCreated(address daoAddress, address owner);

    // Event to be emitted when a new farmer is registered
    event FarmerRegistered(address walletAddress, address daoAddress, address partnerAddress);

    // Aave Lending Pool
    ILendingPool private lendingPool;

    // Aave Lending Pool Addresses Provider
    ILendingPoolAddressesProvider private provider;

    // Limit Order Protocol
    ILimitOrderProtocol private limitOrderProtocol;

    // Limit Order Registry
    ILimitOrderRegistry private limitOrderRegistry;

    // Mapping of DAO addresses to DAO owners
    mapping(address => address) private daoOwners;

    // Mapping of farmer addresses to Farmer struct
    mapping(address => Farmer) private farmers;

    // Constructor to initialize Aave and 1Inch protocols
    constructor(address _lendingPoolAddress, address _addressesProvider, address _limitOrderProtocol, address _limitOrderRegistry) {
        lendingPool = ILendingPool(_lendingPoolAddress);
        provider = ILendingPoolAddressesProvider(_addressesProvider);
        limitOrderProtocol = ILimitOrderProtocol(_limitOrderProtocol);
        limitOrderRegistry = ILimitOrderRegistry(_limitOrderRegistry);
    }

    // Function to create a new DAO
    function createDAO() external {
        // Ensure only non-registered farmers can create a DAO
        require(!farmers[msg.sender].isRegistered, "Farmer is already registered.");

        // Create new DAO and assign ownership to msg.sender
        address daoAddress = address(new DAO(msg.sender));
        daoOwners[daoAddress] = msg.sender;

        // Emit event
        emit DaoCreated(daoAddress, msg.sender);
    }

    // Function to register a new farmer
    function registerFarmer(address _walletAddress, address _partnerAddress) external {
        // Ensure only registered DAO owners can register farmers
        require(daoOwners[msg.sender] != address(0), "Only DAO owners can register farmers.");

        // Ensure farmer is not already registered
        require(!farmers[_walletAddress].isRegistered, "Farmer is already registered.");

        // Ensure farmer has an Aave wallet address on Polygon
        require(lendingPool.getReserveData(DataTypes.ReserveConfigurationMap(address(_walletAddress))) != 0, "Farmer must have an Aave wallet address on Polygon.");

        // Assign DAO and partner to Farmer struct
        farmers[_walletAddress].isRegistered = true;
        farmers[_walletAddress].walletAddress = _walletAddress;
        farmers[_walletAddress].daoAddress = msg.sender;
        farmers[_walletAddress].partnerAddress = _partnerAddress;

        // Emit event
        emit FarmerRegistered(_walletAddress, msg.sender, _partnerAddress);
    }

        // Function to get details of a registered farmer
function getFarmerDetails(address _walletAddress) external view returns (address, address, address) {
// Ensure farmer is registered
require(farmers[_walletAddress].isRegistered, "Farmer is not registered.");



    // Return farmer details
    return (farmers[_walletAddress].walletAddress, farmers[_walletAddress].daoAddress, farmers[_walletAddress].partnerAddress);
}

// Function to get list of all registered farmers in a DAO
function getDAOFarmers() external view returns (address[] memory) {
    // Get DAO owner
    address daoOwner = daoOwners[msg.sender];

    // Ensure caller is a DAO owner
    require(daoOwner != address(0), "Only DAO owners can view list of farmers.");

    // Initialize an empty array to hold farmer addresses
    address[] memory farmerList = new address[](0);

    // Loop through all registered farmers and add their addresses to the array if they belong to the DAO
    for (uint256 i = 0; i < farmerAddresses.length; i++) {
        if (farmers[farmerAddresses[i]].daoAddress == daoOwner) {
            farmerList.push(farmerAddresses[i]);
        }
    }

    // Return the list of farmer addresses
    return farmerList;
}

}

// DAO smart contract
contract DAO is Ownable {
// DAO owner
address private owner;



// Event to be emitted when a new partner is added
event PartnerAdded(address partnerAddress);

// Array to hold partner addresses
address[] private partners;

// Constructor to set DAO owner
constructor(address _owner) {
    owner = _owner;
}

// Function to add a new partner
function addPartner(address _partnerAddress) external onlyOwner {
    // Ensure partner is not already added
    require(!isPartner(_partnerAddress), "Partner is already added.");

    // Add new partner to array
    partners.push(_partnerAddress);

    // Emit event
    emit PartnerAdded(_partnerAddress);
}

// Function to check if an address is a partner
function isPartner(address _address) public view returns (bool) {
    for (uint256 i = 0; i < partners.length; i++) {
        if (partners[i] == _address) {
            return true;
        }
    }
    return false;
}

}
