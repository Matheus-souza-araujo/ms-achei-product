import { Injectable } from '@nestjs/common';
import { PrismaImageProductMapper } from '../mappers/prisma-image-product.mapper';
import { ImageProductRepository } from 'src/app/repositories/image-product.repository';
import { ImageProductEntity } from 'src/app/entities/image-product.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaImageProductRepository implements ImageProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(imageProduct: ImageProductEntity): Promise<ImageProductEntity> {
    const imageProductPrisma = PrismaImageProductMapper.toPrisma(imageProduct);

    const imageProductCreated = await this.prismaService.imageProduct.create({
      data: imageProductPrisma,
    });

    return PrismaImageProductMapper.toDomain(imageProductCreated);
  }
}
