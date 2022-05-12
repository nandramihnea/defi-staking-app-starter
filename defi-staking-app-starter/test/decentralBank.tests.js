const { artifacts } = require("truffle");
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');
const Rwd = artifacts.require('Rwd');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank;

    function tokens(number) {
        return web3.utils.toWei(number, 'ether');
    }

    before(async() => {
        // Load contracts
        tether = await Tether.new();
        rwd = await Rwd.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        // Transfer all Rwd tokens to Decentral Bank (1 milli)
        await rwd.transfer(decentralBank.address, tokens('1000000'));

        // Transfer 100 Tether tokens to Customer(investor)
        await tether.transfer(customer, tokens('100'), { from: owner });
    });

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'Mock Tether');
        })
    });

    describe('Reward Token Deployment', async() => {
        it('matches the name successfully', async() => {
            const name = await rwd.name();
            assert.equal(name, 'Reward Token');
        });

        it('matches the symbol correctly', async() => {
            const symbol = await rwd.symbol();
            assert.equal(symbol, 'RWD');
        })
    });

    describe('Decentral Bank Deployment', async() => {
        it('matches the name successfully', async() => {
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank of America');
        });

        it('Contract has tokens', async() => {
            let  balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens('1000000'));
        })
    });

    describe('Yield Farming Test', async() => {
        it('rewards tokens for staking', async() => {
            let result;

            // Check Investor balance before staking
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet before staking');

            // Check staking for customer
            // simulate approval
            await tether.approve(decentralBank.address, tokens('100'), { from: customer });
            // deposit 100 Tether tokens for staking
            await decentralBank.depositTokens(tokens('100'), { from: customer });

            // check updated balance for customer
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(), tokens('0'), 'customer mock wallet after staking');

            // check that decentralBank balance is updated
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentralBank mock wallet after staking');

            // check that the staking status is updated
            result = await decentralBank.isStaking(customer);
            assert.equal(result.toString(), 'true', 'customer is staking');

            // Issue rewards
            await decentralBank.issueTokens({from: owner});

            // Ensure only the owner can issue rewards
            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            // check that unstaking works
            await decentralBank.unstakeTokens({from: customer});

            // check that unstaking status is updated
            result = await decentralBank.isStaking(customer);
            assert.equal(result.toString(), 'false', 'customer is not staking anymore');

            // check that the customer balance is updated
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet after unstaking');

            // check that decentralBank balance is updated
            result = await tether.balanceOf(decentralBank.address);
            assert.equal(result.toString(), tokens('0'), 'decentralBank mock wallet after unstaking');
        })
    });
});
