import React, {useContext} from 'react'
import { AppContext } from '@/contextAPI'

const LiquidityProviderPage = () => {

     const {modalChoices, setModalChoices,} = useContext(AppContext)

  return (
    <div className='py-4 px-4 bg-primary-background h-full shadow-2xl'>
        <div className=' flex justify-between'>
            <div></div>
            <button className='px-4 py-2 bg-primary-button text-white font-poppins text-[10px] rounded-sm font-semibold' onClick={()=> setModalChoices({...modalChoices, addLiquidityModal:true}) }>Add Liquidity</button>
        </div>

   
        <table className=" w-full bg-transparent my-3 text-[12px] text-white ">
                <thead className=" border border-white rounded-t-2xl">
                    <tr>
                        <th className="px-4 py-2">Liquidity Pairs</th>
                        <th className="px-4 py-2">Yield</th>
                        <th className="px-4 py-2">Total supply</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                
                    <tr className="">
                    <td className="border px-2 py-2">SCOTCH/USD</td>
                    <td className="border px-2 py-2">12%</td>
                    <td className="border px-2 py-2">112</td>
                    <td className="border px-2 py-2"><button className='px-2 py-2 text-[10px] bg-primary-button font-semibold rounded-sm' onClick={()=> setModalChoices({...modalChoices, removeLiquidityModal:true})} >Remove Liquidty</button></td>
                    </tr>
                    

                    
                    

                </tbody>
            </table>

   
      
    </div>
  )
}

export default LiquidityProviderPage
