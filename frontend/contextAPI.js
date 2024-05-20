'use client'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'
import React, { useState, useEffect } from "react";

export const AppContext = React.createContext();


export const AppContextProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()



  return (
    <>
      <AppContext.Provider value={{
        isConnected,
        walletProvider

      }} >
        {children}
      </AppContext.Provider>
    </>
  )




}   