// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IPenguin {
    function owner() external view returns (address);
    function destroy(address, address, bytes32) external;
}
