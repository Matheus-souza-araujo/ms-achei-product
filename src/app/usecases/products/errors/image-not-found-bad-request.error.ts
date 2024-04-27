import { BadRequestException } from '@nestjs/common';

export class ImageNotFoundBadRequest extends BadRequestException {
  constructor() {
    super('Image not found!');
  }
}
