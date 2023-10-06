import { faker } from "@faker-js/faker"
import { ProductCategorieEntity } from "src/app/entities/product-categorie.entity"
import { ProductCategorieStatus } from "src/app/libs/enums/product-categorie-status"

describe('product categorie entity', () => {
  it('should be able to create a new product categorie', () => {
    const productCategorie =  new ProductCategorieEntity(
      {
        productId: faker.string.uuid(),
        categorieId: faker.string.uuid(),
        status: ProductCategorieStatus.ACTIVE,
      }
    )

    expect(productCategorie).toBeTruthy()
  })
})