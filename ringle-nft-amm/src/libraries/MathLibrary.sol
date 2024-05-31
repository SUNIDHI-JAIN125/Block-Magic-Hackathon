// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Math} from "openzeppelin/utils/math/Math.sol";

library MathLibrary {
    function addQuote(
        uint256 baseTokenAmount,
        uint256 fractionalTokenAmount,
        uint256 baseTokenReserves,
        uint256 fractionalTokenReserves,
        uint256 lpTokenSupply
    ) public pure returns (uint256) {
        if (lpTokenSupply > 0) {
            uint256 baseTokenShare = (baseTokenAmount * lpTokenSupply) / baseTokenReserves;
            uint256 fractionalTokenShare = (fractionalTokenAmount * lpTokenSupply) / fractionalTokenReserves;
            return Math.min(baseTokenShare, fractionalTokenShare);
        } else {
            return Math.sqrt(baseTokenAmount * fractionalTokenAmount);
        }
    }

    function removeQuote(
        uint256 lpTokenAmount,
        uint256 baseTokenReserves,
        uint256 fractionalTokenReserves,
        uint256 lpTokenSupply
    ) public pure returns (uint256, uint256) {
        uint256 baseTokenOutputAmount = (baseTokenReserves * lpTokenAmount) / lpTokenSupply;
        uint256 fractionalTokenOutputAmount = (fractionalTokenReserves * lpTokenAmount) / lpTokenSupply;
        return (baseTokenOutputAmount, fractionalTokenOutputAmount);
    }

    function buyQuote(
        uint256 outputAmount,
        uint256 baseTokenReserves,
        uint256 fractionalTokenReserves
    ) public pure returns (uint256) {
        return (outputAmount * 1000 * baseTokenReserves) / ((fractionalTokenReserves - outputAmount) * 997);
    }

    function sellQuote(
        uint256 inputAmount,
        uint256 baseTokenReserves,
        uint256 fractionalTokenReserves
    ) public pure returns (uint256) {
        uint256 inputAmountWithFee = inputAmount * 997;
        return (inputAmountWithFee * baseTokenReserves) / ((fractionalTokenReserves * 1000) + inputAmountWithFee);
    }
}
