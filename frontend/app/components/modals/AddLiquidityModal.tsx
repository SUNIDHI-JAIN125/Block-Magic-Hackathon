import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '@/contextAPI'
import { ethers } from 'ethers'


const AddLiquidityModal = () => {
    const {modalChoices, setModalChoices,addLiquidity,removeLiquidity} = useContext(AppContext)
    const [formData, setFormData] = useState({
        baseToken:"ETH",
        quoteToken:"USDT",
        baseTokenAmount:0,
        quoteTokenAmount:0
    })


    const handleOnchange = (e:any) => {
        setFormData({...formData,  [e.target.name]: e.target.value  })
        
       
        
    }

    const handleAddLiquidity = async () => {
        await addLiquidity(formData?.baseTokenAmount, formData?.quoteTokenAmount, 2 )
    }

    useEffect(() => {
   
    }, [setFormData])
    



  return (
    <div className='fixed grid h-screen z-20 bg-[#7f777790] place-items-center w-full backdrop-blur-sm"'>
        <div className=' bg-gradient-to-tl from-primary-background to-primary-background w-[400px] h-[320px] rounded-lg text-white shadow-2xl'>
            <div className='flex justify-between px-4 py-2 my-2'>
                <div><p className='text-white font-poppins tracking-[2px]'>Add Liquidity</p></div>
                <button className=' rounded-full px-3 py-1 bg-red-700' onClick={()=>setModalChoices({...modalChoices, addLiquidityModal:false})}>x</button>
            </div>
    
            <div className='flex justify-between px-4 space-x-4 font-poppins text-white'>
                <select name="baseToken" id="" className='bg-transparent border border-white py-2 px-3 w-1/2  rounded-lg text-white font-semibold shadow-2xl ' onChange={(e)=>handleOnchange(e)}>
                    <option className='text-black font-semibold' value={"ETH"}>ETH</option>
                    <option className='text-black font-semibold' value={"MATIC"}>MATIC</option>
                    <option className='text-black font-semibold' value={"SOL"}>SOL</option>

                </select>
                <select name="quoteToken" id="" className='bg-transparent border py-2 px-3 w-1/2  rounded-lg text-white font-semibold shadow-2xl ' onChange={(e)=>handleOnchange(e)}>
                    <option className='text-black font-semibold' value={"USDT"}>USDT</option>
                    <option className='text-black font-semibold' value={"USDC"}>USDC</option>
        
                </select>
            </div>
            <div className='my-2 px-4 font-poppins text-white'>
                <div className='py-3 px-2 bg-transparent shadow-2xl rounded-lg flex items-center justify-between'>
                    <p className=' font-semibold'>{formData?.baseToken}</p>
                    <input type="number" name="baseTokenAmount" min="0" id="" className='border-1  py-1 px-2 text-white w-3/4 bg-transparent outline-none' placeholder='Enter Amount' onChange={(e)=>handleOnchange(e)}/>

                </div>

            </div>
            <div className='my-2 px-4 font-poppins'>
                <div className='py-3 px-2 bg-transparent shadow-2xl rounded-lg flex items-center justify-between'>
                    <p className='text-white font-semibold'>{formData?.quoteToken}</p>
                    <input type="number" name="quoteTokenAmount" min="0" id="" className='border-1  py-1 px-2 text-white w-3/4 bg-transparent outline-none' placeholder='Enter Amount'onChange={(e)=>handleOnchange(e)}/>

                </div>

            </div>
            <div className='px-4'>
            <button className='bg-primary-button px-4 py-2 rounded-sm font-poppins flex w-full justify-center' onClick={()=> handleAddLiquidity()}> Add Liquidity</button>
            </div>
        </div>
      
      
    </div>
  )
}

export default AddLiquidityModal
