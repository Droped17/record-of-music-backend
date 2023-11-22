/*
  Warnings:

  - You are about to drop the column `amount` on the `recordorder` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `amount` INTEGER NOT NULL,
    MODIFY `paymentStatus` VARCHAR(191) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `recordorder` DROP COLUMN `amount`;
