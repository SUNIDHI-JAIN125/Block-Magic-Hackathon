import React from 'react'
import NftCard from '../NftCard'

const CollectionsPage = () => {
  return (
    <div className='bg-primary-background h-screen py-4 px-4 overflow-y-scroll'>
    <div className=' flex justify-between'>
  
      <p className='font-poppins'>Your NFT Collections</p>
      <w3m-button />
   
    </div>
    <p className="text-[12px]">The list of nfts you own and co-own</p>
  
    <div className='grid grid-cols-5'>
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
    </div>
  </div>
  )
}

export default CollectionsPage