import { ImageProductRepository } from '@app/repositories/image-product.repository';
import { Injectable } from '@nestjs/common';
import { ImageNotFoundBadRequest } from './errors/image-not-found-bad-request.error';
import { StorageService } from '@app/services/storage';

@Injectable()
export class DeleteImageProductUseCase {
  constructor(
    private readonly imageProductRepository: ImageProductRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute(imageProductId: string): Promise<void> {
    const image =
      await this.imageProductRepository.findByImageProductId(imageProductId);

    if (!image) {
      throw new ImageNotFoundBadRequest();
    }

    await this.storageService.removeFile(image.image);

    await this.imageProductRepository.deleteByImageProductId(imageProductId);
  }
}
