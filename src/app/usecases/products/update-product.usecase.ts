import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/app/repositories/product.repository';
import { UpdateProductRequest } from './types/update-product.type';
import { CategorieRepository } from 'src/app/repositories/categorie.repository';
import { ProductNotFound } from './errors/product-not-found.error';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categorieRepository: CategorieRepository,
  ) {}

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
