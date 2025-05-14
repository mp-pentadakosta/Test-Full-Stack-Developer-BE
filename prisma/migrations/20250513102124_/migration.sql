/*
  Warnings:

  - Added the required column `fee` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Made the column `payment_method` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `fee` INTEGER NOT NULL,
    ADD COLUMN `prefix_code_id` INTEGER NULL,
    MODIFY `payment_method` ENUM('QRIS') NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_prefix_code_id_fkey` FOREIGN KEY (`prefix_code_id`) REFERENCES `prefix_code`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
