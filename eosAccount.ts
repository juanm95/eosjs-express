export interface EosAccount {
    transactionId: bigint;
    accountName: string;
    status: EosAccountStatus;
    liquidBalance: string;
    createdAt: string;
    blockNumber: bigint;
}

export enum EosAccountStatus {
    Pending = 'pending',
    Finalized = 'finalized'
}