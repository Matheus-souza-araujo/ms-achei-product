import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateNewProductUseCase } from "src/app/usecases/products/create-new-product.usecase";
import { CreateProductDTO } from "../dto/product/create-product.dto";

@Controller('product')
export class ProductController {
  constructor(private readonly createNewProductUseCase: CreateNewProductUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() {name, description, categorieId, status, storeId, offer, price}:CreateProductDTO ,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.createNewProductUseCase.execute({name, description, categorieId, status, storeId, offer, price, image: file})
  }
}