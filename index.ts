import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaDatabase } from './prismaDatabase';
import { Mint } from './mint';
const prisma = new PrismaClient()

dotenv.config();

const app = express();
const port = process.env.PORT;
const prismaDatabase = new PrismaDatabase();
const mint = new Mint();

function stringToNumber(string: string): number {
  return parseInt(string);
}

app.post('/v1/store', async (req: Request, res: Response) => {
  try {
    const ammount = req.query['amount'] as string;
    const response = await mint.storeNumber(parseInt(ammount));
    res.json(response);
  } catch (error) {
    res.json(`Error: ${error}`);
  }
});

app.get('/v1/store', async (req: Request, res: Response) => {
  try {
    const response = await mint.getNumber();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(`Error: ${error}`);
  }
});

app.post('/v1/poap/create', async (req: Request, res: Response) => {
  // Pass in name, description, image, creator id and store this in our DB
});

app.get('/v1/poap/get', async (req: Request, res: Response) => {
  // Pass in id and return the POAP
});

app.post('/v1/poap/update', async (req: Request, res: Response) => {
  // Pass in id and updated POAP
});

app.post('/v1/poap/mint', async (req: Request, res: Response) => {
  // Pass in id and address and mint the POAP
});

app.post('/v1/poap/foruser', async (req: Request, res: Response) => {});

// app.get('/v1/info', async (req: Request, res: Response) => {
//   try {
//     const response = await blockChain.getInfo();
//     res.json(response);
//   } catch (error) {
//     res.json(`Error: ${error}`);
//   }
// });

// app.post('/v1/block/account', async (req: Request, res: Response) => {
//   const response = await blockChain.createEosAccount();

//   res.json(response);
// });

// app.get('/v1/block/account', async (req: Request, res: Response) => {
//   const accountAddress = req.query['accountAddress'] as string;
//   const account = await blockChain.getEosAccount(accountAddress);
//   res.json(account);
// });

// app.get('/v1/block/account/status', async (req: Request, res: Response) => {
//   const accountAddress = req.query['accountAddress'] as string;
//   const status = await blockChain.eosAccountIsFinalized(accountAddress);
//   res.json(status);
// });

app.get('/v1/wallet', async (req: Request, res: Response) => {
  const accountName = req.query['accountName'] as string;
  const account = await prismaDatabase.getEosAccount(accountName);
  res.json(account);
});

app.post('/v1/wallet/sign-up', async (req: Request, res: Response) => {
  const accountName = req.query['accountName'] as string;
  const userName = req.query['userName'] as string;
  const account = await prismaDatabase.createEosAccount(accountName, userName);
  res.json(account);
});

app.post('/v1/wallet/exists', async (req: Request, res: Response) => {
  const accountName = req.query['accountName'] as string;
  const account = await prismaDatabase.getEosAccount(accountName);
  res.json(account != null);
});

app.post('/v1/wallet/status', async (req: Request, res: Response) => {
  const accountName = req.query['accountName'] as string;
  const status = await prismaDatabase.getEosAccountStatus(accountName);
  res.json(status);
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)