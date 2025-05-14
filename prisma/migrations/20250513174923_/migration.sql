/*
  Warnings:

  - Added the required column `username_game` to the `history_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username_game` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_transactions` ADD COLUMN `username_game` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `username_game` VARCHAR(191) NOT NULL;
