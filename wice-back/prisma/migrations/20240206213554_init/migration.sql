/*
  Warnings:

  - You are about to drop the column `accessType` on the `User` table. All the data in the column will be lost.
  - Added the required column `accesstype` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `accessType`,
    ADD COLUMN `accesstype` VARCHAR(65) NOT NULL;
