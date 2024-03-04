import { ProductEntity } from '../entities/product.entity';
import { FindAllProductsByStoreType } from './types/product/find-all-products-by-store-Id.type';

export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<ProductEntity>;
  abstract findById(productId: string): Promise<ProductEntity | null>;
  abstract findAllProductsByStoreId({
    storeId,
    name,
    status,
    offer,
    start_date,
    end_date,
  }: FindAllProductsByStoreType): Promise<ProductEntity[] | []>;
  abstract update(product: ProductEntity): Promise<ProductEntity>;
  abstract deleteById(productId: string): Promise<void>;
}
