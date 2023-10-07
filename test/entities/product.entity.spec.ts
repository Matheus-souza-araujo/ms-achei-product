
import { ProductEntity } from "src/app/entities/product.entity"
import { ProductStatus } from "src/app/libs/enums/product-status"
import { faker } from "@faker-js/faker"

describe('product entity', () => {
  it('should be able to create a new product', () => {
    const product = new ProductEntity(
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        offer: faker.datatype.boolean(),
        price: Number(faker.commerce.price()),
        status: ProductStatus.ACTIVE,
        storeId: faker.string.uuid()
      }
    )

    expect(product).toBeTruthy()
  })
})