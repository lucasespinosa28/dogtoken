//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC404} from "erc404/ERC404.sol";

contract Dogtoken is Ownable, ERC404 {
    mapping(uint256 => string) internal uri;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 maxTotalSupplyERC721_,
        address initialOwner_
    ) ERC404(name_, symbol_, decimals_) Ownable(initialOwner_) {
        _setERC721TransferExempt(initialOwner_, true);
        _mintERC20(initialOwner_, maxTotalSupplyERC721_ * units);
    }

    function tokenURI(
        uint256 id_
    ) public view override returns (string memory) {
        bytes memory url = bytes(uri[id_]);
        if (url.length == 0) {
            return "ipfs://empty.png";
        }
        return string.concat("ipfs://", uri[id_]);
    }

    function updatedtokenURI(
        uint256 id_,
        string memory path
    ) external returns (bool success) {
        require(ownerOf(id_) == msg.sender, "You are not the owner");
        uri[id_] = path;
        bytes memory url = bytes(uri[id_]);
        if (url.length == 0) {
            return false;
        }
        return true;
    }

    function setERC721TransferExempt(
        address account_,
        bool value_
    ) external onlyOwner {
        _setERC721TransferExempt(account_, value_);
    }
}
