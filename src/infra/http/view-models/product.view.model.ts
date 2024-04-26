import { ProductCategorieViewModel } from '@infra/http/view-models/product-categorie.view.model';
import { ImageProductViewModel } from '@infra/http/view-models/image-product.view.model';
import { ProductEntity } from '@app/entities/product.entity';

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
