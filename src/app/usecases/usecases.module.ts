import { Module } from '@nestjs/common';
import { ProductUseCaseModule } from './products/product-usecases.module';

@Module({
  imports: [ProductUseCaseModule],
  exports: [ProductUseCaseModule],
})
export class UseCasesModule {}
