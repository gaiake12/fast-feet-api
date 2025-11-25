/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recipient_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the `Recipient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[receiver_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiver_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_recipient_id_fkey";

-- DropIndex
DROP INDEX "public"."Address_recipient_id_key";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "recipient_id",
ADD COLUMN     "receiver_id" TEXT NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("receiver_id");

-- DropTable
DROP TABLE "public"."Recipient";

-- CreateTable
CREATE TABLE "Receiver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addressUserId" TEXT NOT NULL,

    CONSTRAINT "Receiver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receiver_email_key" ON "Receiver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_receiver_id_key" ON "Address"("receiver_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Receiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
