import { IProduct } from '../../products';

export interface ISales {
  _id: string;
  SONumber: number;
  createdAt: string;
  status: string;
  totalOrderQuantity: number;
  products: ISalesProduct[];
}

export interface ISalesProduct {
  orderQuantity: number;
  product: IProduct;
}
