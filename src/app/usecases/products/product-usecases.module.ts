import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './create-product.usecase';
import { FindAllProductUseCase } from './find-all-product.usecase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { StorageModule } from 'src/infra/services/storage/storage.module';
import { FindByIdProductUseCase } from './find-by-id-product.usecase';

@Module({
  imports: [DatabaseModule, StorageModule],
  providers: [
    CreateProductUseCase,
    FindAllProductUseCase,
    FindByIdProductUseCase,
  ],
  exports: [
    CreateProductUseCase,
    FindAllProductUseCase,
    FindByIdProductUseCase,
  ],
})
export class ProductUseCaseModule {}
