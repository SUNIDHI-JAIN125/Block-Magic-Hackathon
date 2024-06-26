// // SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../src/Ringle.sol";
import "../Shared/Fixture.t.sol";

contract BuyTest is Fixture {
//     event Buy(uint256 inputAmount, uint256 outputAmount);

//     uint256 public outputAmount = 0.1e18;
//     uint256 public maxInputAmount;

//     function setUp() public {
//         uint256 baseTokenAmount = 100e18;
//         uint256 fractionalTokenAmount = 30.123e18;

//         deal(address(usd), address(this), baseTokenAmount, true);
//         deal(address(pair), address(this), fractionalTokenAmount, true);
//         deal(address(ethPair), address(this), fractionalTokenAmount, true);

//         usd.approve(address(pair), type(uint256).max);

//         uint256 minLpTokenAmount = Math.sqrt(
//             baseTokenAmount * fractionalTokenAmount
//         );
//         pair.add(baseTokenAmount, fractionalTokenAmount, minLpTokenAmount);

//         maxInputAmount = pair.buyQuote(outputAmount);

//         deal(address(usd), address(this), maxInputAmount, true);
//         ethPair.add{value: baseTokenAmount}(
//             baseTokenAmount,
//             fractionalTokenAmount,
//             minLpTokenAmount
//         );
//     }

//     function testItReturnsInputAmount() public {
//         // arrange
//         uint256 expectedInputAmount = maxInputAmount;

//         // act
//         uint256 inputAmount = pair.buy(outputAmount, maxInputAmount);

//         // assert
//         assertEq(
//             inputAmount,
//             expectedInputAmount,
//             "Should have returned input amount"
//         );
//     }

//     function testItTransfersBaseTokens() public {
//         // arrange
//         uint256 balanceBefore = usd.balanceOf(address(pair));
//         uint256 thisBalanceBefore = usd.balanceOf(address(this));

//         // act
//         pair.buy(outputAmount, maxInputAmount);

//         // assert
//         assertEq(
//             usd.balanceOf(address(pair)) - balanceBefore,
//             maxInputAmount,
//             "Should have transferred base tokens in"
//         );
//         assertEq(
//             thisBalanceBefore - usd.balanceOf(address(this)),
//             maxInputAmount,
//             "Should have transferred base tokens out"
//         );
//     }

//     function testItTransfersFractionalTokens() public {
//         // arrange
//         uint256 balanceBefore = pair.balanceOf(address(pair));
//         uint256 thisBalanceBefore = pair.balanceOf(address(this));

//         // act
//         pair.buy(outputAmount, maxInputAmount);

//         // assert
//         assertEq(
//             balanceBefore - pair.balanceOf(address(pair)),
//             outputAmount,
//             "Should have transferred fractional tokens in"
//         );
//         assertEq(
//             pair.balanceOf(address(this)) - thisBalanceBefore,
//             outputAmount,
//             "Should have transferred fractional tokens out"
//         );
//     }

//     function testItRevertsSlippageOnBuy() public {
//         // arrange
//         maxInputAmount -= 1; // subtract 1 to cause revert

//         // act
//         vm.expectRevert("Slippage: amount in");
//         pair.buy(outputAmount, maxInputAmount);
//     }

//     function testItRevertsIfValueIsGreaterThanZeroAndBaseTokenIsNot0() public {
//         // act
//         vm.expectRevert("Invalid ether input");
//         pair.buy{value: maxInputAmount}(outputAmount, maxInputAmount);
//     }

//     function testItTransfersEther() public {
//         // arrange
//         uint256 balanceBefore = address(ethPair).balance;
//         uint256 thisBalanceBefore = address(this).balance;

//         // act
//         ethPair.buy{value: maxInputAmount}(outputAmount, maxInputAmount);

//         // assert
//         assertEq(
//             address(ethPair).balance - balanceBefore,
//             maxInputAmount,
//             "Should have transferred ether to pair"
//         );
//         assertEq(
//             thisBalanceBefore - address(this).balance,
//             maxInputAmount,
//             "Should have transferred ether from sender"
//         );
//     }

//     function testItRefundsSurplusEther() public {
//         // arrange
//         uint256 surplus = 500;
//         maxInputAmount += surplus;
//         uint256 balanceBefore = address(ethPair).balance;
//         uint256 thisBalanceBefore = address(this).balance;

//         // act
//         ethPair.buy{value: maxInputAmount}(outputAmount, maxInputAmount);

//         // assert
//         assertEq(
//             address(ethPair).balance - balanceBefore,
//             maxInputAmount - surplus,
//             "Should have transferred ether to pair"
//         );
//         assertEq(
//             thisBalanceBefore - address(this).balance,
//             maxInputAmount - surplus,
//             "Should have transferred ether from sender"
//         );
//     }

//     function testItRevertsIfMaxInputAmountIsNotEqualToValue() public {
//         // act
//         vm.expectRevert("Invalid ether input");
//         ethPair.buy{value: maxInputAmount + 100}(outputAmount, maxInputAmount);
//     }

//     function testItEmitsBuyEvent() public {
//         // act
//         vm.expectEmit(true, true, true, true);
//         emit Buy(maxInputAmount, outputAmount);
//         pair.buy(outputAmount, maxInputAmount);
//     }
}
