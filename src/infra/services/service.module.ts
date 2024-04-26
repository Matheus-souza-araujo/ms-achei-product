import { Module } from '@nestjs/common';
import { StorageModule } from '@infra/services/storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [],
  exports: [],
})
export class ServiceModule {}
