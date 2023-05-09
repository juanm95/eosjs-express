import { APIClient, Action, PrivateKey, SignedTransaction, Transaction } from '@greymass/eosio';
import web3 from 'web3';

export class BlockChain {
    client;
    privateKey: PrivateKey;
    actor: string;
    constructor() {
        this.client = new web3("https://api.testnet.evm.eosnetwork.com/");
        this.privateKey = PrivateKey.from("5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"); // this is a test key that's visible in mandel-eosjs so don't panic.
        this.actor = "bobbobbobbob";
    }
    async getInfo() {
        return await this.client.eth.getNodeInfo();
    }
    async createEosAccount() {
        try {
            const newAccount = await this.client.eth.accounts.create();
            return newAccount;
        } catch (error) {
            return null;
        }
    }

    async eosAccountIsFinalized(accountAddress: string) {
        try {
            const balance = await this.client.eth.getBalance(accountAddress);
            return balance != "";
          } catch (error) {
            return false;
          }
    }

    async getEosAccount(accountAddress: string) {
        accountAddress = accountAddress.toLowerCase();
        try {
            const accounts = await this.client.eth.getAccounts();
            return accounts.find((account) => account.toLowerCase() == accountAddress);
        } catch (error) {
            return null;
        }
    }

    async getTransactionStatus(transactionId: string) {
        return {};
    }
}