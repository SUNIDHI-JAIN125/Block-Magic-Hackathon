import React, { useContext, useState } from 'react'
import { AppContext } from '@/contextAPI'

const GamePage = () => {
  const {modalChoices, setModalChoices, gameNumber, setGameNumber} = useContext(AppContext)
  const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const [choosen, setChoosen] = useState(0)
  return (
    <div className='bg-primary h-full px-4 py-4 flex flex-col justify-center text-white'>
      <div className='w-1/2  shadow-[250px] border border-white  bg-transparent rounded-lg  mx-auto py-2 px-4'>
        <p className='text-white font-semibold items-center text-[10px] my-4'>You are to choose a random number and if what you choose is same with what the system generated,you will claim an NFT. Goodluck!!</p>
        <p className='my-2 flex mx-auto font-poppins font-bold'>You chose : {gameNumber}</p>
        <div className='grid grid-cols-5'>
          {numbers?.map((e, index)=> <div  key={index} className={`${gameNumber === e ? 'bg-primary-button': ''} rounded-lg border border-white flex justify-center py-4 my-2 mx-2 hover:bg-primary-button cursor-pointer hover:scale-125`} onClick={()=>setGameNumber(e)}>
            <p className=' font-spacegrotesk font-bold text-[20px]'>{e}</p>
          </div>)}
        </div>

        <button className='bg-primary-button w-full flex py-2 rounded-lg font-poppins my-3 justify-center' onClick={()=>setModalChoices({...modalChoices, gameModal:true})}>Submit</button>

      </div>
    </div>
  )
}

export default GamePage
