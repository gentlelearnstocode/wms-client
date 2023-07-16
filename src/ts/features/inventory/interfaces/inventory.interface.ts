import { IProduct } from '../../products';

export interface IInventory {
  _id: string;
  productId: string;
  stockQuantity: number;
  incomingQuantity: number;
  outgoingQuantity: number;
  products: IProduct[];
}

export interface ICreateInventory {
  productId: string;
  stockQuantity: number;
}
