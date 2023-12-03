/*
  Warnings:

  - You are about to drop the column `ref_serial` on the `ItemType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemType" DROP CONSTRAINT "ItemType_ref_serial_fkey";

-- AlterTable
ALTER TABLE "ItemType" DROP COLUMN "ref_serial";
