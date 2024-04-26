import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/app/repositories/product.repository';
import { ProductNotFound } from './errors/product-not-found.error';

@Injectable()
export class FindByIdProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    return product;
  }
}
