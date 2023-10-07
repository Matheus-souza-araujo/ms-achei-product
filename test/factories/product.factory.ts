
import { faker } from '@faker-js/faker';
import { ProductEntity } from 'src/app/entities/product.entity';
import { ProductStatus } from 'src/app/libs/enums/product-status';


type Override = Partial<ProductEntity>

export function makeProduct(override: Override = {}) {
  return new ProductEntity(
    {
      name: faker.commerce.product.name,
      description: faker.commerce.productDescription(),
      offer: faker.datatype.boolean(),
      price: Number(faker.commerce.price()),
      status: ProductStatus.ACTIVE,
      storeId: faker.string.uuid()
    }
  )
}