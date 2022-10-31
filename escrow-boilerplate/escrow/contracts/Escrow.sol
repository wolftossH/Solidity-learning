// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DeEscrow {
    address public seller;
    address public product_price;
    address[] public buyers;

    constructor() public {
        seller = msg.sender;
    }

    function enter() public payable {
        /*
        Let user enter amount of money
        */
        require(msg.value > 0.01 ether);

        buyers.push(msg.sender);
    }

    function random() private view returns (uint) {
        /*
        Create a pseudo random generator
        */
        return  uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, buyers)));

    }

    function collectMoney() public restricted {
        /*
        Send money back to Seller after confirming the transaction
        */
        uint index = 0;
        payable(buyers[index]).transfer(address(this).balance);
        buyers = new address[](0);
    }

    modifier restricted() {
        /*
        Function that makes the sender of the product is only accessible to the seller
        */
        require(msg.sender == seller);
        _;
    }
    
    function getBuyers() public view returns (address[] memory) {
        /*
        Show a list of users that want to buy the product
        */
        return buyers;
    }
}