import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaProductCategorieMapper } from '@infra/database/prisma/mappers/prisma-product-categorie.mapper';
import { ProductCategorieRepository } from '@app/repositories/product-categorie.repository';
import { ProductCategorieEntity } from '@app/entities/product-categorie.entity';

@Injectable()
export class PrismaProductCategorieRepository
  implements ProductCategorieRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    productCategorie: ProductCategorieEntity,
  ): Promise<ProductCategorieEntity> {
    const productCategoriePrisma =
      PrismaProductCategorieMapper.toPrisma(productCategorie);

    const productCategorieCreated =
      await this.prismaService.productCategorie.create({
        data: productCategoriePrisma,
      });

    return PrismaProductCategorieMapper.toDomain(productCategorieCreated);
  }

  async findByProductIdAndCategorieId(
    productId: string,
    categorieId: string,
  ): Promise<ProductCategorieEntity> {
    const productCategorie =
      await this.prismaService.productCategorie.findFirst({
        where: {
          productId,
          categorieId,
        },
        select: {
          productCategorieId: true,
          productId: true,
          categorieId: true,
          status: true,
          Product: true,
          Categorie: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    if (!productCategorie) {
      return null;
    }

    return PrismaProductCategorieMapper.toDomain(productCategorie);
  }

  async deleteByProductCategorieId(productCategorieId: string): Promise<void> {
    await this.prismaService.productCategorie.delete({
      where: { productCategorieId },
    });
  }
}
