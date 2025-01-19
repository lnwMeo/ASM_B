/*
  Warnings:

  - You are about to drop the column `worktypeId` on the `groupwork` table. All the data in the column will be lost.
  - Added the required column `groupworkId` to the `WorkType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `groupwork` DROP FOREIGN KEY `GroupWork_worktypeId_fkey`;

-- DropIndex
DROP INDEX `GroupWork_worktypeId_fkey` ON `groupwork`;

-- AlterTable
ALTER TABLE `groupwork` DROP COLUMN `worktypeId`;

-- AlterTable
ALTER TABLE `worktype` ADD COLUMN `groupworkId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkType` ADD CONSTRAINT `WorkType_groupworkId_fkey` FOREIGN KEY (`groupworkId`) REFERENCES `GroupWork`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
