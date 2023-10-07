import { PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from 'crypto';
import { StorageService, uploadFileResponse } from "src/app/services/storage";

@Injectable()
export class S3Service implements StorageService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(fileName: string, file: Buffer): Promise<uploadFileResponse> {
    const fileId = `${randomUUID()}-${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand(
        {
          Bucket: 'achei-product',
          Key: fileId,
          Body: file,
        }
      )
    )

    return {
      path: `${process.env.AWS_BUCKET_URL}/${process.env.AWS_BUCKET}/${fileId}`,
    } 
  }
}