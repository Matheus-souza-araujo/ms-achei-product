import { ProductViewModel } from '@infra/http/view-models/product.view.model';
import { CategorieViewModel } from '@infra/http/view-models/categorie.view.model';
import { ProductCategorieEntity } from '@app/entities/product-categorie.entity';

export class ProductCategorieViewModel {
  static toHttp(productCategorie: Partial<ProductCategorieEntity>) {
    return {
      productCategorieId: productCategorie.product_categorie_id,
      categorieId: productCategorie.categorieId,
      productId: productCategorie.productId,
      status: productCategorie.status,
      createdAt: productCategorie.createdAt,
      updatedAt: productCategorie.updatedAt,
      product: productCategorie.product
        ? ProductViewModel.toHttp(productCategorie.product)
        : undefined,
      categorie: productCategorie.categorie
        ? CategorieViewModel.toHttp(productCategorie.categorie)
        : undefined,
    };
  }
}
