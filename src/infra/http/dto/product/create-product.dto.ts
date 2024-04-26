import { ProductStatus } from '@app/libs/enums/product-status';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([ProductStatus.ACTIVE, ProductStatus.INACTIVE])
  status: ProductStatus;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  offer: boolean;

  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  categorieId: string;
}
