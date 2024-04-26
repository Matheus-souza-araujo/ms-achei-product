import { CategorieEntity } from '@app/entities/categorie.entity';
import { CategorieStatus } from '@app/libs/enums/categorie-status';
import { faker } from '@faker-js/faker';

describe('categorie entity', () => {
  it('should be able to create a new categorie', () => {
    const categorie = new CategorieEntity({
      name: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      status: CategorieStatus.ACTIVE,
    });

    expect(categorie).toBeTruthy();
  });
});
