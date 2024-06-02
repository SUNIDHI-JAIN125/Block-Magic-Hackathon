'use client'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { ethers } from 'ethers'
import React, { useState, useEffect } from "react";
import { Sepolia, pairABI, pairContractAddress, ringleABI,ringleContractAddress,mintedNftContractAddress,mintednftABI} from './app/constants';

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const [gameNumber, setGameNumber] = useState(0)
  const [dashBoardState, setDashBoardState] = useState("home")
  const [modalChoices, setModalChoices] = useState({
    addLiquidityModal: false,
    removeLiquidityModal: false,
    buyNftLiquidityModal: false,
    gameModal: false,
  })

  const initializeContract = (contractAddress, contractABI, signerOrProvider) => new ethers.Contract(
    contractAddress,
    contractABI,
    signerOrProvider
  )

  const initializeRingle = (contractAddress, contractABI, signerOrProvider) => new ethers.Contract(
    contractAddress,
    contractABI,
    signerOrProvider
  )


  const  initializeNFT = (contractAddress, contractABI, signerOrProvider) => new ethers.Contract(
    contractAddress,
    contractABI,
    signerOrProvider
  )


  const getSigner = async () => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    return signer
  }

  const getProvider = async () => {
    const provider = new ethers.JsonRpcProvider(Sepolia?.rpcUrl)
    return provider
  }

  const addLiquidity = async (baseTokenAmount, fractionalTokenAmount, minLpTokenAmount) => {
    try {
      const signer = await getSigner()
      const initContract = initializeContract(pairContractAddress, pairABI, signer)
    
      const baseToken = ethers.parseUnits(baseTokenAmount, 18);
      const fractionalToken =  ethers.parseUnits(fractionalTokenAmount, 18);
      const lpToken = ethers.parseUnits(minLpTokenAmount, 18);
      console.log(baseToken,fractionalToken,lpToken);


      const time = await initContract.name();
      console.log(time);
      // const tx = await initContract.add(baseToken, fractionalToken, lpToken,  {
      //   gasLimit: 3000000
      // });
      // await tx.wait();
      // console.log(tx);  
      // console.log("Liquidity added successfully");

    } catch (error) {
      console.log(error, "Add liquidity error")
    }
  }

  const removeLiquidity = async (lpTokenAmount, minBaseTokenOutputAmount, minFractionalTokenOutputAmount) => {
    try {
      const signer = await getSigner()
      const initContract = initializeContract(pairContractAddress, pairABI, signer)
      const tx = await initContract.remove(minBaseTokenOutputAmount, minFractionalTokenOutputAmount, lpTokenAmount);
      await tx.wait();
      console.log("Liquidity removed successfully");

    } catch (error) {
      console.log(error, "Remove liquidity error")
    }
  }




  const buy = async (inputAmount, minOutputAmount, token) => {
    try {
      const signer = await getSigner();
      const initContract = initializeContract(pairContractAddress, pairABI, signer);

      const input = ethers.parseUnits(inputAmount, 18);
      const minOutput = ethers.parseUnits(minOutputAmount, 18);

      let tx;
      if (token === 'baseToken') {
        tx = await initContract.buy(input, minOutput, { value: input, gasLimit: 30000 });
      } else {
        tx = await initContract.buy(input, minOutput, { gasLimit: 30000 });
      }

      console.log(tx);
      await tx.wait();
      console.log("NFT purchased successfully");

    } catch (error) {
      console.log(error, "Buy error");
    }
  };



  const showOwner = async () => {
    try {
      const signer = await getSigner();
      const ringleContract = initializeRingle(ringleContractAddress, ringleABI, signer);

      const owner= await ringleContract.owner();
      console.log(owner);

      const NFTContract = initializeNFT(mintedNftContractAddress, mintednftABI, signer);

    
      const nftaddress= await NFTContract.ownerOf(1499);
      console.log("Token id 1499 nft :", nftaddress);


      const totalSupply = await NFTContract.totalSupply();
      console.log('Total Supply of NFTs:', totalSupply.toString());

    } catch (error) {
      console.log(error, "Can't Get The Owner");
    }
  };

  showOwner();




  return (
    <AppContext.Provider value={{
      isConnected,
      walletProvider,
      dashBoardState,
      setDashBoardState,
      modalChoices,
      setModalChoices,
      gameNumber,
      setGameNumber,
      addLiquidity,
      removeLiquidity,
      buy,
      showOwner
    }}>
      {children}
    </AppContext.Provider>
  )
}
