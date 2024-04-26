import { Injectable } from '@nestjs/common';
import { PrismaImageProductMapper } from '@infra/database/prisma/mappers/prisma-image-product.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ImageProductRepository } from '@app/repositories/image-product.repository';
import { ImageProductEntity } from '@app/entities/image-product.entity';

@Injectable()
export class PrismaImageProductRepository implements ImageProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async craete(imageProduct: ImageProductEntity): Promise<ImageProductEntity> {
    const imageProductPrisma = PrismaImageProductMapper.toPrisma(imageProduct);

    const imageProductCreated = await this.prismaService.imageProduct.create({
      data: imageProductPrisma,
    });

    return PrismaImageProductMapper.toDomain(imageProductCreated);
  }
}
