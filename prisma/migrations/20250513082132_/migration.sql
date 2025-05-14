/*
  Warnings:

  - Added the required column `fee` to the `prefix_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prefix_code` ADD COLUMN `fee` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `status_payment` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID';
