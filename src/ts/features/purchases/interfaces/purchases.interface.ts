export interface IPurchase {
  _id: string;
  PONumber: number;
  createdAt: string;
  status: string;
  totalOrderQuantity: number;
  products: IPurchaseProduct;
}

export interface IPurchaseProduct {
  product: string;
  orderQuantity: number;
}

export interface ICreatePurchase {
  products: IPurchaseProduct[];
  warehouse: string;
}
