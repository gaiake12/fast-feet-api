/*
  Warnings:

  - You are about to drop the column `address` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Recipient` table. All the data in the column will be lost.
  - Added the required column `addressUserId` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "complement",
DROP COLUMN "number",
DROP COLUMN "state",
DROP COLUMN "zipCode",
ADD COLUMN     "addressUserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "recipient_id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("recipient_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_recipient_id_key" ON "Address"("recipient_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
