/*
  Warnings:

  - Added the required column `worktypeId` to the `ServiceWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicework` ADD COLUMN `worktypeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ServiceWorkEmployee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceworkId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceWork` ADD CONSTRAINT `ServiceWork_worktypeId_fkey` FOREIGN KEY (`worktypeId`) REFERENCES `WorkType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceWorkEmployee` ADD CONSTRAINT `ServiceWorkEmployee_serviceworkId_fkey` FOREIGN KEY (`serviceworkId`) REFERENCES `ServiceWork`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceWorkEmployee` ADD CONSTRAINT `ServiceWorkEmployee_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
