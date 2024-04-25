import { ProductEntity } from 'src/app/entities/product.entity';

export class ProductViewModel {
  static toHttp(product: ProductEntity) {
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
}
