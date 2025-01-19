-- DropForeignKey
ALTER TABLE `servicework` DROP FOREIGN KEY `ServiceWork_confirmbynameId_fkey`;

-- DropIndex
DROP INDEX `ServiceWork_confirmbynameId_fkey` ON `servicework`;

-- AlterTable
ALTER TABLE `servicework` MODIFY `confirmbynameId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ServiceWork` ADD CONSTRAINT `ServiceWork_confirmbynameId_fkey` FOREIGN KEY (`confirmbynameId`) REFERENCES `ConfirmByName`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
