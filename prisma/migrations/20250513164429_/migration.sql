/*
  Warnings:

  - You are about to alter the column `total` on the `history_transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fee` on the `history_transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `country_exchange` on the `history_transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `country_exchange` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `price` to the `history_transactions` table without a default value. This is not possible if the table is not empty.
  - Made the column `prefix_code_id` on table `history_transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prefix_code_id` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `history_transactions` DROP FOREIGN KEY `history_transactions_prefix_code_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_prefix_code_id_fkey`;

-- DropIndex
DROP INDEX `history_transactions_prefix_code_id_fkey` ON `history_transactions`;

-- DropIndex
DROP INDEX `transactions_prefix_code_id_fkey` ON `transactions`;

-- AlterTable
ALTER TABLE `history_transactions` ADD COLUMN `price` DOUBLE NOT NULL,
    MODIFY `total` DOUBLE NOT NULL,
    MODIFY `fee` DOUBLE NOT NULL,
    MODIFY `country_exchange` DOUBLE NOT NULL,
    MODIFY `prefix_code_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `prefix_code_id` INTEGER NOT NULL,
    MODIFY `country_exchange` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_prefix_code_id_fkey` FOREIGN KEY (`prefix_code_id`) REFERENCES `prefix_code`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_transactions` ADD CONSTRAINT `history_transactions_prefix_code_id_fkey` FOREIGN KEY (`prefix_code_id`) REFERENCES `prefix_code`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
