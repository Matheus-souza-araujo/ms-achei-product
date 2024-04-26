import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaCategorieMapper } from '@infra/database/prisma/mappers/prisma-categorie.mapper';
import { CategorieRepository } from '@app/repositories/categorie.repository';
import { CategorieEntity } from '@app/entities/categorie.entity';

@Injectable()
export class PrismaCategorieRepository implements CategorieRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(categorie: CategorieEntity): Promise<CategorieEntity> {
    throw new Error('Method not implemented.');
  }
  async findById(categorieId: string): Promise<CategorieEntity> {
    const categorie = await this.prismaService.categorie.findUnique({
      where: { categorieId },
    });

    return PrismaCategorieMapper.toDomain(categorie);
  }
  update(categorie: CategorieEntity): Promise<CategorieEntity> {
    throw new Error('Method not implemented.');
  }
}
