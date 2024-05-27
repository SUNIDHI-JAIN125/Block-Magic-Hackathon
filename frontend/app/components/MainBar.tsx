import React, {useContext} from 'react'
import nft from '../../public/images/nft1.png';
import Image from 'next/image';
import { ImageError } from 'next/dist/server/image-optimizer';
import NftCard from './NftCard';
import { AppContext } from '@/contextAPI';

const MainBar = () => {
  const {isConnected} = useContext(AppContext)
  return (
    <div className='bg-primary-background h-screen py-4 px-4 overflow-y-scroll'>
      <div className=' flex justify-between'>
        <div></div>
        <div>
        <w3m-button />
        </div>
      </div>

      <div className='rounded-lg shadow-lg bg-gradient-to-r from-primary-blend to-primary-background  mt-4 flex flex-1'>
        {/* Image div */}
        <div className='flex-[0.5] ml-10'><Image src={nft} alt='' width={300} height={300} className='rounded-full w-3/5 hover:scale-100'/></div>
        {/* Text DIV */}
        <div className='mr-5 mt-5 flex-[0.5]'>
          <p className={`${isConnected ? 'text-[50px]': 'text-[80px]'}  font-semibold font-poppins text-white`}>XterioMask NFT</p>
          <p className='my-2 text-gray-400 text-[10px]'>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry </p>
          <div className='flex space-x-4'>
            <div className='flex justify-between space-x-4'>
              <Image src={nft} alt='' className='w-[50px] h-[50px] rounded-full border border-gray-400' />
              <div className='flex flex-col mt-2'>
                <p className='text-[10px] font-poppins my-[1px] text-gray-400'>Creator</p>
                <p className='text-[10px] font-semibold text-white'>Layer Lab</p>
              </div>
            </div>
            <div className='flex justify-between space-x-4'>
              <Image src={nft} alt='' className='w-[50px] h-[50px] rounded-full border border-gray-400' />
              <div className='flex flex-col mt-2'>
                <p className='text-[10px] font-poppins my-[1px] text-gray-400'>Owner</p>
                <p className='text-[10px] font-semibold text-white'>Xter Lab</p>
              </div>
            </div>
          </div>
          <div className='mt-5 flex space-x-4'>
            <button className='px-4 py-2 bg-primary-button font-poppins text-[10px] rounded-sm font-semibold text-white'>Place A Bid</button>
            <button className='px-4 py-2 bg-primary font-poppins text-[10px] rounded-sm font-semibold border-[1px] text-white'>View Item</button>
          </div>
        </div>

      </div>
      <div className='grid grid-cols-5'>
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
      </div>
    </div>
  )
}

export default MainBar