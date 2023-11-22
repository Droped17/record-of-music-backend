/*
  Warnings:

  - You are about to drop the column `recId` on the `recordorder` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `RecordOrder_recId_fkey` ON `recordorder`;

-- AlterTable
ALTER TABLE `recordorder` DROP COLUMN `recId`;
