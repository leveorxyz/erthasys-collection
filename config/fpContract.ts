import web3 from './web3';

export const PROTOCOL_ADDRESS = '0x7090B5FDFa74998aA17Ad274a24B900E8387637c';
export const PROTOCOL_ABI: any = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'requestedNftName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'requestedNftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'requestedNftOwner',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'requestedNftURI',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'requestedNftExpirationDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'myNftName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'myNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'myNftExpirationDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'myNftURI',
            type: 'string',
          },
        ],
        internalType: 'struct Protocol.tradeRequest',
        name: 'newTrade',
        type: 'tuple',
      },
    ],
    name: 'acceptTradeRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'addBalance',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'reward',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'addClaimableNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'requestTo',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'holdingNftID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'requestingNftID',
        type: 'uint256',
      },
    ],
    name: 'addTradeRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'Address',
        type: 'address',
      },
    ],
    name: 'addUserOnboard',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'burnCarbonCredit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'claimNftId',
        type: 'uint256',
      },
    ],
    name: 'mintNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'fomentToken',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'updatedTotalUnexpiredNfts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'Address',
        type: 'address',
      },
    ],
    name: 'checkUserOnboard',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'Address',
        type: 'address',
      },
    ],
    name: 'getAllUserExceptGivenUser',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getClaimableNfts',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'nftID',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'reward',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'claimableDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'mintingDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Protocol.ClaimableNFT[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMintedNftList',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'nftID',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'reward',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'claimableDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'mintingDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Protocol.ClaimableNFT[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getMintedNftListOfSingleUser',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'nftID',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'reward',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'claimableDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'mintingDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Protocol.ClaimableNFT[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getTradeRequestListofSingleUser',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'requestedNftName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'requestedNftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'requestedNftOwner',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'requestedNftURI',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'requestedNftExpirationDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'myNftName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'myNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'myNftExpirationDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'myNftURI',
            type: 'string',
          },
        ],
        internalType: 'struct Protocol.tradeRequest[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default new web3.eth.Contract(PROTOCOL_ABI, PROTOCOL_ADDRESS);
