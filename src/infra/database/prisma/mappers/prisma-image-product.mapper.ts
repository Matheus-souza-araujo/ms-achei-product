import { ImageProductEntity } from '@app/entities/image-product.entity';
import { ImageProductStatus } from '@app/libs/enums/image-product-status';
import { ImageProduct } from '@prisma/client';

export class PrismaImageProductMapper {
  static toPrisma(imageProductEntity: ImageProductEntity): ImageProduct {
    return {
      imageProductId: imageProductEntity.image_product_id,
      productId: imageProductEntity.productId,
      image: imageProductEntity.image,
      status:
        imageProductEntity.status === ImageProductStatus.ACTIVE
          ? ImageProductStatus.ACTIVE
          : ImageProductStatus.INACTIVE,
      createdAt: imageProductEntity.createdAt,
      updatedAt: imageProductEntity.updatedAt,
    };
  }

  static toDomain(raw: ImageProduct): ImageProductEntity {
    return new ImageProductEntity(
      {
        productId: raw.productId,
        image: raw.image,
        status:
          raw.status === ImageProductStatus.ACTIVE
            ? ImageProductStatus.ACTIVE
            : ImageProductStatus.INACTIVE,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.imageProductId,
    );
  }
}
