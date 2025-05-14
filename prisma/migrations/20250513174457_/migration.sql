/*
  Warnings:

  - Added the required column `created_at_transaction` to the `history_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at_transaction` to the `history_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_transactions` ADD COLUMN `created_at_transaction` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at_transaction` DATETIME(3) NOT NULL;
