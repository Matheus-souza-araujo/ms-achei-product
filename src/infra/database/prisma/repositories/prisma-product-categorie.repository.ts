import { Injectable } from "@nestjs/common";
import { ProductCategorieEntity } from "src/app/entities/product-categorie.entity";
import { ProductCategorieRepository } from "src/app/repositories/product-categorie.repository";
import { PrismaService } from "../prisma.service";
import { PrismaProductCategorieMapper } from "../mappers/prisma-product-categorie.mapper";

@Injectable()
export class PrismaProductCategorieRepository implements ProductCategorieRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(productCategorie: ProductCategorieEntity): Promise<ProductCategorieEntity> {
    const productCategoriePrisma = PrismaProductCategorieMapper.toPrisma(productCategorie)

    const productCategorieCreated = await this.prismaService.productCategorie.create({data: productCategoriePrisma})

    return PrismaProductCategorieMapper.toDomain(productCategorieCreated)
  }

}