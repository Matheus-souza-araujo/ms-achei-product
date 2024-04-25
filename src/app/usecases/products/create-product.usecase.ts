import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/app/entities/product.entity';
import { CategorieRepository } from 'src/app/repositories/categorie.repository';
import { ProductCategorieRepository } from 'src/app/repositories/product-categorie.repository';
import { ProductRepository } from 'src/app/repositories/product.repository';
import { CategorieNotFound } from './errors/categorie-not-found.error';
import { ProductCategorieEntity } from 'src/app/entities/product-categorie.entity';
import { ProductCategorieStatus } from 'src/app/libs/enums/product-categorie-status';
import { StorageService, uploadFileResponse } from 'src/app/services/storage';
import { ImageProductRepository } from 'src/app/repositories/image-product.repository';
import { ImageProductEntity } from 'src/app/entities/image-product.entity';
import { ImageProductStatus } from 'src/app/libs/enums/image-product-status';
import { CreateNewProductRequest } from './types/create-product.type';

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
