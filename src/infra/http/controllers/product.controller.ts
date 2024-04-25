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
import { CreateProductUseCase } from 'src/app/usecases/products/create-product.usecase';
import { CreateProductDTO } from '../dto/product/create-product.dto';
import { FindAllProductUseCase } from 'src/app/usecases/products/find-all-product.usecase';
import { FindAllProductDTO } from '../dto/product/find-all-product.dto';
import { ProductViewModel } from '../view-models/product.view-model';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
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
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const product = await this.createProductUseCase.execute({
      name,
      description,
      categorieId,
      status,
      storeId,
      offer,
      price,
      image: file,
    });

    return ProductViewModel.toHttp(product);
  }

  @Get('/find-all')
  async findAll(
    @Query() { categorieId, offer, status, storeId }: FindAllProductDTO,
  ) {
    const products = await this.findAllProductUseCase.execute({
      categorieId,
      offer,
      status,
      storeId,
    });

    return products.map(ProductViewModel.toHttp);
  }
}
