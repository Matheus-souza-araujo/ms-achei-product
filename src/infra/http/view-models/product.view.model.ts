import { ProductEntity } from 'src/app/entities/product.entity';
import { ProductCategorieViewModel } from './product-categorie.view.model';
import { ImageProductViewModel } from './image-product.view.model';

export class ProductViewModel {
  static toHttp(product: Partial<ProductEntity>) {
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
      productCategorie:
        product.productCategorie.length >= 1
          ? product.productCategorie.map(ProductCategorieViewModel.toHttp)
          : undefined,
      imageProduct:
        product.imageProduct.length >= 1
          ? product.imageProduct.map(ImageProductViewModel.toHttp)
          : undefined,
    };
  }
}
