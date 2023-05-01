import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const eosAccounts: Prisma.EosAccountCreateInput[] = [
  {
    accountName: 'prismaticaly',
    status: 'finalized',
    blockNumber: 123456,
    transactionId: 1234567890,
    liquidBalance: '1.0000 EOS',
    users: {
      create: [
        {
          userName: "XxprismaticalyxX"
        },
        {
          userName: "--prismatically--"
        }
      ]
    }
  },
  {
    accountName: 'eosfan121212',
    status: 'pending',
    blockNumber: 123456,
    transactionId: 1234567892,
    liquidBalance: '0.0000 EOS',
    users: {
      create: [
        {
          userName: "eosfan121212"
        }
      ]
    }
  },
  {
    accountName: 'moneybags123',
    status: 'pending',
    blockNumber: 123457,
    transactionId: 1234567990,
    liquidBalance: '12.0000 EOS',
    users: {
      create: [
        {
          userName: "$moneybags$"
        },
        {
          userName: "$moneybags$"
        },
        {
          userName: "$moneybags$"
        },
        {
          userName: "$moneybags$"
        }
      ]
    }
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const e of eosAccounts) {
    const account = await prisma.eosAccount.create({
      data: e,
    })
    console.log(`Created account with id: ${account.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })