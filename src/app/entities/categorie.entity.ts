import { CategorieStatus } from '@app/libs/enums/categorie-status';
import { Replace } from '@app/libs/helpers/replace';
import { randomUUID } from 'crypto';

export interface ICategorieProps {
  name: string;
  description: string;
  status: CategorieStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class CategorieEntity {
  private _category_id: string;
  private props: ICategorieProps;

  constructor(
    props: Replace<ICategorieProps, { createdAt?: Date; updatedAt?: Date }>,
    category_id?: string,
  ) {
    this._category_id = category_id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get category_id() {
    return this._category_id;
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

  public set status(status: CategorieStatus) {
    this.props.status = status;
  }

  public get status(): CategorieStatus {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
