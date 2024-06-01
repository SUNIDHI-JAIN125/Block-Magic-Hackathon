import PairContractABI from './walletServices/abis/pair.abi.json'
import RingleContractABI from './walletServices/abis/ringle.abi.json'
import MathLibContractABI from './walletServices/abis/mathLib.abi.json'





export const pairABI = PairContractABI
export const ringleABI = RingleContractABI
export const mathLibABI = MathLibContractABI

export const ringleContractAddress = ""
export const pairContractAddress = "0xdd633270def2fd9086a646261652d31bc8c1cfe6"
export const mathLibContractAddress = ""


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
    rpcUrl: 'https://rpc.sepolia.org'

}

