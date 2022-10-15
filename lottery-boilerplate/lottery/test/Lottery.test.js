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
});