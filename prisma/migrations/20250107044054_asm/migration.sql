/*
  Warnings:

  - You are about to drop the column `statusWorkId` on the `confirmbyname` table. All the data in the column will be lost.
  - You are about to drop the `statuswork` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `ConfirmByName` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmbynameId` to the `ServiceWork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `confirmbyname` DROP FOREIGN KEY `ConfirmByName_statusWorkId_fkey`;

-- DropForeignKey
ALTER TABLE `statuswork` DROP FOREIGN KEY `StatusWork_serviceworkId_fkey`;

-- DropIndex
DROP INDEX `ConfirmByName_statusWorkId_fkey` ON `confirmbyname`;

-- AlterTable
ALTER TABLE `confirmbyname` DROP COLUMN `statusWorkId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `servicework` ADD COLUMN `confirmbynameId` INTEGER NOT NULL,
    ADD COLUMN `statusconfirm` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `statuswork`;

-- AddForeignKey
ALTER TABLE `ServiceWork` ADD CONSTRAINT `ServiceWork_confirmbynameId_fkey` FOREIGN KEY (`confirmbynameId`) REFERENCES `ConfirmByName`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
