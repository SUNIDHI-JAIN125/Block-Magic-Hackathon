'use client'

import React, {useContext} from 'react'
import SideBar from '../components/SideBar';
import MainBar from '../components/MainBar';
import { AppContext } from '@/contextAPI';
import StakePage from '../components/screens/StakePage';
import CollectionsPage from '../components/screens/CollectionsPage';
import NftPage from '../components/screens/NftPage';
import LiquidityProviderPage from '../components/screens/LiquidityProviderPage';
import GamePage from '../components/screens/GamePage';


const Dashboard = () => {
  const {setDashBoardState, dashBoardState} = useContext(AppContext)
  return (
    <div className='flex flex-1'>
        <div className='flex-[0.17]'>
            <SideBar />
        </div>
        <div className='flex-[0.83]'>
            {dashBoardState === "home" && (<MainBar />)}
            {dashBoardState === "stake" && (<StakePage />)}
            {dashBoardState === "collections" && (<CollectionsPage />)}
            {dashBoardState === "nft" && (<NftPage />)}
            {dashBoardState === "game" && (<GamePage />)}
            {dashBoardState === "liquidity" && (<LiquidityProviderPage />)}


        </div>
       
      
    </div>
  )
}

export default Dashboard