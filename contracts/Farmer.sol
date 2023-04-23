pragma solidity ^0.8.0;

contract Farmer {
    address public owner;
    uint public totalInputCost;
    uint public totalOutputValue;

    struct Farm {
        uint landSize;
        string cropType;
        uint inputCost;
        uint outputValue;
    }

    Farm[] public farms;

    constructor() {
        owner = msg.sender;
        totalInputCost = 0;
        totalOutputValue = 0;
    }

    function addFarm(uint landSize, string memory cropType, uint inputCost, uint outputValue) public {
        require(msg.sender == owner, "Only owner can add farms");
        Farm memory newFarm = Farm(landSize, cropType, inputCost, outputValue);
        farms.push(newFarm);
        totalInputCost += inputCost;
        totalOutputValue += outputValue;
    }

    function getFarms() public view returns (Farm[] memory) {
        return farms;
    }
}
