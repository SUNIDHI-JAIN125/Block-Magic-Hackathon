/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")
const fs =  require("fs")
const privateKey = fs.readFileSync(".secret").toString()

const projectId = "8507b38c4203434bbdf100d9d532f256"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}