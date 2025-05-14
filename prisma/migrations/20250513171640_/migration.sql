/*
  Warnings:

  - You are about to drop the column `country_code` on the `history_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `country_code` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currency_code]` on the table `country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currency_code` to the `history_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency_code` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history_transactions` DROP COLUMN `country_code`,
    ADD COLUMN `currency_code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `country_code`,
    ADD COLUMN `currency_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `country_currency_code_key` ON `country`(`currency_code`);
