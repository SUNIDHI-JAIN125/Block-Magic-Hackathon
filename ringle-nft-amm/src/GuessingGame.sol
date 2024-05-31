// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "solmate/tokens/ERC20.sol";
import "solmate/tokens/ERC721.sol";
import {LinkTokenInterface} from "chainlink/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {AutomationCompatibleInterface} from "chainlink/src/v0.8/automation/AutomationCompatible.sol";
import "chainlink/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol";
import "openzeppelin/utils/structs/EnumerableSet.sol";
import "solmate/utils/SafeTransferLib.sol";
import "./LpToken.sol";
import {IPenguin} from "./interfaces/IPenguin.sol";

/// @title Guessing Game
/// @author SUNIDHI-JAIN125
/// @notice 
contract GuessingGame is
    ERC20,
    ERC721TokenReceiver,
    VRFV2WrapperConsumerBase,
    AutomationCompatibleInterface
{

using SafeTransferLib for address;
using SafeTransferLib for ERC20;

address public immutable nft; // address of the NFT
    address public immutable baseToken; // address(0) for ETH
    bytes32 public immutable merkleRoot;

    LpToken public immutable lpToken;
    IPenguin public immutable ringle;

    mapping(address => uint256) public userGuesses; // Stores user guesses
    mapping(address => bool) public hasClaimedGuessNft; // Tracks if user claimed reward
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
    uint256 public immutable tokenIdNft;



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
    event GuessResult(address indexed user, uint256 userGuess, uint256 winningNumber, bool isWinner);
    
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
        string memory nftSymbol,
        uint256 _tokenIdNft
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
        tokenIdNft = _tokenIdNft;
    }
 

    function makeGuess(uint256 guess) external {
        require(guess >= 1 && guess <= 20, "Guess must be between 1 and 20");
        require(userGuesses[msg.sender] == 0, "You have already made a guess");

        userGuesses[msg.sender] = guess;
        registerUser(msg.sender);
    }



    function requestRandomWords() external returns (uint256 requestId) {
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
        uint256 randomNumber = (_randomWords[0] % 20) + 1; // Modulo by 20 to get a number between 1 and 20
        processGuesses(randomNumber);
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

     function processGuesses(uint256 randomNumber) internal {
        for (uint256 i = 0; i < users.length(); i++) {
            address user = users.at(i);
            uint256 userGuess = userGuesses[user];
            if (
                userGuess > 0 &&
                !hasClaimedGuessNft[user] &&
                userGuess == randomNumber
            ) {
                // User guessed correctly and hasn't claimed nft yet
                hasClaimedGuessNft[user] = true;
                distributingFreeNfts(user, tokenIdNft);
            }

            emit GuessResult(user, userGuess, randomNumber, userGuess == randomNumber);
        }
    }



    function distributingFreeNfts(address user, uint256 _tokenIdNft) internal {
        require(hasClaimedGuessNft[user] == false, "Already claimed");
        require(
            ERC721(nft).ownerOf(_tokenIdNft) == address(this),
            "Contract doesn't own the NFT"
        );
        ERC721(nft).safeTransferFrom(address(this), user, _tokenIdNft);
        hasClaimedGuessNft[user] = true;
      emit GuessResult(user, userGuesses[user], _tokenIdNft, true);
    }

     
    function withdrawLink() public {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    // Chainlink Automation Functions

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        // Check if there are users who have won the game and haven't claimed their reward
        for (uint256 i = 0; i < users.length(); i++) {
            address user = users.at(i);
            if (userGuesses[user] > 0 && !hasClaimedGuessNft[user]) {
                upkeepNeeded = true;
                performData = abi.encode(user);
                return (upkeepNeeded, performData);
            }
        }
        upkeepNeeded = false;
        performData = "";
    }

    function performUpkeep(bytes calldata performData) external override {
        address user = abi.decode(performData, (address));
        // Check if the user has won the game and hasn't claimed their reward
        if (userGuesses[user] > 0 && !hasClaimedGuessNft[user]) {
            distributingFreeNfts(user, tokenIdNft);
        }
    }
}