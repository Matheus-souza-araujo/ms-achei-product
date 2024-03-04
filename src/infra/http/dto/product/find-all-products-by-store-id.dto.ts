import { Transform } from 'class-transformer';
import {
  IsBooleanString,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from 'src/app/libs/enums/product-status';

export class FindAllProductsByStoreIdDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsIn([ProductStatus.ACTIVE, ProductStatus.INACTIVE])
  status: ProductStatus;

  @IsBooleanString()
  @IsOptional()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  offer: boolean;

  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;
}
