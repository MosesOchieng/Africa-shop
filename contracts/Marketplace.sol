// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmDAO {

    address public farmer;
    uint256 public fundingGoal;
    uint256 public currentFunding;
    uint256 public numInvestors;
    mapping(address => uint256) public investments;

    constructor(address _farmer, uint256 _fundingGoal) {
        farmer = _farmer;
        fundingGoal = _fundingGoal;
    }

    function invest() public payable {
        require(msg.sender != farmer, "Farmer cannot invest in their own DAO");
        require(msg.value > 0, "Investment must be greater than 0");
        require(currentFunding + msg.value <= fundingGoal, "Investment exceeds funding goal");

        if (investments[msg.sender] == 0) {
            numInvestors++;
        }

        investments[msg.sender] += msg.value;
        currentFunding += msg.value;
    }

    function withdrawFunds() public {
        require(msg.sender == farmer, "Only the farmer can withdraw funds");
        require(currentFunding >= fundingGoal, "Funding goal has not been reached");

        payable(farmer).transfer(currentFunding);
        currentFunding = 0;
    }

    function getInvestmentAmount(address investor) public view returns (uint256) {
        return investments[investor];
    }

    function getInvestorCount() public view returns (uint256) {
        return numInvestors;
    }
}
