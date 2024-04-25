import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/app/entities/product.entity';
import { ProductRepository } from 'src/app/repositories/product.repository';
import { PrismaProductMapper } from '../mappers/prisma-product.mapper';
import { PrismaService } from '../prisma.service';
import { FindManyProduct } from 'src/app/repositories/types/product-repository/find-many,type';

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
        ProductCategorie: true,
        ImageProduct: true,
      },
    });

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

    console.log(products[0]);

    if (products.length < 1) {
      return [];
    }

    return products.map(PrismaProductMapper.toDomain);
  }

  update(product: ProductEntity): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }

  async deleteById(productId: string): Promise<void> {
    await this.prismaService.product.delete({ where: { productId } });
  }
}
