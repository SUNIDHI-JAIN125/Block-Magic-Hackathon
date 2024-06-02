import React from 'react';

interface Pair {
  nft: string;
  baseToken: string;
  merkleRoot: string;
  liquidityProviderOwner: string;
}

const LiquidityProviderPage: React.FC = () => {
  const liquidityPairs: Pair[] = [
    {
      nft: '0x846AF542138F8194cdC5d2Fa7df92AEEb20a9F25',
      baseToken: '0x0000000000000000000000000000000000000000',
      merkleRoot: '0x894692c90a28cc4bf849bff8a532a09bb3b8e9717f038e677739666def3ba784',
      liquidityProviderOwner: '0x6Ce733B9e2839D96748e77c089F0e5D29B617751',
    },
    
  ];

  return (


    <div className="py-4 px-4 bg-primary-background h-full shadow-2xl">
        <div className='text-white justify-between text-center py-7 text-2xl border-b-2'>  EXISTING LIQUIDITY PAIRS </div>
      <div className="flex justify-between mb-4">
        <div></div>
      </div>

      <table className="w-full bg-transparent my-3 text-[14px] text-white table-fixed top-10 py-4">
        <thead className="border border-white rounded-t-2xl">
          <tr>
            <th className="px-4 py-2">NFT</th>
            <th className="px-4 py-2">Base Token</th>
            <th className="px-4 py-2">Merkle Root</th>
            <th className="px-4 py-2">Liquidity Provider</th>
            <th className="px-4 py-2">Etherscan Link</th>
          </tr>
        </thead>
        <tbody>
          {liquidityPairs.map((pair, index) => (
            <tr key={index} className="">
              <td className="border px-4 py-3 text-center hover:text-blue-500"> <a href="https://sepolia.etherscan.io/address/0x846AF542138F8194cdC5d2Fa7df92AEEb20a9F25">{pair.nft.slice(0, 6)}...{pair.nft.slice(-4)}</a></td>
              <td className="border px-4 py-3 text-center  hover:text-blue-500"><a href="https://sepolia.etherscan.io/address/0x0000000000000000000000000000000000000000">{pair.baseToken.slice(0, 6)}...{pair.baseToken.slice(-4)}</a></td>
              <td className="border px-4 py-3 text-center">{pair.merkleRoot.slice(0, 6)}...{pair.merkleRoot.slice(-4)}</td>
              <td className="border px-4 py-3 text-center">{pair.liquidityProviderOwner.slice(0, 6)}...{pair.liquidityProviderOwner.slice(-4)}</td>
              <td className="border px-4 py-3 text-center">
                <a
                  href={`https://sepolia.etherscan.io/tx/0x8ac74241523308fd3891dd3d3c373213c6a53fec8b82b3b38a9244ddbf238739`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500" 
                  
                >
                  Check on EtherScan
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='text-center text-xl justify-center text-green-400 mt-8 py-5'> <a href="https://sepolia.etherscan.io/token/0x846af542138f8194cdc5d2fa7df92aeeb20a9f25">MAX TOTAL SUPPLY <span className='ml-7 hover:text-blue-300'>1,500
FBAYC TOKENS</span>
</a></div>
    </div>
  );
};

export default LiquidityProviderPage;
