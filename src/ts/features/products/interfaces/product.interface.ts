export interface IProduct {
  _id: string;
  name: string;
  price: string;
  type: string;
  imageUrl: string;
  suppliers: [];
  createdAt: string;
}

export interface ICreateProduct {
  name: string;
  type: string;
  price: number;
  imageUrl?: string;
}
