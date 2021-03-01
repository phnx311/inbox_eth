const assert = require('assert');
const ganache = require('ganache-cli'); // gives us access to a provider specific to the network;
const Web3 = require('web3'); // bringing in a constructor
const web3 = new Web3(ganache.provider());
const { bytecode, interface } = require('../compile');

let accounts;

beforeEach(async () => {
    //get a list of all account
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there'] })
        .send({ from: accounts[0], gas: '1000000'})
    //use one of them to deploy the contract
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    })
})