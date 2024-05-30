import React, {useContext, useState} from 'react'
import Image from 'next/image';
import boxCat from '../../public/images/nft1.png'
import dashboard from '../../public/icons/dash.svg'
import game from '../../public/icons/game.svg'
import settings from '../../public/icons/settings.svg'
import wallet from '../../public/icons/wallet.svg'
import collections from '../../public/icons/collections.svg'
import Link from 'next/link';
import { AppContext } from '@/contextAPI';
const SideBar = () => {
  const {setDashBoardState, dashBoardState} = useContext(AppContext)
  const [indexColor, setIndexColor] = useState(0)

  const setDashBoardAndIndexColor = (dashboard:string, color:number) => {
    setDashBoardState(dashboard)
    setIndexColor(color)
  }
  return (
    <div className='flex flex-col bg-primary h-screen py-8  overflow-y-auto min-h-screen border-r border-gray-500'>
        <div className='flex flex-col mx-auto'>
                {/* Image Profile */}
                <div className='flex space-x-1 font-poppins  mx-auto'>
                    <div>
                        <Image src={boxCat} alt="" className='bg-white rounded-3xl' width={40} height={40} />

                    </div>
                    <div>
                        <p className='font-semibold text-[13px] mt-1 text-white'>Uimega Agency</p>
                        <p className='text-[10px] text-white'>@uimega</p>
                    </div>
                    
                </div>
             <div className='mt-5 ml-2'>
                <div className=''>
                        <h1 className='text-[10px] font-semibold font-poppins my-4 text-white'>GENERAL</h1> 
                          <div className={`${indexColor == 0 ? 'bg-black/20 py-2 px-2 text-primary-button' :''} flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125 py-2 hover:px-2 my-2 hover:transition duration-500`} onClick={()=>setDashBoardAndIndexColor("home", 0)}><Image  src={dashboard} alt='' width={20} height={20} /> <p className='text-[13px] font-semibold font-poppins'>Dashboard</p></div>
                          <div className={`${indexColor == 2 ? 'bg-black/20 py-2 px-2 text-primary-button' :''} flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  py-2 hover:px-2 my-2 hover:transition duration-500`} onClick={()=>setDashBoardAndIndexColor("nft", 2)}><Image  src={settings} alt='' width={20} height={20} /> <p className='text-[13px] font-semibold font-poppins'>Buy & Sell NFTs</p></div>
              
                          <div className={`${indexColor == 3 ? 'bg-black/20 py-2 px-2 text-primary-button' :''} flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125 py-2  hover:px-2 my-2 hover:transition duration-500`} onClick={()=>setDashBoardAndIndexColor("collections", 3)}><Image  src={collections} alt='' width={20} height={20} /> <p className='text-[13px] font-semibold font-poppins'>Collections</p></div>
                          <div className={`${indexColor == 4 ? 'bg-black/20 py-2 px-2 text-primary-button' :''} flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125 py-2 hover:px-2 my-2 hover:transition duration-500`} onClick={()=>setDashBoardAndIndexColor("game", 4)}><Image  src={game} alt='' width={20} height={20} /> <p className='text-[13x] font-semibold font-poppins'>Game</p></div>
                          <div className={`${indexColor == 5 ? 'bg-black/20 py-2 px-2 text-primary-button' :''} flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125 py-2 hover:px-2 my-2 hover:transition duration-500`} onClick={()=>setDashBoardAndIndexColor("liquidity", 5)}><Image  src={wallet} alt='' width={20} height={20} /> <p className='text-[13px] font-semibold font-poppins'>Liquidity Provider</p></div>


                          
                         
                          
                </div>
             </div>
             <div className='h-[100px] bg-primary-button rounded-lg flex flex-col justify-center items-center font-poppins font-semibold text-[10px] mt-5 text-white'>
              <p>Great perks for</p>
              <p>NFT hodlers.</p>
              <button className='bg-white py-1  px-4 rounded-sm text-primary-button mt-3'>Discover now</button>


             </div>
        </div>
    

    </div>
  )
}

export default SideBar