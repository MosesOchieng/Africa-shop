// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract FarmDAO {

    // Variables
    string public title; 
    address public farmer1;
    address public farmer2;
    address public owner;
    uint public totalInvestment;
    uint public minimumInvestment;
    mapping(address => uint) public investments;
    bool public daoCreated;
    uint public daoID; 
    Dao[] public totalDAOs;
    
    // DAO struct
    struct Dao {
        address address1;
        address address2;
        string description;
        string name; 
        uint id; 
        uint amountInvested; 
    }

    // Events
    event InvestmentAdded(address investor, uint amount);
    event DaoCreated(address daoAddress);

    // Dao farmers 
    mapping(address => address[]) public daoFarmers;
    mapping(uint => Dao) public daos;

    // Constructor
    constructor(string memory _title) {
        title = _title; 
    }

    // Functions
    function addInvestment(uint daoId) public payable {
        require(msg.value >= minimumInvestment, "Investment amount is below the minimum required.");
        require(msg.sender != farmer1 && msg.sender != farmer2, "Farmers cannot invest in the fund.");
        
        Dao storage dao = daos[daoId];
        dao.amountInvested += msg.value;

        investments[msg.sender] = msg.value;
        totalInvestment += msg.value;

        emit InvestmentAdded(msg.sender, msg.value);
    }

    function createDao(address _farmer1, address _farmer2, string memory _description, string memory _name) public {
        daoID++; 
        uint _amountInvested = 0; 
        uint currentId = daoID; 

        Dao memory newDao = Dao({
            address1: _farmer1,
            address2: _farmer2,
            description: _description, 
            name: _name, 
            id: currentId, 
            amountInvested: _amountInvested
        });

        daos[currentId] = newDao;
        totalDAOs.push(newDao);

        //Adding farmers to DAO
        daoFarmers[address(this)].push(_farmer1);
        daoFarmers[address(this)].push(_farmer2);

        daoCreated = true;
        emit DaoCreated(address(this));
    }

    function getAllDaos() public view returns (Dao[] memory) {
        Dao[] memory allDaos = new Dao[](daoID);
        for (uint i = 1; i <= daoID; i++) {
            allDaos[i - 1] = daos[i];
        }
        return allDaos;
    }

    function getTotalInvestment(uint daoId) public view returns (uint) {
        return daos[daoId].amountInvested;
    }
    
}
