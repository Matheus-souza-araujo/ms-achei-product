import { ProductEntity } from '@app/entities/product.entity';
import { FindManyProduct } from '@app/repositories/types/product-repository/find-many,type';

export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<ProductEntity>;
  abstract findById(productId: string): Promise<ProductEntity | null>;
  abstract findMany(params: FindManyProduct): Promise<ProductEntity[] | []>;
  abstract update(product: ProductEntity): Promise<ProductEntity>;
  abstract deleteById(productId: string): Promise<void>;
}
