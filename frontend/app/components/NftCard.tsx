import React from 'react'
import Image from 'next/image'
import nft3 from '../../public/images/nft3.svg'

const NftCard = () => {
  return (
    <div className=' rounded-md bg-primary  my-3 flex flex-col hover:scale-105 transition duration-500 cursor-pointer shadow-xl py-4 px-2'>
        <Image src={nft3} alt='' className=' rounded-md my-2 mx-auto' />
       <div className=''>
         <p className='text-[10px] font-semibold'>MeeKey NFt #006</p>
        <p className='text-[10px] text-gray-300'>Xter Labs</p>
       </div>
        <div className='flex space-x-10  my-1'>
            <div className=''>
                <p className='text-[10px] font-semibold'>Floor Price</p>
                <p className='text-[8px] text-gray-400'>1500 MATIC</p>
            </div>
            <button className='px-2 bg-primary-button text-[8px] rounded-sm font-poppins font-semibold'>Place A Bid</button>
        </div>
        
    </div>
  )
}

export default NftCard