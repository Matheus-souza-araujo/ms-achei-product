import { CategorieEntity } from '@app/entities/categorie.entity';

export abstract class CategorieRepository {
  abstract create(categorie: CategorieEntity): Promise<CategorieEntity>;
  abstract findById(categorieId: string): Promise<CategorieEntity | null>;
  abstract update(categorie: CategorieEntity): Promise<CategorieEntity>;
}
