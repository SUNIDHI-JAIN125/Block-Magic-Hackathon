'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import {morphSepolia, mainnet} from '../app/constants';
import MainBar from './components/MainBar';
import { useEffect, useContext } from 'react';
import { AppContext } from '@/contextAPI';
import Dashboard from './dashboard/Dashboard';


const projectId = "e29303e12e8c37e33e06debf303c4b9e"



const metadata = {
  name: 'DigiPass Wallet Connect',
  description: 'Your favourite nft ticketing platform',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default 
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

createWeb3Modal({
  ethersConfig,
  chains: [morphSepolia, mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function Home() {

  const {isConnected} = useContext(AppContext)
  
  return (
  <main>
      
   {!isConnected ? 
   <MainBar /> :
    <Dashboard />
   }
    
  </main>
  )
}