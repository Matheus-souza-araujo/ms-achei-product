import { Injectable } from "@nestjs/common";
import { CategorieEntity } from "src/app/entities/categorie.entity";
import { CategorieRepository } from "src/app/repositories/categorie.repository";
import { PrismaService } from "../prisma.service";
import { PrismaCategorieMapper } from "../mappers/prisma-categorie.mapper";

@Injectable()
export class PrismaCategorieRepository implements CategorieRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(categorie: CategorieEntity): Promise<CategorieEntity> {
    throw new Error("Method not implemented.");
  }
  async findById(categorieId: string): Promise<CategorieEntity> {
    const categorie = await this.prismaService.categorie.findUnique({where: {categorieId}})

    return PrismaCategorieMapper.toDomain(categorie)
  }
  update(categorie: CategorieEntity): Promise<CategorieEntity> {
    throw new Error("Method not implemented.");
  }
}