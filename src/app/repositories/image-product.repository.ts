import { ImageProductEntity } from "../entities/image-product.entity";

export abstract class ImageProductRepository {
  abstract craete(imageProduct: ImageProductEntity): Promise<ImageProductEntity>
}