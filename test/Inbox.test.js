const assert = require('assert');
const ganache = require('ganache-cli'); // gives us access to a provider specific to the network
const Web3 = require('web3'); // bringing in a constructor

const web3 = new Web3(ganache.provider());

