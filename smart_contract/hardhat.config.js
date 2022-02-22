// https://eth-ropsten.alchemyapi.io/v2/SRHRIeZTr59CDVKgiSDk_11-qKq4j3L4

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/SRHRIeZTr59CDVKgiSDk_11-qKq4j3L4',
      accounts: ['b7549365f62a7363735aba2fce94e314d39b531130e04fcb746376792cb045cd']
    }
  }
}