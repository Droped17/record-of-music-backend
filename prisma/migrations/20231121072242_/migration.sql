-- DropForeignKey
ALTER TABLE `recordorder` DROP FOREIGN KEY `RecordOrder_recId_fkey`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_recId_fkey` FOREIGN KEY (`recId`) REFERENCES `Record`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
