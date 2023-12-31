import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'products',
      protoPath: join(__dirname, 'infra/grpc/protos/products.proto'),
      url: 'localhost:5001',
    },
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  await app.startAllMicroservices();
  await app.listen(3001);


}
bootstrap();