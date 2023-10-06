import { randomUUID } from "crypto";
import { ProductStatus } from "../libs/enums/product-status";
import { Replace } from "../libs/replace";


export interface IProductProps {
  name: string;
  description: string;
  image: string;
  status: ProductStatus;
  price: number;
  offer: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductEntity {
  private _product_id: string;
  private props: IProductProps;

  constructor(
    props: Replace<IProductProps, { createdAt?: Date, updatedAt?: Date }>,
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

  public set image(image: string) {
    this.props.image = image;
  }

  public get image(): string {
    return this.props.image;
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

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

}