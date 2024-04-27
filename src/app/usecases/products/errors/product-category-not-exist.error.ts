import { BadRequestException } from '@nestjs/common';

export class ProductCategoryNotExist extends BadRequestException {
  constructor() {
    super('There is no relationship between this category and product');
  }
}
