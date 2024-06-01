'use client'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { ethers } from 'ethers'
import React, { useState, useEffect } from "react";
import { Sepolia, pairABI, pairContractAddress } from './app/constants';

export const AppContext = React.createContext();



export const AppContextProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const [gameNumber, setGameNumber] = useState(0)
  console.log(pairContractAddress, pairABI, "ABIIIIIIIIII")

  const [dashBoardState, setDashBoardState] = useState("home")
  const [modalChoices, setModalChoices] = useState({
    addLiquidityModal: false,
    removeLiquidityModal: false,
    buyNftLiquidityModal: false,
    gameModal: false
  })


  const initializeContract = (contractAddress, contractABI, signerOrProvider) => new ethers.Contract(
    contractAddress,
    contractABI,
    signerOrProvider
  )

  const getSigner = async () => {
    // if (!isConnected) return toast.error('Wallet not connected')
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    return signer
  }

  const getProvider = async () => {
    const provider = new ethers.JsonRpcProvider(Sepolia?.rpcUrl)
    return provider
  }


  const addLiquidity = async (baseTokenAmount, fractionalTokenAmount, minLpTokenAmount) => {
    console.log(baseTokenAmount, fractionalTokenAmount, minLpTokenAmount, "SLIPP")
    try {
      const signer = await getSigner()
      console.log(signer, pairContractAddress, pairABI)
      const initContract = initializeContract(pairContractAddress, pairABI, signer)

      const baseToken  = ethers.utils.parseUnits(baseTokenAmount?.toString(), 18);
      const fractionalToken  = ethers.utils.parseUnits(fractionalTokenAmount?.toString(), 18);
      const lpToken  = ethers.utils.parseUnits(minLpTokenAmount?.toString(), 18);

      const tx = await initContract.add(baseToken, fractionalToken, lpToken);

      await tx.wait();
      console.log("Liquidity added successfully");

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
      console.log("Liquidity added successfully");

    } catch (error) {
      console.log(error, "Add liquidity error")

    }

  }

  return (
    <>
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
        removeLiquidity

      }} >
        {children}
      </AppContext.Provider>
    </>
  )




}   