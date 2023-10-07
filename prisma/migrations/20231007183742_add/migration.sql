/*
  Warnings:

  - Added the required column `image` to the `image_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image_product" ADD COLUMN     "image" TEXT NOT NULL;
