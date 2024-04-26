import { ImageProductStatus } from '@app/libs/enums/image-product-status';
import { Replace } from '@app/libs/helpers/replace';
import { randomUUID } from 'crypto';

export interface IImageProductProps {
  productId: string;
  status: ImageProductStatus;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
export class ImageProductEntity {
  private _image_product_id: string;
  private props: IImageProductProps;

  constructor(
    props: Replace<IImageProductProps, { createdAt?: Date; updatedAt?: Date }>,
    image_product_id?: string,
  ) {
    this._image_product_id = image_product_id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get image_product_id() {
    return this._image_product_id;
  }

  public set productId(productId: string) {
    this.props.productId = productId;
  }

  public get productId(): string {
    return this.props.productId;
  }

  public set status(status: ImageProductStatus) {
    this.props.status = status;
  }

  public get status(): ImageProductStatus {
    return this.props.status;
  }

  public set image(image: string) {
    this.props.image = image;
  }

  public get image(): string {
    return this.props.image;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
