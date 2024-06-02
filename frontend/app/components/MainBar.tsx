import React, { useContext } from 'react';
import Image from 'next/image';
import nft from '../../public/images/nft1.png';
import { StaticImageData } from 'next/image';
import NftCard from './NftCard';
import { AppContext } from '@/contextAPI';
import nft3 from '../../public/images/nft3.svg';
import nft4 from '../../public/images/nft4.svg';
import nft2 from '../../public/images/nft2.svg';
import nft5 from '../../public/images/nft5.png';
import nft6 from '../../public/images/nft6.png';
import nft7 from '../../public/images/nft7.png';
import nft8 from '../../public/images/nft8.png';


interface NftData {
  src: StaticImageData;
  alt: string;
  tokenNo: number;
}

const nftData: NftData[] = [
  { src: nft2, alt: 'NFT 2', tokenNo: 1499 },
  { src: nft3, alt: 'NFT 3', tokenNo: 1498},
  { src: nft5, alt: 'NFT 5', tokenNo: 1497},
  { src: nft6, alt: 'NFT 6', tokenNo: 1496 },
  { src: nft7, alt: 'NFT 7', tokenNo: 1495 },  
  { src: nft8, alt: 'NFT 8', tokenNo: 1494 },
  { src: nft4, alt: 'NFT 4', tokenNo: 1493 },
];

const MainBar = () => {
  const {isConnected} = useContext(AppContext)
  return (
    <div className='bg-primary-background h-screen py-4 px-4 overflow-y-scroll'>
      <div className=' flex justify-between'>
        <div></div>
        <div>
        <w3m-button />
        </div>
      </div>

      <div className='rounded-lg shadow-lg bg-gradient-to-r from-primary-blend to-primary-background  mt-4 flex flex-1'>
        {/* Image div */}
        <div className='flex-[0.5] ml-10'><Image src={nft} alt='' width={300} height={300} className='rounded-full w-3/5 hover:scale-100'/></div>
        {/* Text DIV */}
        <div className='mr-5 mt-10 flex-[0.5]'>
          <p className={`${isConnected ? 'text-[50px]': 'text-[80px]'}  font-semibold font-poppins text-white`}>XRingle  <span className='text-[#cc41ff]'> NFT</span></p>
          <p className='my-2 text-gray-300 text-[20px]'>Why give anybody the right to decide the prices of your favorite NFTs? </p>
          <p className='my-2 text-gray-300 text-[20px]'> Let AMM do that..</p>
          <div className='flex space-x-4 mt-12'>
            <div className='flex justify-between space-x-4'>
              <Image src={nft} alt='' className='w-[50px] h-[50px] rounded-full border border-gray-400' />
              <div className='flex flex-col mt-2'>
                <p className='text-[10px] font-poppins my-[1px] text-gray-400'>Creator</p>
                <p className='text-[10px] font-semibold text-white'> SONA125</p>
              </div>
            </div>
          </div>
          <div className='mt-8 flex space-x-4'>
            <button className='px-4 py-2 bg-primary-button font-poppins text-[10px] rounded-sm text-white'>Place A Bid</button>
            <button className='px-4 py-2 bg-primary font-poppins text-[10px] rounded-sm font-semibold border-[1px] text-white'>View Item</button>
          </div>
        </div>

      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {nftData.map((nft, index) => (
          <NftCard key={index} imageSrc={nft.src} altText={nft.alt} tokenNo={nft.tokenNo} />
        ))}
      </div>

      {/* <Modal /> */}
    </div>
  )
}

export default MainBar