//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC404} from "erc404/ERC404.sol";


contract Swap is Ownable {
    ERC404 erc404;
    mapping(address => uint256) public balanceOf;

    constructor(address initialOwner_) Ownable(initialOwner_) {}

    function setErc404(address token) external onlyOwner {
        erc404 = ERC404(token);
    }

    function totalSupply() external view returns (uint256 fil, uint256 dog) {
        fil = address(this).balance;
        dog = erc404.erc20BalanceOf(address(this));
    }

    function FilToDt() external payable returns (bool sucess) {
        require(
            erc404.erc20BalanceOf(address(this)) > msg.value,
            "Contract have not sufifient amount of dogtoken"
        );
        balanceOf[msg.sender] += msg.value;
        sucess = erc404.transfer(msg.sender, msg.value);
    }

    function DtToFil(uint256 value) external returns (bool success) {
        uint256 balance = balanceOf[msg.sender];
        require(balance >= value, "Fil amount exceeds balance");
        bool token = erc404.transferFrom(msg.sender, address(this), value);
        require(token, "fil token no possible to transfer");
        balanceOf[msg.sender] = balance - value;
        (success, ) = msg.sender.call{value: value}("");
    }
}
