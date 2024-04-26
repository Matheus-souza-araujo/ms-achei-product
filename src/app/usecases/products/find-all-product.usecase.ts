import { ProductEntity } from '@app/entities/product.entity';
import { ProductRepository } from '@app/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { FindAllProductRequest } from '@app/usecases/products/types/find-all-product.type';

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
