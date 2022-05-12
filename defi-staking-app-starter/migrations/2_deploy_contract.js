const { artifacts } = require("truffle");
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');
const Rwd = artifacts.require('Rwd');

module.exports = async function(deployer, network, accounts) {
    // deploy Tether contract
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    // deploy Rwd contract
    await deployer.deploy(Rwd);
    const rwd = await Rwd.deployed();

    // deploy DecentralBank contract
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    // Transfer all Rwd tokens to Decentral Bank (1 milli)
    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    // Distribute 100 Tether tokens to investors
    await tether.transfer(accounts[1], '100000000000000000000')
}
