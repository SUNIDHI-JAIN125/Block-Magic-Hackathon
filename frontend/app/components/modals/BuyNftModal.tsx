import React, { useContext, useState } from 'react';
import { AppContext } from '@/contextAPI'
import nft from '../../../public/images/nft1.png'
import Image from 'next/image'

const BuyNftModal = () => {
  const { modalChoices, setModalChoices, buy } = useContext(AppContext);

  const [tokenIds, setTokenIds] = useState("");
  const [maxinputAmount, setMaxInputAmount] = useState("");
 

  const handleBuy = async () => {
    await buy(tokenIds, maxinputAmount);
    setModalChoices((prevState:any) => ({ ...prevState, buyNftLiquidityModal: false }));
  };

  return (
    <div className='fixed grid h-screen z-20 bg-[#7f777790] place-items-center w-full backdrop-blur-sm text-white'>
      <div className='w-[600px] bg-primary h-[500px] rounded-lg'>
        <div className='flex justify-between px-4 py-2 my-2 space-x-4'>
          <div><p className='text-white font-poppins tracking-[2px]'>Buy NFT</p></div>
          <button className='rounded-full px-3 py-1 bg-red-700' onClick={() => setModalChoices({ ...modalChoices, buyNftLiquidityModal: false })}>x</button>
        </div>
        <div className='flex flex-1 px-2 space-x-4'>
          <div className='flex-[0.5]'>
            <Image src={nft} alt='' className='rounded-lg border-2 w-[300px] h-[300px]' />
          </div>
          <div className='flex-[0.5] w-full font-semibold font-poppins flex flex-col justify-between'>
            <div>
              <input
                type="number"
                min="0"
                className='my-2 py-3 px-2 rounded-lg bg-transparent border border-white font-light outline-none'
                placeholder='Enter TokenIds you want to buy'
                value={tokenIds}
                onChange={(e) => setTokenIds(e.target.value)}
              />
              <input
                type="number"
                min="0"
                className='my-2 py-3 px-2 rounded-lg bg-transparent border border-white font-light outline-none'
                placeholder='Enter maximum input amount'
                value={maxinputAmount}
                onChange={(e) => setMaxInputAmount(e.target.value)}
              />
              <button className='bg-primary-button px-4 py-3 rounded-md w-full' onClick={handleBuy}>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyNftModal
