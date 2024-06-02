import PairContractABI from './walletServices/abis/pair.abi.json'
import RingleContractABI from './walletServices/abis/ringle.abi.json'
import MathLibContractABI from './walletServices/abis/mathLib.abi.json'
import MintedNFTABI from './walletServices/abis/mintednft.abi.json'





export const pairABI = PairContractABI
export const ringleABI = RingleContractABI
export const mathLibABI = MathLibContractABI
export const mintednftABI = MintedNFTABI

export const ringleContractAddress = "0xdd633270def2fd9086a646261652d31bc8c1cfe6"
export const pairContractAddress = "0x02595E42d72FD6347d989f4C24232DeFdF97623D"
export const mathLibContractAddress = "0x4590ca3ce4acc2a7e915d2293fcfd86319481f27"
export const mintedNftContractAddress = "0x846af542138f8194cdc5d2fa7df92aeeb20a9f25"


export const mainnet = {

    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'

}



export const Sepolia = {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io/',
    rpcUrl: 'https://rpc-sepolia.rockx.com'

}

