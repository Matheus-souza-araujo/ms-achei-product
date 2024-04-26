import { CreateProductUseCase } from '@app/usecases/products/create-product.usecase';
import { FindAllProductUseCase } from '@app/usecases/products/find-all-product.usecase';
import { FindByIdProductUseCase } from '@app/usecases/products/find-by-id-product.usecase';
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
import { CreateProductDTO } from '@infra/http/dto/product/create-product.dto';
import { FindAllProductDTO } from '@infra/http/dto/product/find-all-product.dto';
import { ProductViewModel } from '@infra/http/view-models/product.view.model';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
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

  @Get('/:productId')
  async findById(@Param('productId') productId: string) {
    const product = await this.findByIdProductUseCase.execute(productId);

    return ProductViewModel.toHttp(product);
  }
}
