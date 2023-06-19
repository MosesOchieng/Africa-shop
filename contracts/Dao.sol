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
    address[] private verifiedAddresses;

    // DAO struct
    struct Dao {
        address address1;
        address address2;
        string description;
        string farmReports;
        string financialReports;
        string name;
        uint id;
        uint amountInvested;
        address[] investors;
        bool verified;
    }

    // Events
    event InvestmentAdded(address investor, uint amount);
    event DaoCreated(address daoAddress);
    event DaoVerified(uint daoId);

    // Dao farmers
    mapping(address => address[]) public daoFarmers;
    mapping(uint => Dao) public daos;

    // Constructor
    constructor(string memory _title) {
        title = _title;

        verifiedAddresses.push(address(0x13Ef924EB7408e90278B86b659960AFb00DDae61));
        verifiedAddresses.push(address(0x23792579e2979a98D12a33A85e35914079304a56));
        verifiedAddresses.push(address(0xdc4f6EA5856eDa459286e8D0eF42e389D07137Ff));
    }

    // Functions
    function addInvestment(uint daoId) public payable {
        Dao storage dao = daos[daoId];
        require(msg.sender != dao.address1 && msg.sender != dao.address2, "Only addresses that haven't joined the DAO can invest.");
        dao.amountInvested += msg.value;
        dao.investors.push(msg.sender);

        investments[msg.sender] = msg.value;
        totalInvestment += msg.value;

        emit InvestmentAdded(msg.sender, msg.value);
    }

    function createDao(address _farmer1, address _farmer2, string memory _description, string memory _name, string memory _farmReports, string memory _financialReports) public {
        daoID++;
        uint _amountInvested = 0;
        uint currentId = daoID;

        Dao memory newDao = Dao({
            address1: _farmer1,
            address2: _farmer2,
            description: _description,
            farmReports: _farmReports,
            financialReports: _financialReports,
            name: _name,
            id: currentId,
            amountInvested: _amountInvested,
            investors: new address[](0),
            verified: false
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
    function withDrawDFunds(uint daoId) public {
        Dao storage dao = daos[daoId];
        require(msg.sender == dao.address1 || msg.sender == dao.address2, "Only farmers can withdraw funds!");

        uint amountToWithdraw = dao.amountInvested;
        require(amountToWithdraw > 0, "No funds to withdraw!");
        dao.amountInvested = 0;

        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        require(success, "Failed to transfer funds!");
    }

    function getVerifiedAddresses() external view returns (address[] memory) {
        return verifiedAddresses;
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

    function verifyDao(uint daoId) public {
        require(isAddressVerified(msg.sender), "Unauthorized access");
        require(daoId > 0 && daoId <= daoID, "Invalid DAO ID");

        Dao storage dao = daos[daoId];
        dao.verified = true;

        emit DaoVerified(daoId);
    }

    function isAddressVerified(address _address) public view returns (bool) {
        for (uint i = 0; i < verifiedAddresses.length; i++) {
            if (verifiedAddresses[i] == _address) {
                return true;
            }
        }
        return false;
    }
}
