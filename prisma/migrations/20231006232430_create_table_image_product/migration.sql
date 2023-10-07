-- CreateTable
CREATE TABLE "image_product" (
    "image_product_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_product_pkey" PRIMARY KEY ("image_product_id")
);

-- AddForeignKey
ALTER TABLE "image_product" ADD CONSTRAINT "image_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
