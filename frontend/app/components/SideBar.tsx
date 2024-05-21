import React from 'react'
import Image from 'next/image';
import boxCat from '../../public/images/nft1.png'
import dashboard from '../../public/icons/dash.svg'
import message from '../../public/icons/message.svg'
import settings from '../../public/icons/settings.svg'
import market from '../../public/icons/market.svg'
import bid from '../../public/icons/bids.svg'
import fav from '../../public/icons/fav.svg'
import wallet from '../../public/icons/wallet.svg'
import collections from '../../public/icons/collections.svg'
const SideBar = () => {
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
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={dashboard} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Dashboard</p></div>
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={message} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Message</p></div>
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={settings} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Settings</p></div>
              
                </div>
                <div className=''>
                        <h1 className='text-[10px] font-semibold font-poppins my-4 text-white'>MARKETPLACE</h1> 
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={market} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Market</p></div>
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={bid} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Active Bids</p></div>
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={fav} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Saved</p></div>
                         
                </div>
                <div className=''>
                        <h1 className='text-[10px] font-semibold font-poppins my-4 text-white'>PROFILE</h1> 
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={collections} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Collections</p></div>
                          <div className='flex text-gray-300 space-x-4 hover:text-primary-button cursor-pointer hover:bg-black/20 hover:rounded-md hover:scale-125  hover:px-2 my-2 hover:transition duration-500'><Image  src={wallet} alt='' width={20} height={20} /> <p className='text-[10px] font-semibold font-poppins'>Wallet</p></div>
                         
                          
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