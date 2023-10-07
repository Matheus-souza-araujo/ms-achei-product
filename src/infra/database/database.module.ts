import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CategorieRepository } from "src/app/repositories/categorie.repository";
import { ImageProductRepository } from "src/app/repositories/image-product.repository";
import { ProductCategorieRepository } from "src/app/repositories/product-categorie.repository";
import { ProductRepository } from "src/app/repositories/product.repository";
import { PrismaCategorieRepository } from "./prisma/repositories/prisma-categorie.repository";
import { PrismaImageProductRepository } from "./prisma/repositories/prisma-image-product.repository";
import { PrismaProductCategorieRepository } from "./prisma/repositories/prisma-product-categorie.repository";
import { PrismaProductRepository } from "./prisma/repositories/prisma-product.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: CategorieRepository,
      useClass: PrismaCategorieRepository
    },
    {
      provide: ImageProductRepository,
      useClass: PrismaImageProductRepository
    },
    {
      provide: ProductCategorieRepository,
      useClass: PrismaProductCategorieRepository
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository
    }
  ],
  exports: [
    CategorieRepository,
    ImageProductRepository, 
    ProductCategorieRepository, 
    ProductRepository
  ]
})

export class DatabaseModule {}