// assert library from Node.js
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// provider helps us connect to any network
const web3 = new Web3(ganache.provider());


// an object has interface & bytecode
const {interface, bytecode} = require('../compile');

let lottery;
let accounts;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from: accounts[0],gas:'1000000'})
});

describe('Lottery Contract', () => {
    // it statement attempt to test some different aspect of
    // a contract to make sure its successfully deployed
    it('deploys a contract', () => {
        // make sure some values are defined
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async ()=> {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.towei('0.02', 'ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0],players[0]);
        assert.equal(1,players.length);
    
    });



    it('allows multiple accounts to enter', async ()=> {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.towei('0.02', 'ether')
        });
    
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.towei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.towei('0.02', 'ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);

        assert.equal(3,players.length);
    
    });

});