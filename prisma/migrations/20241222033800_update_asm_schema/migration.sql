/*
  Warnings:

  - You are about to drop the column `Affiliationname` on the `affiliation` table. All the data in the column will be lost.
  - You are about to drop the column `serviceproviderId` on the `servicework` table. All the data in the column will be lost.
  - You are about to drop the column `servicerecipientId` on the `servicework` table. All the data in the column will be lost.
  - You are about to drop the `serviceimages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `serviceprovider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicerecipient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `totalservicebudget` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[affiliationname]` on the table `Affiliation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `affiliationname` to the `Affiliation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `affiliationId` to the `ServiceWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupworkId` to the `ServiceWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicerecipient` to the `ServiceWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusrecipientId` to the `ServiceWork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_groupworkId_fkey`;

-- DropForeignKey
ALTER TABLE `groupwork` DROP FOREIGN KEY `GroupWork_worktypeId_fkey`;

-- DropForeignKey
ALTER TABLE `servicebudget` DROP FOREIGN KEY `ServiceBudget_serviceworkId_fkey`;

-- DropForeignKey
ALTER TABLE `serviceimages` DROP FOREIGN KEY `ServiceImages_serviceworkId_fkey`;

-- DropForeignKey
ALTER TABLE `serviceprovider` DROP FOREIGN KEY `ServiceProvider_groupworkId_fkey`;

-- DropForeignKey
ALTER TABLE `servicerating` DROP FOREIGN KEY `ServiceRating_serviceworkId_fkey`;

-- DropForeignKey
ALTER TABLE `servicerecipient` DROP FOREIGN KEY `ServiceRecipient_affiliationId_fkey`;

-- DropForeignKey
ALTER TABLE `servicerecipient` DROP FOREIGN KEY `ServiceRecipient_statusrecipientId_fkey`;

-- DropForeignKey
ALTER TABLE `servicework` DROP FOREIGN KEY `ServiceWork_serviceproviderId_fkey`;

-- DropForeignKey
ALTER TABLE `servicework` DROP FOREIGN KEY `ServiceWork_servicerecipientId_fkey`;

-- DropForeignKey
ALTER TABLE `totalservicebudget` DROP FOREIGN KEY `TotalServiceBudget_serviceworkId_fkey`;

-- DropIndex
DROP INDEX `Affiliation_Affiliationname_key` ON `affiliation`;

-- DropIndex
DROP INDEX `Employee_groupworkId_fkey` ON `employee`;

-- DropIndex
DROP INDEX `GroupWork_worktypeId_fkey` ON `groupwork`;

-- DropIndex
DROP INDEX `ServiceBudget_serviceworkId_fkey` ON `servicebudget`;

-- DropIndex
DROP INDEX `ServiceRating_serviceworkId_fkey` ON `servicerating`;

-- DropIndex
DROP INDEX `ServiceWork_serviceproviderId_fkey` ON `servicework`;

-- DropIndex
DROP INDEX `ServiceWork_servicerecipientId_fkey` ON `servicework`;

-- AlterTable
ALTER TABLE `affiliation` DROP COLUMN `Affiliationname`,
    ADD COLUMN `affiliationname` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `servicework` DROP COLUMN `serviceproviderId`,
    DROP COLUMN `servicerecipientId`,
    ADD COLUMN `affiliationId` INTEGER NOT NULL,
    ADD COLUMN `groupworkId` INTEGER NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `servicerecipient` VARCHAR(191) NOT NULL,
    ADD COLUMN `statusrecipientId` INTEGER NOT NULL,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL DEFAULT 0.0;

-- DropTable
DROP TABLE `serviceimages`;

-- DropTable
DROP TABLE `serviceprovider`;

-- DropTable
DROP TABLE `servicerecipient`;

-- DropTable
DROP TABLE `totalservicebudget`;

-- CreateIndex
CREATE UNIQUE INDEX `Affiliation_affiliationname_key` ON `Affiliation`(`affiliationname`);

-- AddForeignKey
ALTER TABLE `ServiceWork` ADD CONSTRAINT `ServiceWork_affiliationId_fkey` FOREIGN KEY (`affiliationId`) REFERENCES `Affiliation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceWork` ADD CONSTRAINT `ServiceWork_statusrecipientId_fkey` FOREIGN KEY (`statusrecipientId`) REFERENCES `StatusRecipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceWork` ADD CONSTRAINT `ServiceWork_groupworkId_fkey` FOREIGN KEY (`groupworkId`) REFERENCES `GroupWork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupWork` ADD CONSTRAINT `GroupWork_worktypeId_fkey` FOREIGN KEY (`worktypeId`) REFERENCES `WorkType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_groupworkId_fkey` FOREIGN KEY (`groupworkId`) REFERENCES `GroupWork`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceBudget` ADD CONSTRAINT `ServiceBudget_serviceworkId_fkey` FOREIGN KEY (`serviceworkId`) REFERENCES `ServiceWork`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceRating` ADD CONSTRAINT `ServiceRating_serviceworkId_fkey` FOREIGN KEY (`serviceworkId`) REFERENCES `ServiceWork`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
