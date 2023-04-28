pragma solidity ^0.8.0;

import "./Token.sol";

contract DAO {
    address public owner;
    mapping(address => bool) public members;
    uint public totalMembers;

    constructor() {
        owner = msg.sender;
        members[owner] = true;
        totalMembers = 1;
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

    function transferOwnership(address _newOwner) public {
        require(msg.sender == owner, "Only owner can transfer ownership");
        owner = _newOwner;
    }
}
