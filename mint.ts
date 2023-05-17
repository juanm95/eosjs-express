import { Contract, Wallet, JsonRpcProvider } from 'ethers';
import storageAbi from './storage.abi.json';
import type { TransactionResponse } from 'ethers';

const address = "0xb7902FeB3e4696c33dB8C97d1774027De4041abA";

export class Mint {
    provider: JsonRpcProvider;
    privateKey: string;
    contract: Contract;
    wallet: Wallet;
    readOnlyContract: Contract;

    constructor() {
        this.provider =  new JsonRpcProvider("https://api.testnet.evm.eosnetwork.com/", undefined, { batchMaxCount: 1 });
        this.privateKey = "a84d996681c109f99a6b5c559a86a2df94ab138ccbcf409cfd37d262050926df";
        this.wallet = new Wallet(this.privateKey, this.provider);
        this.readOnlyContract = new Contract(address, storageAbi, this.provider);
        this.contract = new Contract(address, storageAbi, this.wallet);
    }

    async storeNumber(value: number) {
        try {
            const transaction: TransactionResponse = await this.contract.store(value); // store is the name of a method on the ABI.
            
            return await transaction.wait();
        } catch(error) {
            console.log(error);
            return null;
        }
    };

    async getNumber() {
        try {
            const value = await this.readOnlyContract.retrieve();
            return value;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
}