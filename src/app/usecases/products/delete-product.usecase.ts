import { ProductRepository } from '@app/repositories/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string): Promise<void> {
    await this.productRepository.deleteById(productId);
  }
}
