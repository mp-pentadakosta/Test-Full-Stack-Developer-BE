/*
  Warnings:

  - Added the required column `country_code` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_exchange` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_game_user` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wa_number` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `country_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `country_exchange` INTEGER NOT NULL,
    ADD COLUMN `id_game_user` VARCHAR(191) NOT NULL,
    ADD COLUMN `server_game` VARCHAR(191) NULL,
    ADD COLUMN `wa_number` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `history_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `game_id` INTEGER NOT NULL,
    `status` ENUM('SUCCESS', 'FAILED', 'PENDING', 'REFUND') NOT NULL DEFAULT 'PENDING',
    `status_payment` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID',
    `total` INTEGER NOT NULL,
    `fee` INTEGER NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `country_exchange` INTEGER NOT NULL,
    `prefix_code_id` INTEGER NULL,
    `payment_method` ENUM('QRIS') NOT NULL,
    `id_game_user` VARCHAR(191) NOT NULL,
    `server_game` VARCHAR(191) NULL,
    `wa_number` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `history_transactions` ADD CONSTRAINT `history_transactions_prefix_code_id_fkey` FOREIGN KEY (`prefix_code_id`) REFERENCES `prefix_code`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
