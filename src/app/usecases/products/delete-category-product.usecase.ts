import { Injectable } from '@nestjs/common';
import { DeleteCategoryProductRequest } from './types/delete-category-product.type';
import { ProductRepository } from '@app/repositories/product.repository';
import { CategorieRepository } from '@app/repositories/categorie.repository';
import { ProductCategorieRepository } from '@app/repositories/product-categorie.repository';
import { ProductNotFound } from '@app/usecases/products/errors/product-not-found.error';
import { CategorieNotFound } from '@app/usecases/products/errors/categorie-not-found.error';
import { ProductCategoryNotExist } from '@app/usecases/products/errors/product-category-not-exist.error';

@Injectable()
export class DeleteCategoryProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categorieRepository: CategorieRepository,
    private readonly productCategorieRepository: ProductCategorieRepository,
  ) {}

  async execute(request: DeleteCategoryProductRequest) {
    const { productId, categorieId } = request;

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const categorie = await this.categorieRepository.findById(categorieId);

    if (!categorie) {
      throw new CategorieNotFound();
    }

    const productCategorieExist =
      await this.productCategorieRepository.findByProductIdAndCategorieId(
        productId,
        categorieId,
      );

    if (!productCategorieExist) {
      throw new ProductCategoryNotExist();
    }

    await this.productCategorieRepository.deleteByProductCategorieId(
      productCategorieExist.productCategorieId,
    );
  }
}
