export type FindAllProductsByStoreType = {
  storeId: string;
  name?: string;
  status?: string;
  offer?: boolean;
  start_date?: Date;
  end_date?: Date;
};
