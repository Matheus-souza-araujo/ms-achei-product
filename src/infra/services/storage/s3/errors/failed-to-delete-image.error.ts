import { BadRequestException } from '@nestjs/common';

export class FailedToDeleteImage extends BadRequestException {
  constructor() {
    super('Fails to delete image!');
  }
}
