import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/app/repositories/product.repository';

type FindAllProductsByStoreIdRequest = {
  storeId: string;
  name?: string;
  status?: string;
  offer?: boolean;
  start_date?: Date;
  end_date?: Date;
};

@Injectable()
export class FindAllProductsByStoreIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    storeId,
    name,
    status,
    offer,
    start_date,
    end_date,
  }: FindAllProductsByStoreIdRequest) {
    return await this.productRepository.findAllProductsByStoreId({
      storeId,
      name,
      status,
      offer,
      start_date,
      end_date,
    });
  }
}
