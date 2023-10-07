import { Injectable } from "@nestjs/common";
import { ProductEntity } from "src/app/entities/product.entity";
import { ProductRepository } from "src/app/repositories/product.repository";

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }
  findById(productId: string): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }
  update(product: ProductEntity): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }


}