// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract FarmDAO {

    // Variables
    address public farmer1;
    address public farmer2;
    address public owner;
    uint public totalInvestment;
    uint public minimumInvestment;
    mapping(address => uint) public investments;
    bool public daoCreated;

    // Events
    event InvestmentAdded(address investor, uint amount);
    event DaoCreated(address daoAddress);

    // Constructor
    constructor(address _farmer1, address _farmer2, uint _minimumInvestment) {
        farmer1 = _farmer1;
        farmer2 = _farmer2;
        minimumInvestment = _minimumInvestment;
        owner = msg.sender;
    }

    // Functions
    function addInvestment() public payable {
        require(msg.value >= minimumInvestment, "Investment amount is below the minimum required.");
        require(investments[msg.sender] == 0, "Investor has already contributed to the fund.");
        require(msg.sender != farmer1 && msg.sender != farmer2, "Farmers cannot invest in the fund.");

        investments[msg.sender] = msg.value;
        totalInvestment += msg.value;

        emit InvestmentAdded(msg.sender, msg.value);
    }

    function createDao() public {
        require(msg.sender == owner, "Only the owner can create the DAO.");
        require(investments[farmer1] > 0 && investments[farmer2] > 0, "Both farmers must invest in the fund to create the DAO.");

        // DAO creation code here

        daoCreated = true;
        emit DaoCreated(address(this));
    }
}
