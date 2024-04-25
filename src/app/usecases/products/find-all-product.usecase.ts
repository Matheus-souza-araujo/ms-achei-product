import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/app/repositories/product.repository';
import { FindAllProductRequest } from './types/find-all-product.type';
import { ProductEntity } from 'src/app/entities/product.entity';

@Injectable()
export class FindAllProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(request: FindAllProductRequest): Promise<ProductEntity[]> {
    const { status, offer, storeId, categorieId } = request;

    const products = await this.productRepository.findMany({
      status,
      offer,
      storeId,
      categorieId,
    });

    return products;
  }
}
