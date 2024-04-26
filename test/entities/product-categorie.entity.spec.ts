import { ProductCategorieEntity } from '@app/entities/product-categorie.entity';
import { ProductCategorieStatus } from '@app/libs/enums/product-categorie-status';
import { faker } from '@faker-js/faker';

describe('product categorie entity', () => {
  it('should be able to create a new product categorie', () => {
    const productCategorie = new ProductCategorieEntity({
      productId: faker.string.uuid(),
      categorieId: faker.string.uuid(),
      status: ProductCategorieStatus.ACTIVE,
    });

    expect(productCategorie).toBeTruthy();
  });
});
