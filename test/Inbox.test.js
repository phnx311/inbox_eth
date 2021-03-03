const assert = require('assert');
const ganache = require('ganache-cli'); // gives us access to a provider specific to the network;
const Web3 = require('web3'); // bringing in a constructor
const provider = ganache.provider();
const web3 = new Web3(provider);
const { bytecode, interface } = require('../compile');

let accounts;
const INITIAL_STRING = 'Hi There'

beforeEach(async () => {
    //get a list of all local test accounts from ganache
    accounts = await web3.eth.getAccounts();
    //use one of them to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000'})
    
    //provider is passed into the web3 instance and set on the contract instance itself    
    inbox.setProvider(provider) //remember providers are sort of the specifice key for web3 to interact with a given network
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); //check to see that an address was assigned meaning it was deployed properly
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call(); //console.log shows message returns an object with various methods including call
        assert.strictEqual(message, INITIAL_STRING);
    })
})