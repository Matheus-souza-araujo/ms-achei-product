import { Injectable } from "@nestjs/common";
import { ProductCategorieEntity } from "src/app/entities/product-categorie.entity";
import { ProductCategorieRepository } from "src/app/repositories/product-categorie.repository";

@Injectable()
export class PrismaProductCategorieRepository implements ProductCategorieRepository {
  create(productCategorie: ProductCategorieEntity): Promise<ProductCategorieEntity> {
    throw new Error("Method not implemented.");
  }

}