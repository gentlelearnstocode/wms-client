export interface IProduct {
  _id: string;
  name: string;
  price: string;
  type: string;
  imageUrl: string;
  suppliers: [];
}

export interface ICreateProduct {
  name: string;
  type: string;
  price: number;
  imageUrl: string;
}
