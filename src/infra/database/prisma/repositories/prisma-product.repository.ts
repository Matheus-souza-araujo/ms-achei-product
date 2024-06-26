import { ProductRepository } from '@app/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ProductEntity } from '@app/entities/product.entity';
import { PrismaProductMapper } from '@infra/database/prisma/mappers/prisma-product.mapper';
import { FindManyProduct } from '@app/repositories/types/product-repository/find-many,type';
import { ProductStatus } from '@app/libs/enums/product-status';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const productPrisma = PrismaProductMapper.toPrisma(product);

    const productCreated = await this.prismaService.product.create({
      data: productPrisma,
      select: {
        productId: true,
        name: true,
        description: true,
        status: true,
        price: true,
        offer: true,
        storeId: true,
        createdAt: true,
        updatedAt: true,
        ProductCategorie: true,
        ImageProduct: true,
      },
    });

    return PrismaProductMapper.toDomain(productCreated);
  }

  async findById(productId: string): Promise<ProductEntity> {
    const product = await this.prismaService.product.findUnique({
      where: { productId },
      select: {
        productId: true,
        name: true,
        description: true,
        status: true,
        price: true,
        offer: true,
        storeId: true,
        createdAt: true,
        updatedAt: true,
        ProductCategorie: {
          select: {
            Categorie: {
              select: {
                name: true,
              },
            },
          },
        },
        ImageProduct: {
          select: {
            image: true,
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async findMany({
    storeId,
    categorieId,
    offer,
    status,
  }: FindManyProduct): Promise<ProductEntity[] | []> {
    const products = await this.prismaService.product.findMany({
      where: {
        storeId,
        offer,
        status,
        ProductCategorie: {
          some: {
            categorieId,
          },
        },
      },
      select: {
        productId: true,
        name: true,
        description: true,
        status: true,
        price: true,
        offer: true,
        storeId: true,
        createdAt: true,
        updatedAt: true,
        ProductCategorie: {
          select: {
            Categorie: {
              select: {
                name: true,
              },
            },
          },
        },
        ImageProduct: {
          select: {
            image: true,
          },
        },
      },
    });

    if (products.length < 1) {
      return [];
    }

    return products.map(PrismaProductMapper.toDomain);
  }

  async update(product: ProductEntity): Promise<void> {
    const productPrisma = PrismaProductMapper.toPrisma(product);

    await this.prismaService.product.update({
      where: {
        productId: productPrisma.productId,
      },
      data: productPrisma,
    });
  }

  async deleteById(productId: string): Promise<void> {
    await this.prismaService.product.update({
      where: { productId },
      data: { status: ProductStatus.INACTIVE },
    });
  }
}
