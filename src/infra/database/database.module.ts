import { Module } from '@nestjs/common';
import { PrismaCategorieRepository } from '@infra/database/prisma/repositories/prisma-categorie.repository';
import { PrismaImageProductRepository } from '@infra/database/prisma/repositories/prisma-image-product.repository';
import { PrismaProductCategorieRepository } from '@infra/database/prisma/repositories/prisma-product-categorie.repository';
import { PrismaProductRepository } from '@infra/database/prisma/repositories/prisma-product.repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { CategorieRepository } from '@app/repositories/categorie.repository';
import { ImageProductRepository } from '@app/repositories/image-product.repository';
import { ProductCategorieRepository } from '@app/repositories/product-categorie.repository';
import { ProductRepository } from '@app/repositories/product.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategorieRepository,
      useClass: PrismaCategorieRepository,
    },
    {
      provide: ImageProductRepository,
      useClass: PrismaImageProductRepository,
    },
    {
      provide: ProductCategorieRepository,
      useClass: PrismaProductCategorieRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [
    CategorieRepository,
    ImageProductRepository,
    ProductCategorieRepository,
    ProductRepository,
  ],
})
export class DatabaseModule {}
