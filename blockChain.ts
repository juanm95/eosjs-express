import { APIClient } from '@greymass/eosio';

class BlockChain {
    client: APIClient;
    constructor() {
        this.client = new APIClient({
            url: 'https://jungle4.cryptolions.io/',
        });
    }
    async createEosAccount(accountName: string) {}
    async eosAccountIsFinalized(accountName: string) {
        const account = this.getEosAccount(accountName);
        return account != null;
    }
    async getEosAccount(accountName: string) {
        return await this.client.v1.chain.get_account(accountName);
    }
    async getTransactionStatus(transactionId: string) {
        return await this.client.v1.chain.get_transaction_status(transactionId);
    }
}