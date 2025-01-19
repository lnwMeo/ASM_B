-- CreateTable
CREATE TABLE `StatusWork` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `serviceworkId` INTEGER NOT NULL,

    UNIQUE INDEX `StatusWork_serviceworkId_key`(`serviceworkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfirmByName` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL,
    `statusWorkId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StatusWork` ADD CONSTRAINT `StatusWork_serviceworkId_fkey` FOREIGN KEY (`serviceworkId`) REFERENCES `ServiceWork`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfirmByName` ADD CONSTRAINT `ConfirmByName_statusWorkId_fkey` FOREIGN KEY (`statusWorkId`) REFERENCES `StatusWork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
