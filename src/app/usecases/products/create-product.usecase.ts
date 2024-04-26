import { ProductEntity } from '@app/entities/product.entity';
import { CategorieRepository } from '@app/repositories/categorie.repository';
import { ImageProductRepository } from '@app/repositories/image-product.repository';
import { ProductCategorieRepository } from '@app/repositories/product-categorie.repository';
import { ProductRepository } from '@app/repositories/product.repository';
import { StorageService, uploadFileResponse } from '@app/services/storage';
import { Injectable } from '@nestjs/common';
import { CreateNewProductRequest } from '@app/usecases/products/types/create-product.type';
import { CategorieNotFound } from '@app/usecases/products/errors/categorie-not-found.error';
import { ImageProductEntity } from '@app/entities/image-product.entity';
import { ProductCategorieEntity } from '@app/entities/product-categorie.entity';
import { ImageProductStatus } from '@app/libs/enums/image-product-status';
import { ProductCategorieStatus } from '@app/libs/enums/product-categorie-status';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categorieRepository: CategorieRepository,
    private readonly productCategorieRepository: ProductCategorieRepository,
    private readonly imageProductRepository: ImageProductRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute(request: CreateNewProductRequest): Promise<ProductEntity> {
    const {
      name,
      description,
      image,
      status,
      price,
      offer,
      storeId,
      categorieId,
    } = request;

    const categorie = await this.categorieRepository.findById(categorieId);

    if (!categorie) {
      throw new CategorieNotFound();
    }

    const product = new ProductEntity({
      name,
      description,
      status,
      price,
      offer,
      storeId,
    });

    const newProduct = await this.productRepository.create(product);

    let imageUploaded: uploadFileResponse;
    try {
      imageUploaded = await this.storageService.uploadFile(
        image.originalname,
        image.buffer,
      );
    } catch (error) {
      await this.productRepository.deleteById(product.product_id);
    }

    const newProductImage = new ImageProductEntity({
      productId: newProduct.product_id,
      image: imageUploaded.path,
      status: ImageProductStatus.ACTIVE,
    });

    await this.imageProductRepository.craete(newProductImage);

    const productCategorie = new ProductCategorieEntity({
      productId: newProduct.product_id,
      categorieId: categorie.category_id,
      status: ProductCategorieStatus.ACTIVE,
    });

    await this.productCategorieRepository.create(productCategorie);

    return newProduct;
  }
}
