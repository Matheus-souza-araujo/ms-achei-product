import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { FailedToUploadImage } from '@infra/services/storage/s3/errors/failed-to-upload-image.error';
import { StorageService, uploadFileResponse } from '@app/services/storage';

@Injectable()
export class S3Service implements StorageService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(
    fileName: string,
    file: Buffer,
  ): Promise<uploadFileResponse> {
    const fileId = `${randomUUID()}-${fileName}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: fileId,
          Body: file,
        }),
      );
    } catch (error) {
      Logger.error('S3 Service error:', error);
      throw new FailedToUploadImage();
    }

    return {
      path: `${process.env.AWS_BUCKET_URL}/${fileId}`,
    };
  }
}
