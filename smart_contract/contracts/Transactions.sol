// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// this contract is serving as a class
contract Transactions {
    uint256 transactionCount;
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
    // store all transactions that go through
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
    // transfer the amount
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

} 