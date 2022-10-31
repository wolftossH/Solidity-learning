import web3 from './web3';

const address = '0xdeFdf1396075106cA9adb4bb9Dec12Ad36114493'

const abi = [
    {
        inputs: [], stateMutability: 'nonpayable', type: 'constructor'
    },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'manager',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [{
            internalType: 'uint256', name: '', type: 'uint256'
        }],
        name: 'players',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    }
];

export default new web3.eth.Contract(abi, address);

