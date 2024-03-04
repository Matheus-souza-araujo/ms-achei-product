import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNewProductUseCase } from 'src/app/usecases/products/create-new-product.usecase';
import { CreateProductDTO } from '../dto/product/create-product.dto';
import { FindAllProductsByStoreIdDTO } from '../dto/product/find-all-products-by-store-id.dto';
import { FindAllProductsByStoreIdUseCase } from 'src/app/usecases/products/find-all-products-by-store-id.usecase';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createNewProductUseCase: CreateNewProductUseCase,
    private readonly findAllProductsByStoreIdUseCase: FindAllProductsByStoreIdUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body()
    {
      name,
      description,
      categorieId,
      status,
      storeId,
      offer,
      price,
    }: CreateProductDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.createNewProductUseCase.execute({
      name,
      description,
      categorieId,
      status,
      storeId,
      offer,
      price,
      image: file,
    });
  }

  @Get('find-all/storeId/:storeId')
  async findAllProductsByStoreId(
    @Param('storeId') storeId: string,
    @Query()
    { name, offer, status, start_date, end_date }: FindAllProductsByStoreIdDTO,
  ) {
    return await this.findAllProductsByStoreIdUseCase.execute({
      storeId,
      name,
      offer,
      status,
      start_date,
      end_date,
    });
  }
}
