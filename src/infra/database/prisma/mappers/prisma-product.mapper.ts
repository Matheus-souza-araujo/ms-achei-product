import {
  Categorie,
  ImageProduct,
  Product,
  ProductCategorie,
} from '@prisma/client';
import { PrismaProductCategorieMapper } from '@infra/database/prisma/mappers/prisma-product-categorie.mapper';
import { PrismaImageProductMapper } from '@infra/database/prisma/mappers/prisma-image-product.mapper';
import { ProductEntity } from '@app/entities/product.entity';
import { ProductStatus } from '@app/libs/enums/product-status';

export class PrismaProductMapper {
  static toPrisma(product: ProductEntity): Product {
    return {
      productId: product.product_id,
      name: product.name,
      description: product.description,
      offer: product.offer,
      price: product.price,
      storeId: product.storeId,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomain(
    raw: Partial<
      Product & {
        ProductCategorie: Partial<
          ProductCategorie & { Categorie: Partial<Categorie> }
        >[];
        ImageProduct: Partial<ImageProduct>[];
      }
    >,
  ): ProductEntity {
    return new ProductEntity(
      {
        name: raw.name,
        description: raw.description,
        offer: raw.offer,
        price: raw.price,
        storeId: raw.storeId,
        status:
          raw.status === ProductStatus.ACTIVE
            ? ProductStatus.ACTIVE
            : ProductStatus.INACTIVE,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        productCategorie: raw.ProductCategorie
          ? raw.ProductCategorie.map(PrismaProductCategorieMapper.toDomain)
          : undefined,
        imageProduct: raw.ImageProduct
          ? raw.ImageProduct.map(PrismaImageProductMapper.toDomain)
          : undefined,
      },
      raw.productId,
    );
  }
}
