// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "forge-std/Test.sol";

import "../../src/Ringle.sol";
import "../../src/Pair.sol";
import "./Mocks/MockERC721.sol";
import "./Mocks/MockERC20.sol";
import "../../script/CreatePair.s.sol";

contract Fixture is Test {
    MockERC721 public bayc;
    MockERC20 public usd;

    Ringle public ringle;
    Pair public pair;
    LpToken public lpToken;
    Pair public ethPair;
    LpToken public ethPairLpToken;

    CreatePairScript public createPairScript;

    address public hacker = address(0x123);

    constructor() {
        createPairScript = new CreatePairScript();

        ringle = new Ringle();

        bayc = new MockERC721("Bored Ape", "BAYC");
        usd = new MockERC20("Us Dollar", "USD");

        pair =  ringle.create(address(bayc), address(usd), bytes32(0));
        lpToken = LpToken(pair.lpToken());

        ethPair = ringle.create(address(bayc), address(0), bytes32(0));
        ethPairLpToken = LpToken(ethPair.lpToken());

        vm.label(hacker, "hacker");
        vm.label(address(ringle), "ringle");
        vm.label(address(bayc), "bayc");
        vm.label(address(usd), "usd");
        vm.label(address(pair), "pair");
        vm.label(address(lpToken), "LP-token");
        vm.label(address(ethPair), "ethPair");
        vm.label(address(ethPairLpToken), "ethPair-LP-token");
    }

    receive() external payable {}
}
