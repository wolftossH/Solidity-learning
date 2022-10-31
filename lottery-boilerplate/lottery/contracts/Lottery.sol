// pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    // new function does not have constructor function 
    // function Lottery() public {
    //     manager = msg.sender;
    // }
    
    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return  uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, players)));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        // players[index].transfer(address(this).balance);
        payable(players[index]).transfer(address(this).balance);

        players = new address[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}   