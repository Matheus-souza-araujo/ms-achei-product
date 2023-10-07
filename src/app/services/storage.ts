import { PutObjectCommandOutput } from "@aws-sdk/client-s3";

export abstract class StorageService {
  abstract uploadFile(fileName: string, file: Buffer): Promise<PutObjectCommandOutput>
}