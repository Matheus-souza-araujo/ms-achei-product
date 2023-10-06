import { Injectable } from "@nestjs/common";
import { ProductEntity } from "src/app/entities/product.entity";
import { ProductStatus } from "src/app/libs/enums/product-status";
import { CategorieRepository } from "src/app/repositories/categorie.repository";
import { ProductCategorieRepository } from "src/app/repositories/product-categorie.repository";
import { ProductRepository } from "src/app/repositories/product.repository";
import { CategorieNotFound } from "./errors/categorie-not-found.error";
import { ProductCategorieEntity } from "src/app/entities/product-categorie.entity";
import { ProductCategorieStatus } from "src/app/libs/enums/product-categorie-status";

interface CreateNewProductRequest {
  name: string;
  description: string;
  image: File;
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
    private readonly productCategorieRepository: ProductCategorieRepository
  ) {}

  async execute(request:CreateNewProductRequest): Promise<ProductEntity> {
    const {name, description, image, status, price, offer, storeId, categorieId } = request

    const categorie = await this.categorieRepository.findById(categorieId)

    if(!categorie) {
      throw new CategorieNotFound();
    }

    //TODO: Subir a imagem para algum lugar aqui

    const product = new ProductEntity(
      {
        name,
        description,
        image: 'url',
        status,
        price,
        offer,
        storeId
      }
    )

    const newProduct = await this.productRepository.create(product);
    const productCategorie = new ProductCategorieEntity(
      {
        productId: newProduct.product_id,
        categorieId: categorie.category_id,
        //TODO: Verificar como fazer o depara de status
        status: ProductCategorieStatus.ACTIVE
      }
    )
    //TODO: Garantir que caso não crie o relacionamento, seja feito o rollback do produto
    await this.productCategorieRepository.create(productCategorie)

    return newProduct;
  }
}