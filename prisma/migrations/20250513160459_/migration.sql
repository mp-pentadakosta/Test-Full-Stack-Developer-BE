/*
  Warnings:

  - You are about to alter the column `total` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fee` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `price` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `price` DOUBLE NOT NULL,
    MODIFY `total` DOUBLE NOT NULL,
    MODIFY `fee` DOUBLE NOT NULL;
