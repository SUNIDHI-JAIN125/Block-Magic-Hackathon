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

      const address = await ringleContract.pairs('0x846AF542138F8194cdC5d2Fa7df92AEEb20a9F25','0x0000000000000000000000000000000000000000',	'0x894692c90a28cc4bf849bff8a532a09bb3b8e9717f038e677739666def3ba784');
      console.log(" this is pair"  + address);


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
      buy,
      showOwner
    }}>
      {children}
    </AppContext.Provider>
  )
}
