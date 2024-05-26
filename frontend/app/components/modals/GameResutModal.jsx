import React, {useContext} from 'react'
import { AppContext } from '@/contextAPI';
import Lottie from "lottie-react";
import safFace from '../../../public/lottie/sadface.json'
import celebrate from '../../../public/lottie/celebrate.json'
const GameResutModal = () => {
    const {modalChoices, setModalChoices, gameNumber, setGameNumber} = useContext(AppContext)
    return (
        <div className='fixed grid h-screen z-20 bg-[#7f777790] place-items-center w-full backdrop-blur-sm'>
            {gameNumber % 2 == 0 ?<div className="w-1/4 border bg-primary-background h-[300px] rounded-lg flex flex-col justify-center items-center">
                <Lottie animationData={safFace} loop={true} className="w-2/5"/>
                <p className='text-[12px]'>Sorry, you failed this time.</p>
                <button className="my-3 bg-primary-button rounded-md px-4 py-2 font-poppins font-semibold text-[12px]" onClick={()=>setModalChoices({...modalChoices, gameModal:false})}>Try again</button>
                
            </div>
            
        : <div className='w-full mx-auto flex flex-col justify-center items-center'>
            <Lottie animationData={celebrate} loop={true} className="w-1/4"/>
            <p>Congrats, You chose right!!</p>
            <button className="my-3 bg-primary-button rounded-md px-4 py-2 font-poppins font-semibold text-[12px] w-1/4 " onClick={()=>setModalChoices({...modalChoices, gameModal:false})}>Claim Nft</button>
        </div>
        }

        </div>
    )
}

export default GameResutModal
