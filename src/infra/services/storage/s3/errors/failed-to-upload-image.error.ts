import { BadRequestException } from "@nestjs/common";

export class FailedToUploadImage extends BadRequestException {
  constructor() {
    super("Fails to upload image!")
  }
}