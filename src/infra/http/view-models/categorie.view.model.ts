import { CategorieEntity } from '@app/entities/categorie.entity';

export class CategorieViewModel {
  static toHttp(categorie: Partial<CategorieEntity>) {
    return {
      categorieId: categorie.category_id,
      name: categorie.name,
      description: categorie.description,
      status: categorie.status,
      createdAt: categorie.createdAt,
      updatedAt: categorie.updatedAt,
    };
  }
}
