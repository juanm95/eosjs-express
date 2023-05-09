import { APIClient, Action, PrivateKey, SignedTransaction, Transaction } from '@greymass/eosio';
import { JsonRpcProvider } from 'ethers/providers';

export class BlockChain {
    client;
    privateKey: PrivateKey;
    actor: string;
    constructor() {
        this.client = new web3("https://api.testnet.evm.eosnetwork.com/").eth;
        this.privateKey = PrivateKey.from("5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"); // this is a test key that's visible in mandel-eosjs so don't panic.
        this.actor = "bobbobbobbob";
    }

    // Does the creator even need to interact with the blockchain/smart contract?
    // Data could be stored entirely in DB.
    async initiateTokenCreation() {};

    async mintTokenInstance(userId: string, tokenId: string) {};
}