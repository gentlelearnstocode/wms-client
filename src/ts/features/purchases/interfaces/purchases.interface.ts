import { IProduct } from '../../products';

export interface IPurchase {
  _id: string;
  PONumber: number;
  createdAt: string;
  status: string;
  totalOrderQuantity: number;
  products: IPurchaseProduct;
}

export interface IPurchaseProduct {
  product: IProduct;
  orderQuantity: number;
}

export interface ICreatePurchase {
  products: IPurchaseProduct[];
  warehouse: string;
}
