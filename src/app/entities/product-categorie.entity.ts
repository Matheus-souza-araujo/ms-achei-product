import { randomUUID } from 'crypto';
import { ProductCategorieStatus } from '../libs/enums/product-categorie-status';
import { Replace } from '../libs/helpers/replace';
import { ProductEntity } from './product.entity';
import { CategorieEntity } from './categorie.entity';

export interface IProductCategorieProps {
  productId: string;
  categorieId: string;
  status: ProductCategorieStatus;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductEntity;
  categorie?: CategorieEntity;
}

export class ProductCategorieEntity {
  private _product_categorie_id: string;
  private props: IProductCategorieProps;

  constructor(
    props: Replace<
      IProductCategorieProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    product_categorie_id?: string,
  ) {
    this._product_categorie_id = product_categorie_id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get product_categorie_id() {
    return this._product_categorie_id;
  }

  public set productId(productId: string) {
    this.props.productId = productId;
  }

  public get productId(): string {
    return this.props.productId;
  }

  public set categorieId(categorieId: string) {
    this.props.categorieId = categorieId;
  }

  public get categorieId(): string {
    return this.props.categorieId;
  }

  public set status(status: ProductCategorieStatus) {
    this.props.status = status;
  }

  public get status(): ProductCategorieStatus {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public get product(): ProductEntity {
    return this.props.product;
  }

  public get categorie(): CategorieEntity {
    return this.props.categorie;
  }
}
