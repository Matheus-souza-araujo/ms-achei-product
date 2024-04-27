import { Module } from '@nestjs/common';
import { CreateProductUseCase } from '@app/usecases/products/create-product.usecase';
import { FindAllProductUseCase } from '@app/usecases/products/find-all-product.usecase';
import { FindByIdProductUseCase } from '@app/usecases/products/find-by-id-product.usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { StorageModule } from '@infra/services/storage/storage.module';
import { UpdateProductUseCase } from '@app/usecases/products/update-product.usecase';
import { AddCategoryProductUseCase } from '@app/usecases/products/add-category-product.usecase';

@Module({
  imports: [DatabaseModule, StorageModule],
  providers: [
    CreateProductUseCase,
    FindAllProductUseCase,
    FindByIdProductUseCase,
    UpdateProductUseCase,
    AddCategoryProductUseCase,
  ],
  exports: [
    CreateProductUseCase,
    FindAllProductUseCase,
    FindByIdProductUseCase,
    UpdateProductUseCase,
    AddCategoryProductUseCase,
  ],
})
export class ProductUseCaseModule {}
