export type NewProduct = {
  name: string;
  active: boolean;
};

export type Product = {
  id: string;
  created_at: string;
} & NewProduct;

export type ProductState = {
  data: Product[];
};
