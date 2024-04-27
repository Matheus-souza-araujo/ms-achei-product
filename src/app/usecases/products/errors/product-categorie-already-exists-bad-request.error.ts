import { BadRequestException } from '@nestjs/common';

export class ProductCategorieAlreadyExistsBadRequest extends BadRequestException {
  constructor() {
    super('Product Categorie already exists!');
  }
}
