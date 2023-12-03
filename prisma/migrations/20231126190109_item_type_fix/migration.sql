/*
  Warnings:

  - You are about to drop the column `state` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `ItemType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "state",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ItemType" DROP COLUMN "state",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
