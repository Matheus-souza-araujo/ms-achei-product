import { ProductStatus } from '@app/libs/enums/product-status';

export type CreateNewProductRequest = {
  name: string;
  description: string;
  image: Express.Multer.File;
  status: ProductStatus;
  price: number;
  offer: boolean;
  storeId: string;
  categorieId: string;
};
