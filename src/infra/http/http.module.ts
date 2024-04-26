import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { UseCasesModule } from 'src/app/usecases/usecases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [ProductController],
})
export class HttpModule {}
