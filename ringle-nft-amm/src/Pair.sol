// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "solmate/tokens/ERC20.sol";
import "solmate/tokens/ERC721.sol";
import "openzeppelin/utils/math/Math.sol";
import "solmate/utils/SafeTransferLib.sol";
import {MerkleProofLib} from "solmate/utils/MerkleProofLib.sol";
import "openzeppelin/utils/cryptography/MerkleProof.sol";
import {LinkTokenInterface } from "chainlink/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "chainlink/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol";
import "./LpToken.sol";
import  {IPenguin} from"./interfaces/IPenguin.sol";
import "openzeppelin/utils/structs/EnumerableSet.sol";

/// @title Pair
/// @author SUNIDHI-JAIN125
/// @notice A pair of an NFT and a base token that can be used to create and trade fractionalized NFTs.
contract Pair is ERC20, ERC721TokenReceiver,  VRFV2WrapperConsumerBase{
    using SafeTransferLib for address;
    using SafeTransferLib for ERC20;

    uint256 public constant ONE = 1e18; 
    uint256 public constant CLOSE_GRACE_PERIOD = 7 days;

    address public immutable nft; // address of the NFT
    address public immutable baseToken; // address(0) for ETH
    bytes32 public immutable merkleRoot;

    LpToken public immutable lpToken;
    IPenguin public immutable ringle;

    uint256 public closeTimestamp;

    // bytes32 internal keyHash;
    // uint256 internal fee;
    // uint256 public randomResult;
    // address public recentWinner;
    // mapping(address => uint256) public userGuesses;
    // mapping(address => uint8) public guessAttempts;
    mapping(address => uint256) public userGuesses; // Stores user guesses
    mapping(address => bool) public hasClaimedGuessReward; // Tracks if user claimed reward
 struct RequestStatus {
        uint256 paid; // amount paid in link
        bool fulfilled; // whether the request has been successfully fulfilled
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 25000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 numWords = 1;

    // Address LINK - hardcoded for Sepolia
    address linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // address WRAPPER - hardcoded for Sepolia
    address wrapperAddress = 0xab18414CD93297B0d12ac29E63Ca20f515b3DB46;



    using EnumerableSet for EnumerableSet.AddressSet;
    EnumerableSet.AddressSet private users;




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
    // event NewGuess(address indexed user, uint256 guess);
    event GuessResult(address indexed user, bool isWinner);
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(
        uint256 requestId,
        uint256[] randomWords,
        uint256 payment
    );

    constructor(
        address _nft,
        address _baseToken,
        bytes32 _merkleRoot,
        string memory pairSymbol,
        string memory nftName,
        string memory nftSymbol
        // address _vrfCoordinator,
        // address _linkToken,
        // bytes32 _keyHash,
        // uint256 _fee
    )
        ERC20(
            string.concat(nftName, " fractional token"),
            string.concat("f", nftSymbol),
            18
        ) 
        VRFV2WrapperConsumerBase(linkAddress, wrapperAddress)
    {
        nft = _nft;
        baseToken = _baseToken; // use address(0) for native ETH
        merkleRoot = _merkleRoot;
        ringle = IPenguin(msg.sender);
        lpToken = new LpToken(pairSymbol);
    }


function requestRandomWords()
        external
        returns (uint256 requestId)
    {
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            randomWords: new uint256[](0),
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }


function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );

// Use the random number for the guessing game
    uint256 randomNumber = _randomWords[0] % 20 + 1; // Modulo by 20 to get a number between 1 and 20
    checkGuesses(randomNumber);
    }



