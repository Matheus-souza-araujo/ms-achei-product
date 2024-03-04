import { Injectable } from "@nestjs/common";
import { ProductEntity } from "src/app/entities/product.entity";
import { ProductRepository } from "src/app/repositories/product.repository";
import { PrismaProductMapper } from "../mappers/prisma-product.mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(product: ProductEntity): Promise<ProductEntity> {
    const producPrisma = PrismaProductMapper.toPrisma(product)

    const productCreated = await this.prismaService.product.create({data: producPrisma})

    return PrismaProductMapper.toDomain(productCreated)
  }
  async findById(productId: string): Promise<ProductEntity> {
    const product = await this.prismaService.product.findUnique({where: {productId}})

    return PrismaProductMapper.toDomain(product)
  }
  update(product: ProductEntity): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

  async deleteById(productId: string): Promise<void> {
    await this.prismaService.product.delete({where:{productId}})
  }


}