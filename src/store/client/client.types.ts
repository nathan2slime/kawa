import type { Product } from '@/store/product/product.types';

export type NewClient = {
  phone: string;
  document: string;
  name: string;
  email: string;
  active: boolean;
};

export type Client = {
  id: string;
  created_at: string;
  products: string[];
} & NewClient;

export type ClientState = {
  data: Client[];
};
