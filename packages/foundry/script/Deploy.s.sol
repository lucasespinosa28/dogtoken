//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import "./DeployHelpers.s.sol";
import {Dogtoken} from "../contracts/dogtoken.sol";
import {Swap} from "../contracts/swap.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        Swap swap = new Swap(vm.addr(deployerPrivateKey));
        console.logString(
            string.concat("Swap deployed at: ", vm.toString(address(swap)))
        );

        Dogtoken token = new Dogtoken("token", "tk", 18, 10000, address(swap));
        swap.setErc404(address(token));

        console.logString(
            string.concat("Dogtoken deployed at: ", vm.toString(address(token)))
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
