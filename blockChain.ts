import { APIClient, Action, PrivateKey, SignedTransaction, Transaction } from '@greymass/eosio';

class BlockChain {
    client: APIClient;
    privateKey: PrivateKey;
    actor: string;
    constructor() {
        this.client = new APIClient({
            url: 'https://jungle4.cryptolions.io/',
        });
        this.privateKey = PrivateKey.from("5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"); // this is a test key that's visible in mandel-eosjs so don't panic.
        this.actor = "bobbobbobbob";
    }
    async createEosAccount(accountName: string) {
        const info = await this.client.v1.chain.get_info()
        const header = info.getTransactionHeader()
        const action = Action.from({
            authorization: [
                {
                    actor: this.actor,
                    permission: 'active',
                },
            ],
            account: accountName,
            name: 'transfer',
            data: {
                eosAccountName: accountName,
            },
        })
        const transaction = Transaction.from({
            ...header,
            actions: [action],
        })
        const privateKey = PrivateKey.from('5JW71y3njNNVf9fiGaufq8Up5XiGk68jZ5tYhKpy69yyU9cr7n9')
        const signature = privateKey.signDigest(transaction.signingDigest(info.chain_id));
        const signedTransaction = SignedTransaction.from({
            ...transaction,
            signatures: [signature],
        })
        const result = await this.client.v1.chain.push_transaction(signedTransaction)
    }
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