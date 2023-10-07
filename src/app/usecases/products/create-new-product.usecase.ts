import { Injectable } from "@nestjs/common";
import { ProductEntity } from "src/app/entities/product.entity";
import { ProductStatus } from "src/app/libs/enums/product-status";
import { CategorieRepository } from "src/app/repositories/categorie.repository";
import { ProductCategorieRepository } from "src/app/repositories/product-categorie.repository";
import { ProductRepository } from "src/app/repositories/product.repository";
import { CategorieNotFound } from "./errors/categorie-not-found.error";
import { ProductCategorieEntity } from "src/app/entities/product-categorie.entity";
import { ProductCategorieStatus } from "src/app/libs/enums/product-categorie-status";
import { StorageService } from "src/app/services/storage";
import { ImageProductRepository } from "src/app/repositories/image-product.repository";
import { ImageProductEntity } from "src/app/entities/image-product.entity";
import { ImageProductStatus } from "src/app/libs/enums/image-product-status";

interface CreateNewProductRequest {
  name: string;
  description: string;
  image: Express.Multer.File;
  status: ProductStatus;
  price: number;
  offer: boolean;
  storeId: string;
  categorieId: string
}

@Injectable()
export class CreateNewProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository, 
    private readonly categorieRepository: CategorieRepository, 
    private readonly productCategorieRepository: ProductCategorieRepository,
    private readonly imageProductRepository: ImageProductRepository,
    private readonly storageService: StorageService
  ) {}

  async execute(request:CreateNewProductRequest): Promise<ProductEntity> {
    const {name, description, image, status, price, offer, storeId, categorieId } = request

    //TODO: Melhoria para o futuro é fazer a verificação se a loja realmente existe

    const categorie = await this.categorieRepository.findById(categorieId)

    if(!categorie) {
      throw new CategorieNotFound();
    }

    const product = new ProductEntity(
      {
        name,
        description,
        status,
        price,
        offer,
        storeId
      }
    )

    const newProduct = await this.productRepository.create(product);

    const imageUploaded = await this.storageService.uploadFile(image.originalname, image.buffer)

    console.log(imageUploaded)

    const newProductImage = new ImageProductEntity(
      {
        productId: newProduct.product_id,
        //TODO: verificar qual é a url
        image: imageUploaded.ChecksumCRC32,
        status: ImageProductStatus.ACTIVE
      }
    )

    await this.imageProductRepository.craete(newProductImage)


    const productCategorie = new ProductCategorieEntity(
      {
        productId: newProduct.product_id,
        categorieId: categorie.category_id,
        status: ProductCategorieStatus.ACTIVE
      }
    )
    //TODO: Garantir que caso não crie o relacionamento, seja feito o rollback do produto
    await this.productCategorieRepository.create(productCategorie)

    return newProduct;
  }
}