-- AddForeignKey
ALTER TABLE `RecordOrderPending` ADD CONSTRAINT `RecordOrderPending_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
