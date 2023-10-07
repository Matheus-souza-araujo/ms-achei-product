import { NotFoundException } from "@nestjs/common";

export class CategorieNotFound extends NotFoundException {
  constructor() {
    super("Category not found!")
  }
}