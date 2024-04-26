import { ProductEntity } from '@app/entities/product.entity';
import { ProductRepository } from '@app/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { ProductNotFound } from '@app/usecases/products/errors/product-not-found.error';

@Injectable()
export class FindByIdProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    return product;
  }
}
