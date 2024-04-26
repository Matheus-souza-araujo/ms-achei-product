import { Module } from '@nestjs/common';
import { ProductController } from '@infra/http/controllers/product.controller';
import { UseCasesModule } from '@app/usecases/usecases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [ProductController],
})
export class HttpModule {}
