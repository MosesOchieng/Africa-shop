pragma solidity ^0.8.0;

import "./Token.sol";

contract Marketplace {
    address public owner;
    Token public token;
    uint public price;

    constructor(Token _token, uint _price) {
        owner = msg.sender;
        token = _token;
        price = _price;
    }

    function purchase() public payable {
        require(msg.value == price, "Incorrect payment amount");
        uint tokensToTransfer = price / token.price();
        require(token.balanceOf(owner) >= tokensToTransfer, "Not enough tokens to complete transaction");

        token.transferFrom(owner, msg.sender, tokensToTransfer);
        owner.transfer(price);
    }
}
