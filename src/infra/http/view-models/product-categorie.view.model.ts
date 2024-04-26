import { ProductCategorieEntity } from 'src/app/entities/product-categorie.entity';
import { ProductViewModel } from './product.view.model';
import { CategorieViewModel } from './categorie.view.model';

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
