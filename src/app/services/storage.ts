export interface uploadFileResponse {
  path: string;
}
export abstract class StorageService {
  abstract uploadFile(
    fileName: string,
    file: Buffer,
  ): Promise<uploadFileResponse>;
}
