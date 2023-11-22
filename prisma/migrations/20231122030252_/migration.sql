-- AddForeignKey
ALTER TABLE `RecordOrderPending` ADD CONSTRAINT `RecordOrderPending_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
