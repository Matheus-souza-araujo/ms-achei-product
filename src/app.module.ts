import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { GrpcModule } from './infra/grpc/grpc.module';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from './infra/services/service.module';

@Module({
  imports: [HttpModule, GrpcModule, DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
