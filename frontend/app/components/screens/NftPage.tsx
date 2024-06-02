import React, { useContext, useState } from 'react';
import { AppContext } from '@/contextAPI';
import NftCard from '../NftCard';
import nft3 from '../../../public/images/nft3.svg';
import nft4 from '../../../public/images/nft4.svg';
import nft2 from '../../../public/images/nft2.svg';
import nft5 from '../../../public/images/nft5.png';
import nft6 from '../../../public/images/nft6.png';
import nft7 from '../../../public/images/nft7.png';
import nft8 from '../../../public/images/nft8.png';
import { StaticImageData } from 'next/image';
import nft from '../../../public/images/nft1.png'
import Image from 'next/image'


interface NftData {
  src: StaticImageData;
  alt: string;
  tokenNo: number;
}

const nftData: NftData[] = [
  { src: nft2, alt: 'NFT 2', tokenNo: 1499 },
  { src: nft3, alt: 'NFT 3', tokenNo: 1498 },
  { src: nft5, alt: 'NFT 5', tokenNo: 1497 },
  { src: nft6, alt: 'NFT 6', tokenNo: 1496 },
  { src: nft7, alt: 'NFT 7', tokenNo: 1495 },
  { src: nft8, alt: 'NFT 8', tokenNo: 1494 },
  { src: nft4, alt: 'NFT 4', tokenNo: 1493 },
];

const NftPage= () => {
  const { isConnected, modalChoices, setModalChoices, sellNft } = useContext(AppContext);
  const [sellModalOpen, setSellModalOpen] = useState(false);

  const openSellModal = () => {
    setModalChoices({ ...modalChoices, SellNftModal: true });
    setSellModalOpen(true);
  };

  const closeSellModal = () => {
    setModalChoices({ ...modalChoices, SellNftModal: false });
    setSellModalOpen(false);
  };



  const [tokenIds, setTokenIds] = useState("");
  const [minoutputAmount, setMinOutputAmount] = useState("");
  const [proofs, setProofs] = useState("");
 

  const handleSell = async () => {
    await sellNft(tokenIds, minoutputAmount, proofs);
    // setModalChoices((prevState:any) => ({ ...prevState, buyNftLiquidityModal: false }));
  };

  return (
    <div className='bg-primary-background h-screen py-4 px-4 overflow-y-scroll'>
      <div className='flex justify-between'>
        <div></div>
        <div>
          <w3m-button />
        </div>
      </div>

      <button
        className='px-3 py-2 w-max-content mx-auto text-center justify-center bg-primary-button text-[14px] rounded-sm font-poppins font-semibold text-white'
        onClick={(e) => { e.preventDefault(); openSellModal(); }}
      >
        Sell NFT
      </button>

      {sellModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-[#7f777790] backdrop-blur-sm text-white rounded-lg'>
            <div className='w-[600px] bg-primary h-[500px] rounded-lg'>
              <div className='flex justify-between px-4 py-2 my-2 space-x-4'>
                <div>
                  <p className='text-white font-poppins tracking-[2px]'>Sell NFT</p>
                </div>
                <button
                  className='rounded-full px-3 py-1 bg-red-700'
                  onClick={() => closeSellModal()}
                >
                  x
                </button>
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
                placeholder='Enter TokenIds you want to sell'
                value={tokenIds}
                onChange={(e) => setTokenIds(e.target.value)}
              />
              <input
                type="number"
                min="0"
                className='my-2 py-3 px-2 rounded-lg bg-transparent border border-white font-light outline-none'
                placeholder='Please provide Minimum Output Amount '
                value={minoutputAmount}
                onChange={(e) => setMinOutputAmount(e.target.value)}
              />
               <input
                type="number"
                min="0"
                className='my-2 py-3 px-2 rounded-lg bg-transparent border border-white font-light outline-none'
                placeholder='Please provide Merkle Proofs'
                value={proofs}
                onChange={(e) => setProofs(e.target.value)}
              />
              <button className='bg-primary-button px-4 py-3 rounded-md w-full' onClick={handleSell}>Sell NFT</button>
            </div>
          </div>
        </div>
            </div>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {nftData.map((nft, index) => (
          <NftCard key={index} imageSrc={nft.src} altText={nft.alt} tokenNo={nft.tokenNo} />
        ))}
      </div>
    </div>
  );
};

export default NftPage;
