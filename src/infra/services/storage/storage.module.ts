import { Module } from "@nestjs/common";
import { S3Service } from "./s3/s3.service";
import { StorageService } from "src/app/services/storage";

@Module({
  providers: [
    {
      provide: StorageService,
      useClass: S3Service
    }
  ],
  exports: [StorageService]
})

export class StorageModule {}