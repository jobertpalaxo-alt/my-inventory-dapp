export const CONTRACT_ADDRESS = '0xF5813b5EBB07DF03d3734FA435Fe63B00ac7e390' as const

export const INVENTORY_ABI = [
  {
    "type": "function",
    "name": "add_item",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "_name",
        "type": "string",
        "components": null,
        "internalType": null
      },
      {
        "name": "_quantity",
        "type": "uint256",
        "components": null,
        "internalType": null
      },
      {
        "name": "_price",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ],
    "outputs": []
  },
  {
    "type": "event",
    "name": "ItemAdded",
    "inputs": [
      {
        "name": "item_id",
        "type": "uint256",
        "components": null,
        "internalType": null,
        "indexed": true
      },
      {
        "name": "name",
        "type": "string",
        "components": null,
        "internalType": null,
        "indexed": false
      },
      {
        "name": "quantity",
        "type": "uint256",
        "components": null,
        "internalType": null,
        "indexed": false
      },
      {
        "name": "price",
        "type": "uint256",
        "components": null,
        "internalType": null,
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ItemUpdated",
    "inputs": [
      {
        "name": "item_id",
        "type": "uint256",
        "components": null,
        "internalType": null,
        "indexed": true
      },
      {
        "name": "name",
        "type": "string",
        "components": null,
        "internalType": null,
        "indexed": false
      },
      {
        "name": "quantity",
        "type": "uint256",
        "components": null,
        "internalType": null,
        "indexed": false
      },
      {
        "name": "price",
        "type": "uint256",
        "components": null,
        "internalType": null,
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ItemRemoved",
    "inputs": [
      {
        "name": "item_id",
        "type": "uint256",
        "components": null,
        "internalType": null,
        "indexed": true
      }
    ],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "remove_item",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "_id",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ],
    "outputs": []
  },
  {
    "type": "constructor",
    "stateMutability": "nonpayable",
    "inputs": []
  },
  {
    "type": "function",
    "name": "update_item",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "_id",
        "type": "uint256",
        "components": null,
        "internalType": null
      },
      {
        "name": "_name",
        "type": "string",
        "components": null,
        "internalType": null
      },
      {
        "name": "_quantity",
        "type": "uint256",
        "components": null,
        "internalType": null
      },
      {
        "name": "_price",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "get_inventory_value",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "_id",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ]
  },
  {
    "type": "function",
    "name": "get_item",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "_id",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "components": null,
            "internalType": null
          },
          {
            "name": "name",
            "type": "string",
            "components": null,
            "internalType": null
          },
          {
            "name": "quantity",
            "type": "uint256",
            "components": null,
            "internalType": null
          },
          {
            "name": "price",
            "type": "uint256",
            "components": null,
            "internalType": null
          },
          {
            "name": "exists",
            "type": "bool",
            "components": null,
            "internalType": null
          }
        ],
        "internalType": null
      }
    ]
  },
  {
    "type": "function",
    "name": "item_count",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ]
  },
  {
    "type": "function",
    "name": "items",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "arg0",
        "type": "uint256",
        "components": null,
        "internalType": null
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "components": null,
            "internalType": null
          },
          {
            "name": "name",
            "type": "string",
            "components": null,
            "internalType": null
          },
          {
            "name": "quantity",
            "type": "uint256",
            "components": null,
            "internalType": null
          },
          {
            "name": "price",
            "type": "uint256",
            "components": null,
            "internalType": null
          },
          {
            "name": "exists",
            "type": "bool",
            "components": null,
            "internalType": null
          }
        ],
        "internalType": null
      }
    ]
  },
  {
    "type": "function",
    "name": "owner",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "components": null,
        "internalType": null
      }
    ]
  }
] as const