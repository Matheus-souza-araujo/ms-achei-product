import { ImageProductEntity } from '@app/entities/image-product.entity';

export class ImageProductViewModel {
  static toHttp(imageProduct: Partial<ImageProductEntity>) {
    return {
      imageProductId: imageProduct.image_product_id,
      productId: imageProduct.productId,
      image: imageProduct.image,
      status: imageProduct.status,
      createdAt: imageProduct.createdAt,
      updatedAt: imageProduct.updatedAt,
    };
  }
}
