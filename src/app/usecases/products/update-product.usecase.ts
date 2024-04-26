import { ProductRepository } from '@app/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { UpdateProductRequest } from '@app/usecases/products/types/update-product.type';
import { ProductNotFound } from '@app/usecases/products/errors/product-not-found.error';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest) {
    const { productId, name, description, status, price, offer, storeId } =
      request;

    const product = await this.productRepository.findById(productId);

    if (!productId) {
      throw new ProductNotFound();
    }

    product.name = name;
    product.description = description;
    product.status = status;
    product.price = price;
    product.offer = offer;
    product.storeId = storeId;

    await this.productRepository.update(product);
  }
}
