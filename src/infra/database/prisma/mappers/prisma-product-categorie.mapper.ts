import { Categorie, Product, ProductCategorie } from '@prisma/client';
import { PrismaCategorieMapper } from '@infra/database/prisma/mappers/prisma-categorie.mapper';
import { PrismaProductMapper } from '@infra/database/prisma/mappers/prisma-product.mapper';
import { ProductCategorieEntity } from '@app/entities/product-categorie.entity';
import { ProductCategorieStatus } from '@app/libs/enums/product-categorie-status';

export class PrismaProductCategorieMapper {
  static toPrisma(
    productCategorieEntity: ProductCategorieEntity,
  ): ProductCategorie {
    return {
      productCategorieId: productCategorieEntity.productCategorieId,
      categorieId: productCategorieEntity.categorieId,
      productId: productCategorieEntity.productId,
      status:
        productCategorieEntity.status === ProductCategorieStatus.ACTIVE
          ? ProductCategorieStatus.ACTIVE
          : ProductCategorieStatus.INACTIVE,
      createdAt: productCategorieEntity.createdAt,
      updatedAt: productCategorieEntity.updatedAt,
    };
  }

  static toDomain(
    raw: Partial<ProductCategorie & { Product: Product; Categorie: Categorie }>,
  ): ProductCategorieEntity {
    return new ProductCategorieEntity(
      {
        categorieId: raw.categorieId,
        productId: raw.productId,
        status:
          raw.status === ProductCategorieStatus.ACTIVE
            ? ProductCategorieStatus.ACTIVE
            : ProductCategorieStatus.INACTIVE,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        product: raw.Product
          ? PrismaProductMapper.toDomain(raw.Product)
          : undefined,
        categorie: raw.Categorie
          ? PrismaCategorieMapper.toDomain(raw.Categorie)
          : undefined,
      },
      raw.productCategorieId,
    );
  }
}
