import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { CreateNewProductUseCase } from 'src/app/usecases/products/create-new-product.usecase';
import { DatabaseModule } from '../database/database.module';
import { ServiceModule } from '../services/service.module';
import { StorageModule } from '../services/storage/storage.module';
import { FindAllProductsByStoreIdUseCase } from 'src/app/usecases/products/find-all-products-by-store-id.usecase';

@Module({
  imports: [DatabaseModule, StorageModule],
  providers: [CreateNewProductUseCase, FindAllProductsByStoreIdUseCase],
  exports: [],
  controllers: [ProductController],
})
export class HttpModule {}
