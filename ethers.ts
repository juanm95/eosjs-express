import { APIClient, Action, PrivateKey, SignedTransaction, Transaction } from '@greymass/eosio';
import { JsonRpcProvider } from 'ethers';

export class BlockChain {
    provider: JsonRpcProvider;
    privateKey: PrivateKey;
    actor: string;
    constructor() {
        this.provider = new JsonRpcProvider("https://api.testnet.evm.eosnetwork.com/");
        this.privateKey = PrivateKey.from("5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"); // this is a test key that's visible in mandel-eosjs so don't panic.
        this.actor = "bobbobbobbob";
    }

    // Does the creator even need to interact with the blockchain/smart contract?
    // Data could be stored entirely in DB.
    async initiateTokenCreation() {};

    async mintTokenInstance(userId: string, tokenId: string) {};
}