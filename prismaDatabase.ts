import { Prisma, PrismaClient } from '@prisma/client';
import { EosAccountStatus, nameCompliance } from './utility';
import { EosAccount } from './eosAccount';

export class PrismaDatabase {
    prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createEosAccount(eosAccountName: string, userName: string) {
        if (!nameCompliance(eosAccountName)) {
            throw new Error('Invalid EOS account name');
        }
        const e: Prisma.EosAccountCreateInput =
        {
            accountName: eosAccountName,
            status: EosAccountStatus.Pending,
            transactionId: 0, // this is potentially not set yet
            users: {
              create: [{ userName }]
            }
          }
        await this.prisma.eosAccount.create({
            data: e,
          })
    }

    async getEosAccount(accountName: string) {
        const eosAccount = await this.prisma.eosAccount.findUnique({
            where: {
              accountName,
            },
          })
        return eosAccount;
    }
    
    async getEosAccountStatus(accountName: string) {
        const eosAccount = await this.prisma.eosAccount.findUnique({
            where: {
              accountName,
            },
          })
        return eosAccount ? eosAccount.status : undefined;
    }

    async updateEosAccount(accountName: string, eosAccount: Partial<EosAccount>) {
        await this.prisma.eosAccount.update({
            where: {
              accountName,
            },
            data: {
                status: eosAccount.status,
                liquidBalance: eosAccount.liquidBalance, // I'm wondering if it makes sense to have this if we have to track it.
                transactionId: eosAccount.transactionId,
                blockNumber: eosAccount.blockNumber,
            },
          });
    }

    async addUserToEosAccount(accountName: string, userName: string) {
        await this.prisma.eosAccount.update({
            where: {
              accountName,
            },
            data: {
              users: {
                create: [{ userName }]
              }
            },
        });
    }
}