# Ringle: NFT Automated Market Maker (AMM) 

The rapid evolution of decentralized finance (DeFi) has brought significant attention to the potential of NFTs (Non-Fungible Tokens). However, the NFT market faces challenges such as liquidity, price discovery, and providing a seamless trading experience. Inspired by the principles of Automated Market Makers (AMM) and the need to integrate robust financial tools, we set out to create Ringle, a platform that addresses these challenges and enhances the trading experience for NFTs.


### Getting Started
This project is submitted to the BlockMagic Chainlink Hackathon, details of the same can be seen here - 
Frontend Deployment - https://block-magic-hackathon.vercel.app/

## 🚀 **Setting Up the Project Locally**


### Prerequisites
Node.js (v14 or later)
Yarn or npm
Foundry (for smart contract development)


### Installation


1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ringle-nft-amm.git
   cd ringle-nft-amm
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   yarn install
   # or
   npm install
   ```

3. **Run the frontend:**
    ```bash
    yarn dev
    # or
    npm run dev
    ```
   

4. **Compile the smart contracts:**
    ```bash
    cd ringle-nft-amm
    forge build
    ```
  

5. **Deploy the smart contracts:**
    ```bash
    forge script script/Deploy.s.sol:Deploy --broadcast
     ```
 

## Links to Smart Contract Addresses

Our Platform is deployed on Polygon Cardona(zkEVM) Testnet and Sepolia Testnet


## Polygon 

  NFT__MINTED_ADDRESS= 0x56d63c1d644aD5373B4dEfA5000863b366a99D39
  
  Ringle.sol = 0xE839f863f6ecD4cb9373288Cec8caa03F38E4fB0
  
  Pair.sol = 0x94f482033A5284F91a2a3Cd813474B91dB32a210
  
  explorerUrl: [Visit Polygon Explorer](https://cardona-zkevm.polygonscan.com)

  
  
## Sepolia Testnet


  NFT__MINTED_ADDRESS= 0x846af542138f8194cdc5d2fa7df92aeeb20a9f25
  
  Ringle.sol = 0xdd633270def2fd9086a646261652d31bc8c1cfe6
  
  Pair.sol = 0x02595E42d72FD6347d989f4C24232DeFdF97623D
  
  explorerUrl: [Visit Sepolia EtherScan](https://sepolia.etherscan.io/)

   
  

### Contributing
Contributions to Ringle are welcome! Feel free to report bugs, suggest features, or submit pull requests
