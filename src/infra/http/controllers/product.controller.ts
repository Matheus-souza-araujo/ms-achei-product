import { CreateProductUseCase } from '@app/usecases/products/create-product.usecase';
import { FindAllProductUseCase } from '@app/usecases/products/find-all-product.usecase';
import { FindByIdProductUseCase } from '@app/usecases/products/find-by-id-product.usecase';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDTO } from '@infra/http/dto/product/create-product.dto';
import { FindAllProductDTO } from '@infra/http/dto/product/find-all-product.dto';
import { ProductViewModel } from '@infra/http/view-models/product.view.model';
import { UpdateProductDTO } from '@infra/http/dto/product/update-product.dto';
import { UpdateProductUseCase } from '@app/usecases/products/update-product.usecase';
import { AddCategoryProductUseCase } from '@app/usecases/products/add-category-product.usecase';
import { AddCategorieProductDTO } from '@infra/http/dto/product/add-categorie-product.dto';
import { AddImageProductUseCase } from '@app/usecases/products/add-image-product.usecase';
import { regexSupportFiles } from '@app/libs/helpers/rejex-support.files';
import { DeleteCategoryProductUseCase } from '@app/usecases/products/delete-category-product.usecase';
import { DeleteImageProductUseCase } from '@app/usecases/products/delete-image-product.usecase';
import { DeleteProductUseCase } from '@app/usecases/products/delete-product.usecase';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly addCategoryProductUseCase: AddCategoryProductUseCase,
    private readonly addImageProductUseCase: AddImageProductUseCase,
    private readonly deleteCategoryProductUseCase: DeleteCategoryProductUseCase,
    private readonly deleteImageProductUseCase: DeleteImageProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
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
          new FileTypeValidator({
            fileType: regexSupportFiles,
          }),
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

  @Get('find-all')
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

  @Put('/:productId')
  async update(
    @Param('productId') productId: string,
    @Body()
    { name, description, status, storeId, offer, price }: UpdateProductDTO,
  ) {
    await this.updateProductUseCase.execute({
      productId,
      name,
      description,
      status,
      storeId,
      offer,
      price,
    });
  }

  @Post('add-categorie')
  async addCategoryProduct(
    @Body() { productId, categorieId }: AddCategorieProductDTO,
  ) {
    await this.addCategoryProductUseCase.execute({
      productId,
      categorieId,
    });
  }

  @Post('add-image/:productId')
  @UseInterceptors(FileInterceptor('file'))
  async addImageProduct(
    @Param('productId') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({
            fileType: regexSupportFiles,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.addImageProductUseCase.execute({ productId, image: file });
  }

  @Delete('delete-categorie/categorie/:categorieId/product/:productId')
  async deleteCategoryProduct(
    @Param('productId') productId: string,
    @Param('categorieId') categorieId: string,
  ) {
    await this.deleteCategoryProductUseCase.execute({ productId, categorieId });
  }

  @Delete('delete-image/:imageProductId')
  async deleteImageProduct(@Param('imageProductId') imageProductId: string) {
    await this.deleteImageProductUseCase.execute(imageProductId);
  }

  @Delete('/:productId')
  async deleteProduct(@Param('productId') productId: string) {
    await this.deleteProductUseCase.execute(productId);
  }
}
