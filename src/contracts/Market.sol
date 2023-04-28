// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import "@aave/protocol-v2/contracts/libraries/DataTypes.sol";
import "@1inch/limit-order-protocol/contracts/interfaces/ILimitOrderProtocol.sol";
import "@1inch/limit-order-protocol/contracts/interfaces/ILimitOrderRegistry.sol";

contract DAO is Ownable {
struct DAOInfo {
string name;
uint256 investedAmount;
uint256 lendingAmount;
address[] investors;
address[] lenders;
}
address public owner;
mapping(address => bool) public members;
mapping(address => DAOInfo) public daos;
uint public totalMembers;
address public lendingPoolAddress;
address public limitOrderProtocolAddress;
address public limitOrderRegistryAddress;
uint public minInvestmentAmount = 1 ether;
uint public maxInvestmentAmount = 10 ether;

constructor(address _lendingPoolAddress, address _limitOrderProtocolAddress, address _limitOrderRegistryAddress) {
    owner = msg.sender;
    members[owner] = true;
    totalMembers = 1;
    lendingPoolAddress = _lendingPoolAddress;
    limitOrderProtocolAddress = _limitOrderProtocolAddress;
    limitOrderRegistryAddress = _limitOrderRegistryAddress;
}

function addMember(address _newMember) public {
    require(msg.sender == owner || members[msg.sender], "Not authorized to add members");
    members[_newMember] = true;
    totalMembers++;
}

function removeMember(address _member) public {
    require(msg.sender == owner || members[msg.sender], "Not authorized to remove members");
    require(_member != owner, "Cannot remove owner");
    members[_member] = false;
    totalMembers--;
}

function transferOwnership(address _newOwner) public onlyOwner {
    owner = _newOwner;
}

function createDAO(string memory _name) public {
    require(bytes(_name).length > 0, "DAO name should not be empty");
    require(daos[msg.sender].investedAmount == 0, "DAO already exists for this address");

    DAOInfo memory dao = DAOInfo(_name, 0, 0, new address[](0), new address[](0));
    daos[msg.sender] = dao;
}

function invest(address _daoAddress) public payable {
    require(members[msg.sender], "Not authorized to invest");
    require(daos[_daoAddress].investedAmount + msg.value <= maxInvestmentAmount, "Maximum investment amount exceeded");
    require(msg.value >= minInvestmentAmount, "Minimum investment amount not met");

    // Transfer funds to DAO
    payable(_daoAddress).transfer(msg.value);

    // Update DAO info
    DAOInfo storage dao = daos[_daoAddress];
    dao.investedAmount += msg.value;
    dao.investors.push(msg.sender);
}

function lend(address _daoAddress, uint256 _amount) public {
    require(members[msg.sender], "Not authorized to lend");
    require(_amount > 0, "Lending amount should be greater than 0");

    // Approve AAVE for lending pool
    ILendingPool lendingPool = ILendingPool(lendingPoolAddress);
    address asset = lendingPool.getAssetByAddress(_daoAddress);
    require(asset != address(0), "Invalid DAO address");



// Transfer asset to lending pool
DataTypes.ReserveData memory reserveData = lendingPool.getReserveData(asset);
require(reserveData.configuration.dataProvider != address(0), "Invalid asset");
require(reserveData.configuration.getActive() == true, "Asset not active");

IERC20(asset).approve(lendingPoolAddress, _amount);
lendingPool.deposit(asset, _amount, address(this), 0);

// Update DAO info
DAOInfo storage dao = daos[_daoAddress];
dao.lendingAmount += _amount;
dao.lenders.push(msg.sender);

}

function createLimitOrder(
address _daoAddress,
address _fromToken,
address _toToken,
uint256 _amount,
uint256 _limitPrice,
uint256 _expiryTime
) public {
require(members[msg.sender], "Not authorized to create limit orders");


ILimitOrderProtocol limitOrderProtocol = ILimitOrderProtocol(limitOrderProtocolAddress);
ILimitOrderRegistry limitOrderRegistry = ILimitOrderRegistry(limitOrderRegistryAddress);

IERC20(_fromToken).approve(address(limitOrderProtocol), _amount);

limitOrderProtocol.create(
    _fromToken,
    _toToken,
    _amount,
    _limitPrice,
    _expiryTime,
    false // fillOrKill
);

// Register the limit order with the DAO
limitOrderRegistry.register(_daoAddress, msg.sender, _fromToken, _toToken, _amount, _limitPrice, _expiryTime);

}

function cancelLimitOrder(
address _daoAddress,
address _fromToken,
address _toToken,
uint256 _amount,
uint256 _limitPrice,
uint256 _expiryTime
) public {
require(members[msg.sender], "Not authorized to cancel limit orders");



ILimitOrderRegistry limitOrderRegistry = ILimitOrderRegistry(limitOrderRegistryAddress);

// Unregister the limit order with the DAO
limitOrderRegistry.unregister(_daoAddress, msg.sender, _fromToken, _toToken, _amount, _limitPrice, _expiryTime);

}

function setInvestmentLimits(uint _minInvestmentAmount, uint _maxInvestmentAmount) public onlyOwner {
require(_minInvestmentAmount <= _maxInvestmentAmount, "Invalid investment limits");
minInvestmentAmount = _minInvestmentAmount;
maxInvestmentAmount = _maxInvestmentAmount;
}
}
