import { ProductStatus } from '@app/libs/enums/product-status';

export type UpdateProductRequest = {
  productId: string;
  name?: string;
  description?: string;
  status?: ProductStatus;
  price?: number;
  offer?: boolean;
  storeId?: string;
};
