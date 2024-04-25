import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../services/storage/storage.module';
import { CreateProductUseCase } from 'src/app/usecases/products/create-product.usecase';
import { FindAllProductUseCase } from 'src/app/usecases/products/find-all-product.usecase';

@Module({
  imports: [DatabaseModule, StorageModule],
  providers: [CreateProductUseCase, FindAllProductUseCase],
  exports: [],
  controllers: [ProductController],
})
export class HttpModule {}
