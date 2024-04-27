import { IsNotEmpty, IsString } from 'class-validator';

export class AddCategorieProductDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  categorieId: string;
}
