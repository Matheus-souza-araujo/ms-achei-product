import { ProductEntity } from "../entities/product.entity";

export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<ProductEntity>;
  abstract findById(productId: string): Promise<ProductEntity | null>;
  abstract update(product: ProductEntity): Promise<ProductEntity>;
  abstract deleteById(productId: string): Promise<void>;
}