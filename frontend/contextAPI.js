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


  const buy = async (tokenId, maxInputAmount) => {
    try {
      const signer = await getSigner();
      const initContract = initializeContract(pairContractAddress, pairABI, signer);
      
      let tokenIds= []
      tokenIds.push(tokenId);
      console.log(tokenIds,maxInputAmount);
       const  inputAmount= await initContract.nftBuy(tokenIds, maxInputAmount, {gasLimit:300000});
     

      console.log(inputAmount);
      // await tx.wait();
      console.log("NFT purchased successfully");

    } catch (error) {
      console.log(error, "Buy error");
    }
  };


  const sellNft = async (tokenId,minOutputAmount, proof ) => {
    try {
      const signer = await getSigner();
      const initContract = initializeContract(pairContractAddress, pairABI, signer);
      
      let tokenIds= []
      let proofs = [];
      proofs.push(proof);
      tokenIds.push(tokenId);
      console.log(tokenIds,minOutputAmount,proof);
       const  outputAmount= await initContract.nftSell(tokenIds,minOutputAmount,proofs, {gasLimit:300000});
     

      console.log(outputAmount);
      // await tx.wait();
      console.log("NFT selled successfully");

    } catch (error) {
      console.log(error, "Sell error");
    }
  };


  const showOwner = async () => {
    try {
      const signer = await getSigner();
      const ringleContract = initializeRingle(ringleContractAddress, ringleABI, signer);

      const owner= await ringleContract.owner();
      console.log(owner);

      // const address = await ringleContract.pairs('0x846AF542138F8194cdC5d2Fa7df92AEEb20a9F25','0x0000000000000000000000000000000000000000',	'0x894692c90a28cc4bf849bff8a532a09bb3b8e9717f038e677739666def3ba784');
      // console.log(" this is pair"  + address);


      const NFTContract = initializeNFT(mintedNftContractAddress, mintednftABI, signer);

    
      const nftaddress= await NFTContract.ownerOf(1499);
      console.log("Token id 1499 nft :", nftaddress);

      const nfttokenuri= await NFTContract.tokenURI(1499);
      console.log("Token uri  :", nfttokenuri);
      const nftname= await NFTContract.name();
      console.log("Token name  :", nftname);
      const nftsymbol= await NFTContract.symbol();
      console.log("Token symbol  :", nftsymbol);

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
      sellNft,
      showOwner
    }}>
      {children}
    </AppContext.Provider>
  )
}
