interface ICategory {
  id: number;
  iname: string;
  image: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  name: string;
  sku: string;
  category: ICategory;
  images: string[];
  quantity?: number
}

export interface RespProduct {
  ok: boolean;
  data: IProduct
}
