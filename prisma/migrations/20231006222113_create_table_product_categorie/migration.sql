/*
  Warnings:

  - Added the required column `status` to the `categorie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categorie" ADD COLUMN     "status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "product_categorie" (
    "product_categorie_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" TEXT NOT NULL,
    "categorie_id" TEXT NOT NULL,

    CONSTRAINT "product_categorie_pkey" PRIMARY KEY ("product_categorie_id")
);

-- AddForeignKey
ALTER TABLE "product_categorie" ADD CONSTRAINT "product_categorie_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categorie" ADD CONSTRAINT "product_categorie_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "categorie"("categorie_id") ON DELETE RESTRICT ON UPDATE CASCADE;
