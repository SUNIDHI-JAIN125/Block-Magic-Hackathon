// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC20} from "solmate/tokens/ERC20.sol";
import {ERC721,ERC721TokenReceiver} from "solmate/tokens/ERC721.sol";
import "./libraries/MathLibrary.sol";
import {SafeTransferLib} from "solmate/utils/SafeTransferLib.sol";
import {MerkleProofLib} from "solmate/utils/MerkleProofLib.sol";
import "./LpToken.sol";
import {IPenguin} from "./interfaces/IPenguin.sol";

/// @title Pair
/// @author SUNIDHI-JAIN125
/// @notice A pair of an NFT and a base token that can be used to create and trade fractionalized NFTs.
contract Pair is
    ERC20,
    ERC721TokenReceiver
{
    using SafeTransferLib for address;
    using SafeTransferLib for ERC20;
    using MathLibrary for uint256;

    uint256 public constant CLOSE_GRACE_PERIOD = 7 days;

    address public immutable nft; // address of the NFT
    address public immutable baseToken; // address(0) for ETH
    bytes32 public immutable merkleRoot;

    LpToken public immutable lpToken;
    IPenguin public immutable ringle;

    uint256 public closeTimestamp;
    event Add(
        uint256 baseTokenAmount,
        uint256 fractionalTokenAmount,
        uint256 lpTokenAmount
    );
    event Remove(
        uint256 baseTokenAmount,
        uint256 fractionalTokenAmount,
        uint256 lpTokenAmount
    );
    event Buy(uint256 inputAmount, uint256 outputAmount);
    event Sell(uint256 inputAmount, uint256 outputAmount);
    event Wrap(uint256[] tokenIds);
    event Unwrap(uint256[] tokenIds);
    event Close(uint256 closeTimestamp);
    event Withdraw(uint256 tokenId);
   

    constructor(
        address _nft,
        address _baseToken,
        bytes32 _merkleRoot,
        string memory pairSymbol,
        string memory nftName,
        string memory nftSymbol
    )
        ERC20(
            string.concat(nftName, " fractional token"),
            string.concat("f", nftSymbol),
            18
        )
    {
        nft = _nft;
        baseToken = _baseToken; // use address(0) for native ETH
        merkleRoot = _merkleRoot;
        ringle = IPenguin(msg.sender);
        lpToken = new LpToken(pairSymbol);
    }
    //      AMM logic      //

    /// @notice Adds liquidity to the pair.
    /// @param baseTokenAmount The amount of base tokens to add.
    /// @param fractionalTokenAmount The amount of fractional tokens to add.
    /// @param minLpTokenAmount The minimum amount of LP tokens to mint.
    /// @return lpTokenAmount The amount of LP tokens minted.
    function add(
        uint256 baseTokenAmount,
        uint256 fractionalTokenAmount,
        uint256 minLpTokenAmount
    ) public payable returns (uint256 lpTokenAmount) {
        // *** Checks *** //
        require(
            baseTokenAmount > 0 && fractionalTokenAmount > 0,
            "Input token amount is zero"
        );
        lpTokenAmount = baseTokenAmount.addQuote(
            fractionalTokenAmount,
            baseTokenReserves(),
            fractionalTokenReserves(),
            lpToken.totalSupply()
        );
        // check that the amount of lp tokens outputted is greater than the min amount
        require(
            lpTokenAmount >= minLpTokenAmount,
            "Slippage: lp token amount out"
        );

        // check that correct eth input was sent; if the baseToken equals address(0) then native ETH is used
        require(
            baseToken == address(0)
                ? msg.value == baseTokenAmount
                : msg.value == 0,
            "Invalid ether input"
        );

        // transfer base tokens in if the base token is not ETH
        if (baseToken != address(0)) {
            // transfer base tokens in
            // transfer tokens in
            ERC20(baseToken).safeTransferFrom(
                msg.sender,
                address(this),
                baseTokenAmount
            );
        }
        _transferFrom(msg.sender, address(this), fractionalTokenAmount);

        // mint lp tokens to sender
        lpToken.mint(msg.sender, lpTokenAmount);

        emit Add(baseTokenAmount, fractionalTokenAmount, lpTokenAmount);
    }

    /**
     * @dev Buys fractional tokens with base tokens
     * @param outputAmount The amount of fractional tokens to buy
     * @param maxInputAmount The maximum amount of base tokens to spend
     * @return The amount of base tokens spent
     */
    function buy(
        uint256 outputAmount,
        uint256 maxInputAmount
    ) public payable returns (uint256) {
        // inputAmount = (baseTokenReserves*outputAmount) / (fractionalTokenReserves - outputAmount)
         uint256 inputAmount = outputAmount.buyQuote(
            baseTokenReserves(),
            fractionalTokenReserves()
        );
        // check that the required amount of base tokens is less than the max amount
        require(inputAmount <= maxInputAmount, "Slippage: amount in");
        // check that correct eth input was sent; if the baseToken equals address(0) then native ETH is used
        require(
            baseToken == address(0)
                ? msg.value == maxInputAmount
                : msg.value == 0,
            "Invalid ether input"
        );

        // transfer fractional tokens to sender
        _transferFrom(address(this), msg.sender, outputAmount);

        if (baseToken == address(0)) {
            // refund surplus eth
            uint256 refundAmount = maxInputAmount - inputAmount;
            if (refundAmount > 0) msg.sender.safeTransferETH(refundAmount);
        } else {
            // transfer base tokens in
            ERC20(baseToken).safeTransferFrom(
                msg.sender,
                address(this),
                inputAmount
            );
        }

        emit Buy(inputAmount, outputAmount);

        return inputAmount;
    }

    function sell(
        uint256 inputAmount, // fractionalTokenAmount
        uint256 minOutputAmount
    ) public returns (uint256) {
        uint256  outputAmount = inputAmount.sellQuote(
            baseTokenReserves(),
            fractionalTokenReserves()
        );

        // check that the outputted amount of fractional tokens is greater than the min amount
        require(outputAmount >= minOutputAmount, "Slippage: amount out");

        // transfer fractional tokens from sender
        _transferFrom(msg.sender, address(this), inputAmount);

        if (baseToken == address(0)) {
            // transfer ether out
            msg.sender.safeTransferETH(outputAmount);
        } else {
            // transfer base tokens out
            ERC20(baseToken).safeTransfer(msg.sender, outputAmount);
        }

        emit Sell(inputAmount, outputAmount);

        return outputAmount;
    }

    /// @notice Removes liquidity from the pair.
    function remove(
        uint256 lpTokenAmount,
        uint256 minBaseTokenOutputAmount,
        uint256 minFractionalTokenOutputAmount
    )
        public
        returns (
            uint256 baseTokenOutputAmount,
            uint256 fractionalTokenOutputAmount
        )
    {
        // calculate the output amounts
        (baseTokenOutputAmount, fractionalTokenOutputAmount) = lpTokenAmount.removeQuote(
            baseTokenReserves(),
            fractionalTokenReserves(),
            lpToken.totalSupply()
        );

        // *** Checks *** //

        // check that the base token output amount is greater than the min amount
        require(
            baseTokenOutputAmount >= minBaseTokenOutputAmount && 
            fractionalTokenOutputAmount >= minFractionalTokenOutputAmount,
            "Slippage: fractional token amount out"
        );

        // *** Effects *** //

        // transfer fractional tokens to sender
        _transferFrom(address(this), msg.sender, fractionalTokenOutputAmount);

        // *** Interactions *** //

        // burn lp tokens from sender
        lpToken.burn(msg.sender, lpTokenAmount);

        if (baseToken == address(0)) {
            // transfer ether out
            msg.sender.safeTransferETH(baseTokenOutputAmount);
        } else {
            // transfer base tokens to sender
            ERC20(baseToken).safeTransfer(msg.sender, baseTokenOutputAmount);
        }

        emit Remove(baseTokenOutputAmount,fractionalTokenOutputAmount,lpTokenAmount);}

    //      NFT AMM logic      //
    function nftAdd(
        uint256 baseTokenAmount,
        uint256[] calldata tokenIds,
        uint256 minLpTokenAmount,
        bytes32[][] calldata proofs
    ) public payable returns (uint256) {
        uint256 fractionalTokenAmount = wrap(tokenIds, proofs);
        uint256 lpTokenAmount = add(
            baseTokenAmount,
            fractionalTokenAmount,
            minLpTokenAmount
        );

        return lpTokenAmount;
    }

    function nftRemove(
        uint256 lpTokenAmount,
        uint256 minBaseTokenOutputAmount,
        uint256[] calldata tokenIds
    )
        public
        returns (
            uint256 baseTokenOutputAmount,
            uint256 fractionalTokenOutputAmount
        )
    {
        (baseTokenOutputAmount, fractionalTokenOutputAmount) = remove(
            lpTokenAmount,
            minBaseTokenOutputAmount,
            tokenIds.length * 1e18
        );
        unwrap(tokenIds);

        return (baseTokenOutputAmount, fractionalTokenOutputAmount);
    }

    function nftBuy(
        uint256[] calldata tokenIds,
        uint256 maxInputAmount
    ) public payable returns (uint256 inputAmount) {
        inputAmount = buy(tokenIds.length * 1e18, maxInputAmount);
        unwrap(tokenIds);

        return inputAmount;
    }

    function nftSell(
        uint256[] calldata tokenIds,
        uint256 minOutputAmount,
        bytes32[][] calldata proofs
    ) public returns (uint256) {
        uint256 inputAmount = wrap(tokenIds, proofs); // fractionalTokenAmount
        uint256 outputAmount = sell(inputAmount, minOutputAmount);

        return outputAmount;
    }

    //      Wrap logic      //
    function wrap(
        uint256[] calldata tokenIds,
        bytes32[][] calldata proofs
    ) public returns (uint256 fractionalTokenAmount) {
        // *** Checks *** //

        // check the tokens exist in the merkle root
        _validateTokenIds(tokenIds, proofs);

        // check that wrapping is not closed
        require(closeTimestamp == 0, "Wrap: closed");

        // *** Effects *** //

        fractionalTokenAmount = tokenIds.length * 1e18;

        // mint fractional tokens to sender
        _mint(msg.sender, fractionalTokenAmount);

        // *** Interactions *** //

        // transfer nfts from sender
        for (uint256 i = 0; i < tokenIds.length; i++) {
            ERC721(nft).safeTransferFrom(
                msg.sender,
                address(this),
                tokenIds[i]
            );
        }

        emit Wrap(tokenIds);
    }

    function unwrap(uint256[] calldata tokenIds) public returns (uint256) {
        // *** Effects *** //
        uint256 fractionalTokenAmount = tokenIds.length * 1e18;

        // burn fractional tokens from sender
        _burn(msg.sender, fractionalTokenAmount);

        // *** Interactions *** //

        // transfer nfts to sender
        for (uint256 i = 0; i < tokenIds.length; i++) {
            ERC721(nft).safeTransferFrom(
                address(this),
                msg.sender,
                tokenIds[i]
            );
        }

        emit Unwrap(tokenIds);

        return fractionalTokenAmount;
    }
    //      Internal utils      //
    function _transferFrom(
        address from,
        address to,
        uint256 amount
    ) internal returns (bool) {
        balanceOf[from] -= amount;
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(from, to, amount);

        return true;
    }

    function _validateTokenIds(
        uint256[] calldata tokenIds,
        bytes32[][] calldata proofs
    ) internal view {
        // if merkle root is not set then all tokens are valid
        if (merkleRoot == bytes23(0)) return;

        // validate merkle proofs against merkle root
        for (uint256 i = 0; i < tokenIds.length; i++) {
            bool isValid = MerkleProofLib.verify(
                proofs[i],
                merkleRoot,
                keccak256(abi.encodePacked(tokenIds[i]))
            );
            require(isValid, "Invalid merkle proof");
        }
    }

    //      Emergency exit logic      //
    function close() public {
        require(ringle.owner() == msg.sender, "Close: not owner");

        closeTimestamp = block.timestamp + 1 days;

        // remove the pair from the Ringle contract
        ringle.destroy(nft, baseToken, merkleRoot);

        emit Close(closeTimestamp);
    }

    // used to withdraw nfts in case of liquidity imbalance
    function withdraw(uint256 tokenId) public {
        require(ringle.owner() == msg.sender, "Withdraw: not owner");
        require(closeTimestamp != 0, "Withdraw not initiated");
        require(block.timestamp >= closeTimestamp, "Not withdrawable yet");

        // transfer the nft to the ringle owner
        ERC721(nft).safeTransferFrom(address(this), msg.sender, tokenId);

        emit Withdraw(tokenId);
    }
    //      Getters      //
    /**
     * @dev Returns the current price of the pair
     * @return The current price of the pair
     */
    function price() public view returns (uint256) {
        return (_baseTokenReserves() * 1e18) / fractionalTokenReserves(); // return the current price
    }

    /**
     * @dev Returns the base token reserves
     * @return The base token reserves
     */
    function baseTokenReserves() public view returns (uint256) {
        return _baseTokenReserves();
    }

    /**
     * @dev Returns the fractional token reserves
     * @return The fractional token reserves
     */
    function fractionalTokenReserves() public view returns (uint256) {
        return balanceOf[address(this)];
    }

    function _baseTokenReserves() internal view returns (uint256) {
        return
            baseToken == address(0)
                ? address(this).balance - msg.value // subtract the msg.value if the base token is ETH
                : ERC20(baseToken).balanceOf(address(this));
    }
}