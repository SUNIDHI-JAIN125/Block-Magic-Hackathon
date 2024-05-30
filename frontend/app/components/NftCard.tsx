import React, {useContext} from 'react'
import Image from 'next/image'
import nft3 from '../../public/images/nft3.svg'
import { AppContext } from '@/contextAPI'

const NftCard = () => {
  const {modalChoices, setModalChoices} = useContext(AppContext)

  return (
    <div className=' rounded-md bg-primary  my-3 flex flex-col hover:scale-105 transition duration-500 cursor-pointer shadow-xl py-4 px-2 text-white'>
        <Image src={nft3} alt='' className=' rounded-md my-2 mx-auto' />
       <div className=''>
         <p className='text-[10px] font-semibold'>MeeKey NFt #006</p>
        <p className='text-[10px] text-gray-300'>1400 MATIC</p>
       </div>
        <div className='flex space-x-3 '>
        <button className='px-8 py-2 bg-primary-button text-[12px] rounded-sm font-poppins font-semibold' onClick={()=> setModalChoices({...modalChoices, buyNftLiquidityModal:true})}>Buy</button>
        <button className='px-9 py-3 bg-red-500 text-[12px] rounded-sm font-poppins font-semibold' onClick={()=> setModalChoices({...modalChoices, buyNftLiquidityModal:true})}>Sell</button>
          
        </div>
        
    </div>
  )
}


export default NftCard