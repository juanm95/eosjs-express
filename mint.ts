import { APIClient, Action, PrivateKey, SignedTransaction, Transaction } from '@greymass/eosio';
import { getDefaultProvider, Contract, Wallet } from 'ethers';
import storageAbi from './storage.abi.json';
import type { AbstractProvider } from 'ethers';

interface MintContractInterface {
    name: string;
    description: string;
    image: string;
    ownerId: string;
}

const storageByteCode = "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea264697066735822122039cf57f38f3849610ea2190eef80d5b73f464023145b64045b440f48b459ac3d64736f6c63430008120033"
const address = "0x94E6e283643a223d65aDAf9268ed0A98A52484db";

export class Mint {
    provider: AbstractProvider;
    privateKey: string;
    contract: Contract;
    wallet: Wallet;

    constructor() {
        this.provider = getDefaultProvider("https://api.testnet.evm.eosnetwork.com/");
        this.privateKey = "a84d996681c109f99a6b5c559a86a2df94ab138ccbcf409cfd37d262050926df";
        this.wallet = new Wallet(this.privateKey, this.provider);
        this.contract = new Contract(address, storageAbi, this.wallet);
    }

    async mintTokenInstance(userId: string, tokenId: string) {
        storageWithSigner.
    };
}