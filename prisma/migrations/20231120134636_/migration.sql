/*
  Warnings:

  - You are about to drop the column `genreName` on the `record` table. All the data in the column will be lost.
  - Added the required column `genreType` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `record` DROP COLUMN `genreName`,
    ADD COLUMN `genreType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recordorder` MODIFY `slipImage` VARCHAR(191) NULL;
