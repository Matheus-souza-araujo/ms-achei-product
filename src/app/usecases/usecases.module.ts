import { Module } from '@nestjs/common';
import { ProductUseCaseModule } from '@app/usecases/products/product-usecases.module';

@Module({
  imports: [ProductUseCaseModule],
  exports: [ProductUseCaseModule],
})
export class UseCasesModule {}
