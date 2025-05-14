/*
  Warnings:

  - A unique constraint covering the columns `[invoice]` on the table `history_transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoice]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice` to the `history_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_transactions` ADD COLUMN `invoice` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `invoice` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `history_transactions_invoice_key` ON `history_transactions`(`invoice`);

-- CreateIndex
CREATE UNIQUE INDEX `transactions_invoice_key` ON `transactions`(`invoice`);
