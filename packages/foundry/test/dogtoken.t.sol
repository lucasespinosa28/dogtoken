// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Dogtoken} from "../contracts/dogtoken.sol";
import {Swap} from "../contracts/swap.sol";
import "forge-std/console.sol";

contract dogtokenTest is Test {
    Dogtoken public token;
    Swap public swap;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address jane = makeAddr("jane");

    function setUp() public {
        swap = new Swap(alice);
        token = new Dogtoken(
            "dog token nft/token",
            "DT",
            18,
            10000,
            address(swap)
        );
        vm.prank(alice);
        swap.setErc404(address(token));
    }

    function mint(address user, uint256 amount) public {
        vm.deal(user, amount);
        vm.prank(user);
        swap.FilToDt{value: amount}();
    }

    function test_url() public view {
        string memory url = token.tokenURI(1);
        assertEq(url, "ipfs://empty.png");
    }

    function test_balanceToken() public view {
        uint256 balance = token.erc20BalanceOf(address(swap));
        assertEq(balance, 10000 ether);
    }

    function test_erc721TotalSupply() public view {
        uint256 supply = token.erc721TotalSupply();
        assertEq(supply, 0);
    }

    function test_erc721Mint() public {
        mint(bob, 1 ether);
        uint256 balance = token.erc721BalanceOf(bob);
        assertEq(balance, 1);
        uint256 id = token.ID_ENCODING_PREFIX() + 1;
        console.log(id);
        assertEq(token.ownerOf(id), bob);
    }

    function test_update_url() public {
        mint(bob, 1 ether);
        uint256 id = token.ID_ENCODING_PREFIX() + 1;

        vm.prank(bob);
        bool success = token.updatedtokenURI(id, "test.png");
        string memory url = token.tokenURI(id);
        console.log("url:", url);
        assertTrue(success);
        assertEq(url, "ipfs://test.png");
    }

    function test_multi_nft() public {
        mint(bob, 1 ether);
        mint(jane, 1 ether);

        uint256 balance = token.erc721BalanceOf(bob);
        assertEq(balance, 1);
        uint256 id = token.ID_ENCODING_PREFIX() + 1;
        assertEq(token.ownerOf(id), bob);

        balance = token.erc721BalanceOf(jane);
        assertEq(balance, 1);
        id = token.ID_ENCODING_PREFIX() + 2;
        assertEq(token.ownerOf(id), jane);
    }

    function test_nft_transfer() public {
        mint(bob, 1 ether);
        uint256 balance = token.erc721BalanceOf(bob);
        assertEq(balance, 1);
        uint256 id = token.ID_ENCODING_PREFIX() + 1;
        assertEq(token.ownerOf(id), bob);

        vm.startPrank(bob);
        token.transfer(jane, 1 ether);
        vm.stopPrank();

        balance = token.erc721BalanceOf(bob);
        assertEq(balance, 0);
        id = token.ID_ENCODING_PREFIX() + 1;
        assertEq(token.ownerOf(id), jane);
    }

    function test_mult_transfer() public {
        mint(bob, 0.5 ether);

        uint256 balance = token.erc721BalanceOf(bob);
        assertEq(balance, 0);

        mint(bob, 0.5 ether);

        balance = token.erc721BalanceOf(bob);
        assertEq(balance, 1);
    }

    function test_transfer_lost_nft() public {
        mint(bob, 1.9 ether);
        uint256 balance = token.erc721BalanceOf(bob);
        assertEq(balance, 1);

        vm.startPrank(bob);
        token.transfer(jane, 1.1 ether);
        vm.stopPrank();

        balance = token.erc721BalanceOf(bob);
        assertEq(balance, 0);
    }

    function test_mult_transfer_nft() public {
        mint(bob, 3 ether);
        uint256 balance = token.erc721BalanceOf(bob);
        assertEq(balance, 3);

        uint256 id = token.ID_ENCODING_PREFIX() + 2;
        vm.startPrank(bob);
        token.erc721TransferFrom(bob, jane, id);
        vm.stopPrank();
        balance = token.erc721BalanceOf(bob);
        assertEq(balance, 2);

        assertEq(token.ownerOf(id), jane);
        assertEq(token.erc20BalanceOf(jane), 1 ether);
        // vm.startPrank(alice);
        // token.transfer(bob, 0.5 ether);
        // vm.stopPrank();

        // balance = token.erc721BalanceOf(bob);
        // assertEq(balance, 1);
    }

    function testTotalSupply() public view {
        (uint256 fil, uint256 dog) = swap.totalSupply();
        assertEq(dog, 10000 ether);
        assertEq(fil, 0);
    }

    function testDepositSwap() public {
        vm.deal(bob, 1 ether);
        vm.prank(bob);
        bool sucess = swap.FilToDt{value: 1 ether}();
        assertTrue(sucess);
        assertEq(swap.balanceOf(bob), 1 ether);
        assertEq(token.erc20BalanceOf(bob), 1 ether);

        uint256 balance = token.erc721BalanceOf(bob);
        assertEq(balance, 1);
    }

    function testwithdrawSwap() public {
        assertEq(token.balanceOf(bob), 0 ether);
        vm.deal(bob, 1 ether);
        vm.prank(bob);
        bool sucess = swap.FilToDt{value: 1 ether}();
        assertTrue(sucess);
        assertEq(bob.balance, 0 ether);
        assertEq(swap.balanceOf(bob), 1 ether);
        assertEq(token.balanceOf(bob), 1 ether);
        assertEq(token.erc721BalanceOf(bob), 1);

        vm.prank(bob);
        token.approve(address(swap), 1 ether);
        vm.prank(bob);
        sucess = swap.DtToFil(1 ether);
        assertTrue(sucess);
        assertEq(bob.balance, 1 ether);
        assertEq(swap.balanceOf(bob), 0 ether);
        assertEq(token.balanceOf(bob), 0 ether);
        assertEq(token.erc721BalanceOf(bob), 0);
    }
}
