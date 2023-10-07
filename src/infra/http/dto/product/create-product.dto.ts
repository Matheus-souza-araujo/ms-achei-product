import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";
import { ProductStatus } from "src/app/libs/enums/product-status";

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
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  offer: boolean;

  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  categorieId: string  
}