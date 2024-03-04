import { ProductCategorieEntity } from '../entities/product-categorie.entity';

export abstract class ProductCategorieRepository {
  abstract create(
    productCategorie: ProductCategorieEntity,
  ): Promise<ProductCategorieEntity>;
}
