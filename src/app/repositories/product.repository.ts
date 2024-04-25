import { ProductEntity } from '../entities/product.entity';
import { FindManyProduct } from './types/product-repository/find-many,type';

export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<ProductEntity>;
  abstract findById(productId: string): Promise<ProductEntity | null>;
  abstract findMany(params: FindManyProduct): Promise<ProductEntity[] | []>;
  abstract update(product: ProductEntity): Promise<ProductEntity>;
  abstract deleteById(productId: string): Promise<void>;
}
