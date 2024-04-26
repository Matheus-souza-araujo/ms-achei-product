import { ProductStatus } from '@app/libs/enums/product-status';
import { randomUUID } from 'crypto';
import { ProductCategorieEntity } from '@app/entities/product-categorie.entity';
import { ImageProductEntity } from '@app/entities//image-product.entity';
import { Replace } from '@app/libs/helpers/replace';

export interface IProductProps {
  name: string;
  description: string;
  status: ProductStatus;
  price: number;
  offer: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  productCategorie?: Partial<ProductCategorieEntity[]>;
  imageProduct?: Partial<ImageProductEntity[]>;
}

export class ProductEntity {
  private _product_id: string;
  private props: IProductProps;

  constructor(
    props: Replace<IProductProps, { createdAt?: Date; updatedAt?: Date }>,
    product_id?: string,
  ) {
    this._product_id = product_id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get product_id() {
    return this._product_id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set status(status: ProductStatus) {
    this.props.status = status;
  }

  public get status(): ProductStatus {
    return this.props.status;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  public set offer(offer: boolean) {
    this.props.offer = offer;
  }

  public get offer(): boolean {
    return this.props.offer;
  }

  public set storeId(storeId: string) {
    this.props.storeId = storeId;
  }

  public get storeId(): string {
    return this.props.storeId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public updated() {
    this.props.updatedAt = new Date();
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public get productCategorie(): ProductCategorieEntity[] {
    return this.props.productCategorie;
  }

  public get imageProduct(): ImageProductEntity[] {
    return this.props.imageProduct;
  }
}