function getRequestStatus(
        uint256 _requestId
    )
        external
        view
        returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
    {
        require(s_requests[_requestId].paid > 0, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }



function registerUser(address user) public {
  users.add(user);
}


    function checkGuesses(uint256 randomNumber) internal {
    for (uint256 i = 0; i < users.length(); i++) {
    address user = users.at(i);
    uint256 userGuess = userGuesses[user];
        if (userGuess > 0 && !hasClaimedGuessReward[user] && userGuess == randomNumber) {
            // User guessed correctly and hasn't claimed reward yet
            hasClaimedGuessReward[user] = true;
            // Send congratulations message (see below)
            congratsMessage(user);
        }
    }
}

function congratsMessage(address user) internal {
    // You can implement logic to send a message (on-chain or off-chain)
    // Here's an example for logging a message on-chain
    emit GuessResult(user, true);
}
    

function withdrawLink() public {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }



    // ******************* //
    //      AMM logic      //
    // ******************  //

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

        lpTokenAmount = addQuote(baseTokenAmount, fractionalTokenAmount);

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
        uint256 inputAmount = buyQuote(outputAmount);

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
        uint256 outputAmount = sellQuote(inputAmount);

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
        (baseTokenOutputAmount, fractionalTokenOutputAmount) = removeQuote(
            lpTokenAmount
        );

        // *** Checks *** //

        // check that the base token output amount is greater than the min amount
        require(
            baseTokenOutputAmount >= minBaseTokenOutputAmount,
            "Slippage: base token amount out"
        );
        // check that the fractional token output amount is greater than the min amount
        require(
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

        emit Remove(
            baseTokenOutputAmount,
            fractionalTokenOutputAmount,
            lpTokenAmount
        );
    }

    // *********************** //
    //      NFT AMM logic      //
    // *********************** //

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
            tokenIds.length * ONE
        );
        unwrap(tokenIds);

        return (baseTokenOutputAmount, fractionalTokenOutputAmount);
    }

    function nftBuy(
        uint256[] calldata tokenIds,
        uint256 maxInputAmount
    ) public payable returns (uint256 inputAmount) {
        inputAmount = buy(tokenIds.length * ONE, maxInputAmount);
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

    // ******************** //
    //      Wrap logic      //
    // ******************** //

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

        fractionalTokenAmount = tokenIds.length * ONE;

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
        uint256 fractionalTokenAmount = tokenIds.length * ONE;

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

    // ************************ //
    //      Internal utils      //
    // ************************ //

    function _transferFrom(
        address from,
        address to,
        uint256 amount
    ) internal returns (bool) {
        balanceOf[from] -= amount;

        // cannot overflow because the sum of all user
        // balances cannot exceed the max uint256 value.
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

    // ****************************** //
    //      Emergency exit logic      //
    // ****************************** //

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

    // ***************** //
    //      Getters      //
    // ***************** //

    /**
     * @dev Returns the current price of the pair
     * @return The current price of the pair
     */
    function price() public view returns (uint256) {
        return (_baseTokenReserves() * ONE) / fractionalTokenReserves(); // return the current price
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

    /**
     * @dev Calculates the amount of base tokens required to buy a given amount of fractional tokens
     * @param outputAmount The amount of fractional tokens to buy
     * @return The amount of base tokens required
     */
    function buyQuote(uint256 outputAmount) public view returns (uint256) {
        // x * y = k
        // Calculate the required amount of base tokens to buy the output amount of fractional tokens
        // (baseTokenReserves + inputAmount*997/1000)*(fractionalTokenReserves - outputAmount) = baseTokenReserves * fractionalTokenReserves
        // baseTokenReserves + inputAmount*997/1000 = （baseTokenReserves * fractionalTokenReserves）/ (fractionalTokenReserves - outputAmount)
        // inputAmount*997/1000 = （baseTokenReserves * fractionalTokenReserves - (baseTokenReserves*fractionalTokenReserves - baseTokenReserves*outputAmount)）/ (fractionalTokenReserves - outputAmount)
        // inputAmount = baseTokenReserves*outputAmount *1000 / (fractionalTokenReserves - outputAmount)*997
        return
            (outputAmount * 1000 * baseTokenReserves()) /
            ((fractionalTokenReserves() - outputAmount) * 997);
    }

    function sellQuote(uint256 inputAmount) public view returns (uint256) {
        // (baseTokenReserves - outputAmount)*(fractionalTokenReserves + inputAmount*997/1000) = baseTokenReserves * fractionalTokenReserves
        // baseTokenReserves - outputAmount = (baseTokenReserves * fractionalTokenReserves) / (fractionalTokenReserves + inputAmount*997/1000)
        // outputAmount = (baseTokenReserves*fractionalTokenReserves + baseTokenReserves*inputAmount*997/1000 - baseTokenReserves * fractionalTokenReserves) / (fractionalTokenReserves + inputAmount*997/1000)
        // outputAmount = (baseTokenReserves*inputAmount*997/1000) / (fractionalTokenReserves + inputAmount*997/1000)
        // outputAmount = (baseTokenReserves*inputAmount*997) / (fractionalTokenReserves*1000 + inputAmount*997)
        uint256 inputAmountWithFee = inputAmount * 997;

        return
            (inputAmountWithFee * baseTokenReserves()) /
            ((fractionalTokenReserves() * 1000) + inputAmountWithFee);
    }

    /// @notice The amount of lp tokens received for adding a given amount of base tokens and fractional tokens.
    /// @dev Calculated as a share of existing deposits. If there are no existing deposits, then initializes to
    ///      sqrt(baseTokenAmount * fractionalTokenAmount).
    /// @param baseTokenAmount The amount of base tokens to add.
    /// @param fractionalTokenAmount The amount of fractional tokens to add.
    /// @return lpTokenAmount The amount of lp tokens received.
    function addQuote(
        uint256 baseTokenAmount,
        uint256 fractionalTokenAmount
    ) public view returns (uint256) {
        uint256 lpTokenSupply = lpToken.totalSupply();
        if (lpTokenSupply > 0) {
            uint256 baseTokenShare = (baseTokenAmount * lpTokenSupply) /
                baseTokenReserves();
            uint256 fractionalTokenShare = (fractionalTokenAmount *
                lpTokenSupply) / fractionalTokenReserves();
            return Math.min(baseTokenShare, fractionalTokenShare);
        } else {
            // if there is no liquidity then init
            return Math.sqrt(baseTokenAmount * fractionalTokenAmount);
        }
    }

    /// @notice The amount of base tokens and fractional tokens received for burning a given amount of lp tokens.
    /// @dev Calculated as a share of existing deposits.
    /// @param lpTokenAmount The amount of lp tokens to burn.
    /// @return baseTokenAmount The amount of base tokens received.
    /// @return fractionalTokenAmount The amount of fractional tokens received.
    function removeQuote(
        uint256 lpTokenAmount
    ) public view returns (uint256, uint256) {
        uint256 lpTokenSupply = lpToken.totalSupply();
        uint256 baseTokenOutputAmount = (baseTokenReserves() * lpTokenAmount) /
            lpTokenSupply;
        uint256 fractionalTokenOutputAmount = (fractionalTokenReserves() *
            lpTokenAmount) / lpTokenSupply;

        return (baseTokenOutputAmount, fractionalTokenOutputAmount);
    }
}
