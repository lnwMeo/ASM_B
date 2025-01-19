/*
  Warnings:

  - You are about to drop the column `status` on the `statuswork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `statuswork` DROP COLUMN `status`,
    ADD COLUMN `statusconfirm` BOOLEAN NOT NULL DEFAULT false;
