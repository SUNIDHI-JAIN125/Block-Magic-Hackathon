import React, { useContext } from 'react';
import Image, { StaticImageData } from 'next/image';
import { AppContext } from '@/contextAPI';

interface NftCardProps {
  imageSrc: StaticImageData;
  altText: string;
  tokenNo: number;
}

const NftCard: React.FC<NftCardProps> = ({ imageSrc, altText, tokenNo }) => {
  const { modalChoices, setModalChoices } = useContext(AppContext);

  return (
    <a href={`https://sepolia.etherscan.io/nft/0x846af542138f8194cdc5d2fa7df92aeeb20a9f25/${tokenNo}`} target="_blank" rel="noopener noreferrer">
      <div className='rounded-md bg-primary my-6 flex flex-col hover:scale-105 transition duration-500 cursor-pointer shadow-xl py-3  px-3 text-white'>
        <Image src={imageSrc} alt={altText} className='rounded-md my-2 mx-auto' />
        <div className='flex pl-2'>
          <p className='text-[12px] text-gray-100 text-center p-2'>FBAYC</p>
          <p className='text-[12px] text-gray-100 text-center p-2'>#{tokenNo}</p>
        </div>
        <div className='flex space-x-3'>
          <button
            className='px-3 py-2 w-[97%] mx-auto text-center justify-center bg-primary-button text-[14px] rounded-sm font-poppins font-semibold'
            onClick={(e) => { e.preventDefault(); setModalChoices({ ...modalChoices, buyNftLiquidityModal: true, selectedToken: tokenNo }); }}
          >
            Buy
          </button>
        </div>
      </div>
    </a>
  );
};

export default NftCard;
