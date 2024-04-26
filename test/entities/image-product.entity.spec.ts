import { ImageProductEntity } from '@app/entities/image-product.entity';
import { ImageProductStatus } from '@app/libs/enums/image-product-status';
import { faker } from '@faker-js/faker';

describe('image product entity', () => {
  it('should be able to create a new image product', () => {
    const imageProduct = new ImageProductEntity({
      productId: faker.string.uuid(),
      image: faker.image.url(),
      status: ImageProductStatus.ACTIVE,
    });
    expect(imageProduct).toBeTruthy();
  });
});
