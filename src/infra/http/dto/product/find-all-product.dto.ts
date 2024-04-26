import { ProductStatus } from '@app/libs/enums/product-status';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class FindAllProductDTO {
  @IsString()
  @IsOptional()
  @IsIn([ProductStatus.ACTIVE, ProductStatus.INACTIVE])
  status: ProductStatus;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  offer: boolean;

  @IsString()
  @IsOptional()
  storeId: string;

  @IsString()
  @IsOptional()
  categorieId: string;
}
