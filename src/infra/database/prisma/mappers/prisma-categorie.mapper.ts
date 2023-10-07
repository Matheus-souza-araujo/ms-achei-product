import { Categorie } from "@prisma/client";
import { CategorieEntity } from "src/app/entities/categorie.entity";
import { CategorieStatus } from "src/app/libs/enums/categorie-status";

export class PrismaCategorieMapper {
  static toPrisma(categorie: CategorieEntity): Categorie {
    return {
      categorieId: categorie.category_id,
      name: categorie.name,
      description: categorie.description,
      status: categorie.status,
      createdAt:categorie.createdAt,
      updatedAt: categorie.updatedAt
    };
  }

  static toDomain(raw: Categorie): CategorieEntity {
    return new CategorieEntity(
      {
        name: raw.name,
        description: raw.description,
        status: raw.status === CategorieStatus.ACTIVE ? CategorieStatus.ACTIVE : CategorieStatus.INACTIVE,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      raw.categorieId,
    );
  }
}
