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
        address[] investors; 
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
        // require(msg.value >= minimumInvestment, "Investment amount is below the minimum required.");
        Dao storage dao = daos[daoId];
        require(msg.sender != dao.address1 && msg.sender != dao.address2, "Only addresses that haven't joined the DAO can invest.");
        dao.amountInvested += msg.value;
        dao.investors.push(msg.sender); 

        investments[msg.sender] = msg.value;
        totalInvestment += msg.value;

        emit InvestmentAdded(msg.sender, msg.value);
    }

    function createDao(address _farmer1, address _farmer2, string memory _description, string memory _name) public {
        // require(); 
        daoID++; 
        uint _amountInvested = 0; 
        uint currentId = daoID; 

        Dao memory newDao = Dao({
            address1: _farmer1,
            address2: _farmer2,
            description: _description, 
            name: _name, 
            id: currentId, 
            amountInvested: _amountInvested, 
            investors: new address[](0)
        });

        daos[currentId] = newDao;
        totalDAOs.push(newDao);

        //Adding farmers to DAO
        daoFarmers[address(this)].push(_farmer1);
        daoFarmers[address(this)].push(_farmer2);

        daoCreated = true;
        emit DaoCreated(address(this));
    }

    // Function for withdrawing the funds 
    function withDrawDFunds(uint daoId) public{
        Dao storage dao = daos[daoId];
        require(msg.sender == dao.address1 || msg.sender == dao.address2, "Only farmers can withdraw funds!"); 

        uint amountToWithdraw = dao.amountInvested; 
        require(amountToWithdraw > 0, "No funds to withdraw!"); 
        dao.amountInvested = 0; 

        (bool success, ) = msg.sender.call{value: amountToWithdraw}(""); 
        require(success, "Failed to transfer funds!"); 
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
