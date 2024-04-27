import { Injectable } from '@nestjs/common';
import { AddImageProductRequest } from '@app/usecases/products/types/add-image-product.type';
import { ProductRepository } from '@app/repositories/product.repository';
import { ProductNotFound } from '@app/usecases/products/errors/product-not-found.error';
import { StorageService } from '@app/services/storage';
import { ImageProductRepository } from '@app/repositories/image-product.repository';
import { ImageProductEntity } from '@app/entities/image-product.entity';
import { ImageProductStatus } from '@app/libs/enums/image-product-status';

@Injectable()
export class AddImageProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly storageService: StorageService,
    private readonly imageProductRepository: ImageProductRepository,
  ) {}

  async execute(request: AddImageProductRequest): Promise<void> {
    const { image, productId } = request;

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const imageUpload = await this.storageService.uploadFile(
      image.filename,
      image.buffer,
    );

    const imageProduct = new ImageProductEntity({
      productId: productId,
      image: imageUpload.path,
      status: ImageProductStatus.ACTIVE,
    });

    await this.imageProductRepository.create(imageProduct);
  }
}
