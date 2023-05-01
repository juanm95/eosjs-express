-- CreateTable
CREATE TABLE "EosAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transactionId" BIGINT NOT NULL,
    "accountName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "liquidBalance" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blockNumber" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "eosAccountName" TEXT NOT NULL,
    CONSTRAINT "User_eosAccountName_fkey" FOREIGN KEY ("eosAccountName") REFERENCES "EosAccount" ("accountName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "EosAccount_transactionId_key" ON "EosAccount"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "EosAccount_accountName_key" ON "EosAccount"("accountName");
