import { Injectable } from '@nestjs/common';
import { AddCategoryProduct } from '@app/usecases/products/types/add-category-product.type';
import { ProductCategorieRepository } from '@app/repositories/product-categorie.repository';
import { ProductRepository } from '@app/repositories/product.repository';
import { CategorieRepository } from '@app/repositories/categorie.repository';
import { ProductNotFound } from '@app/usecases/products/errors/product-not-found.error';
import { CategorieNotFound } from '@app/usecases/products/errors/categorie-not-found.error';
import { ProductCategorieEntity } from '@app/entities/product-categorie.entity';
import { ProductCategorieStatus } from '@app/libs/enums/product-categorie-status';
import { ProductCategorieAlreadyExistsBadRequest } from '@app/usecases/products/errors/product-categorie-already-exists-bad-request.error';

@Injectable()
export class AddCategoryProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categorieRepository: CategorieRepository,
    private readonly productCategorieRepository: ProductCategorieRepository,
  ) {}

  async execute({ productId, categorieId }: AddCategoryProduct): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const categorie = await this.categorieRepository.findById(categorieId);

    if (!categorie) {
      throw new CategorieNotFound();
    }

    const existProductCategorie =
      await this.productCategorieRepository.findByProductIdAndCategorieId(
        productId,
        categorieId,
      );

    if (existProductCategorie) {
      throw new ProductCategorieAlreadyExistsBadRequest();
    }

    const productCategorie = new ProductCategorieEntity({
      productId,
      categorieId,
      status: ProductCategorieStatus.ACTIVE,
    });

    await this.productCategorieRepository.create(productCategorie);
  }
}
