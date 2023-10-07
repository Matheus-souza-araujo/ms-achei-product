import { Product } from "@prisma/client";
import { ProductEntity } from "src/app/entities/product.entity";
import { ProductStatus } from "src/app/libs/enums/product-status";

export class PrismaProductMapper {
  static toPrisma(product: ProductEntity): Product {
    return {
      productId: product.product_id,
      name: product.name,
      description: product.description,
      offer: product.offer,
      price: product.price,
      storeId:product.storeId,
      status: product.status,
      createdAt:product.createdAt,
      updatedAt: product.updatedAt
    };
  }

  static toDomain(raw: Product): ProductEntity {
    return new ProductEntity(
      {
        name: raw.name,
        description: raw.description,
        offer: raw.offer,
        price: raw.price,
        storeId:raw.storeId,
        status: raw.status === ProductStatus.ACTIVE ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
        createdAt:raw.createdAt,
        updatedAt: raw.updatedAt
      },
      raw.productId,
    );
  }
}