/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentStatus`;

-- AlterTable
ALTER TABLE `recordorder` ADD COLUMN `paymentStatus` INTEGER NOT NULL DEFAULT 0;
