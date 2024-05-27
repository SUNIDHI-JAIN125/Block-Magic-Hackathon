import React, {useContext} from 'react'
import { AppContext } from '@/contextAPI'


const RemoveLiquidityModal = () => {
const {modalChoices, setModalChoices} = useContext(AppContext)
  return (
    <div className='fixed grid h-screen z-20 bg-[#7f777790] place-items-center w-full backdrop-blur-sm"'>
    <div className='bg-primary w-2/4 h-[120px] rounded-md '>
      
        <div className='flex justify-between px-4 py-2'>
            <div><p className='text-white font-poppins tracking-[2px]'>Remove Liquidity</p></div>
            <button className=' rounded-full px-4 py-2 bg-red-700' onClick={()=>setModalChoices({...modalChoices, removeLiquidityModal:false})}>X</button>
        </div>
        <div className='flex justify-between px-4 py-2'>
          
        </div>
    </div>
  
</div>
  )
}

export default RemoveLiquidityModal
