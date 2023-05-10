import { APIClient, Action, PrivateKey, SignedTransaction, Transaction } from '@greymass/eosio';
import { getDefaultProvider, Contract, Wallet, JsonRpcProvider } from 'ethers';
import storageAbi from './storage.abi.json';
import type { AbstractProvider, TransactionResponse, Filter, DeferredTopicFilter } from 'ethers';

interface MintContractInterface {
    name: string;
    description: string;
    image: string;
    ownerId: string;
}

const address = "0xb7902FeB3e4696c33dB8C97d1774027De4041abA";

export class Mint {
    provider: AbstractProvider;
    privateKey: string;
    contract: Contract;
    wallet: Wallet;
    readOnlyContract: Contract;

    constructor() {
        this.provider =  new JsonRpcProvider("https://api.testnet.evm.eosnetwork.com/");
        this.privateKey = "a84d996681c109f99a6b5c559a86a2df94ab138ccbcf409cfd37d262050926df";
        this.wallet = new Wallet(this.privateKey, this.provider);
        this.readOnlyContract = new Contract(address, storageAbi, this.provider);
        this.contract = new Contract(address, storageAbi, this.wallet);
    }

    async storeNumber(value: number) {
        try {
            const blockNumber = await this.provider.getBlockNumber();
            const retrieve = await this.readOnlyContract.retrieve();
            const deployedCode = this.contract.getDeployedCode();
            const transaction: TransactionResponse = await this.contract.store(value);
            const filter: DeferredTopicFilter = this.contract.filters.Stored(this.wallet.address);
            this.contract.once(filter, (from, to, amount, event) => {
                console.log(`from: ${from}, to: ${to}, amount: ${amount}, event: ${event}`);
            });
            return transaction;
        } catch(error) {
            console.log(error);
            return null;
        }
    };

    async mintTokenInstance(userId: number, tokenId: string) {
    };
}