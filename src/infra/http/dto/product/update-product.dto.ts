import { ProductStatus } from '@app/libs/enums/product-status';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @IsIn([ProductStatus.ACTIVE, ProductStatus.INACTIVE])
  status: ProductStatus;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  price: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  offer: boolean;

  @IsString()
  @IsOptional()
  storeId: string;
}
