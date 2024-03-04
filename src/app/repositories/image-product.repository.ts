import { ImageProductEntity } from '../entities/image-product.entity';

export abstract class ImageProductRepository {
  abstract create(
    imageProduct: ImageProductEntity,
  ): Promise<ImageProductEntity>;
}
