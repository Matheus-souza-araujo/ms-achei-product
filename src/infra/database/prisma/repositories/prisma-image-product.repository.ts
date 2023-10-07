import { Injectable } from "@nestjs/common";
import { CategorieEntity } from "src/app/entities/categorie.entity";
import { CategorieRepository } from "src/app/repositories/categorie.repository";

@Injectable()
export class PrismaImageProductRepository implements CategorieRepository {
  create(categorie: CategorieEntity): Promise<CategorieEntity> {
    throw new Error("Method not implemented.");
  }
  findById(categorieId: string): Promise<CategorieEntity> {
    throw new Error("Method not implemented.");
  }
  update(categorie: CategorieEntity): Promise<CategorieEntity> {
    throw new Error("Method not implemented.");
  }

}