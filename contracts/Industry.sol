// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IndustryContract {
    
    // Declare the state variables
    address public farmerAddress;
    uint public totalGoodsProduced;
    uint public totalGoodsSold;
    uint public pricePerUnit;
    
    // Constructor to initialize the contract
    constructor(uint _pricePerUnit, address _farmerAddress) {
        pricePerUnit = _pricePerUnit;
        farmerAddress = _farmerAddress;
    }
    
    // Function to produce goods
    function produceGoods(uint _quantity) public {
        require(msg.sender == farmerAddress, "Only farmer can produce goods");
        totalGoodsProduced += _quantity;
    }
    
    // Function to sell goods
    function sellGoods(uint _quantity) public {
        require(msg.sender == farmerAddress, "Only farmer can sell goods");
        require(_quantity <= totalGoodsProduced, "Not enough goods to sell");
        totalGoodsSold += _quantity;
    }
    
    // Function to calculate the revenue earned by the investor
    function calculateRevenue() public view returns (uint) {
        uint revenue = totalGoodsSold * pricePerUnit;
        return revenue;
    }
}
