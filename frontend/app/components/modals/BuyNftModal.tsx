import React, {useContext} from 'react'
import { AppContext } from '@/contextAPI'
import nft from '../../../public/images/nft1.png'
import Image from 'next/image'

const BuyNftModal = () => {
  const {modalChoices, setModalChoices} = useContext(AppContext)
  return (
    <div className='fixed grid h-screen z-20 bg-[#7f777790] place-items-center w-full backdrop-blur-sm'>

      
      
      
      <div className='w-[600px] bg-primary h-[400px] rounded-lg'>
      <div className='flex justify-between px-4 py-2 my-2 space-x-4'>
                <div><p className='text-white font-poppins tracking-[2px]'>Buy Liquidity</p></div>
                <button className=' rounded-full px-3 py-1 bg-red-700' onClick={()=>setModalChoices({...modalChoices, buyNftLiquidityModal:false})}>x</button>
          </div>
     <div className='flex flex-1 px-2  space-x-4'>
        <div className='flex-[0.5]'>
              <Image src={nft} alt=''  className='rounded-lg border-2 w-[300px] h-[300px]'/>

            </div>
            <div className='flex-[0.5]  w-full font-semibold font-poppins flex flex-col justify-between'>
             <div className='text-[12px]'>
              <p className=' font-poppins my-2'>MEEK NFT #7f777790</p>
              <p className='my-2 font-poppins'>Floor Price : 1.80 <span className='text-gray-500'>MATIC</span></p>
              <p className='my-2 font-poppins text-gray-500 font-light'>Creator: XterLabs</p>
              <p className='my-2 text-gray-500 text-[12px] font-light'>You can buy an Nft as a whole or a fraction of the Nft in question. The mininum floor price for this nft is 1.80 MATIC and that is the least amount you can input into the amount field.</p>
             </div>
              <div>
              <input type="number" min="0"  className='my-2 py-3 px-2 rounded-lg bg-transparent border border-white font-light outline-none' placeholder='Enter amount' />
                  <button className='bg-primary-button px-4 py-3 rounded-md w-full'> Buy </button>
              </div>
            </div>
     </div>

      </div>
    
  
    </div>
  )
}

export default BuyNftModal
