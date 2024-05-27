import React, {useContext} from 'react'
import nft from '../../../public/images/nft1.png';
import Image from 'next/image';
import NftCard from '../NftCard';
import { AppContext } from '@/contextAPI';

const NftPage = () => {
  const {isConnected} = useContext(AppContext)
  return (
    <div className='bg-primary-background h-screen py-4 px-4 overflow-y-scroll'>
      <div className=' flex justify-between'>
        <div></div>
        <div>
        <w3m-button />
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

export default NftPage