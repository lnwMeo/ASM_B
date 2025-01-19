/*
  Warnings:

  - You are about to drop the column `questionname` on the `servicerating` table. All the data in the column will be lost.
  - Added the required column `questionratingId` to the `ServiceRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicerating` DROP COLUMN `questionname`,
    ADD COLUMN `questionratingId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `QuestionRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionname` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceRating` ADD CONSTRAINT `ServiceRating_questionratingId_fkey` FOREIGN KEY (`questionratingId`) REFERENCES `QuestionRating`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
