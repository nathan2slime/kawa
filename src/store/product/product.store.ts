import { defineStore } from 'pinia';

import type { Product, ProductState } from './product.types';

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    data: [],
  }),
  getters: {
    products(state) {
      return state.data;
    },
  },
  actions: {
    set(products: Product[]) {
      this.data = [...products];
    },
    add(product: Product) {
      this.data = [...this.data, product];
    },
    edit(product: Product) {
      this.data = this.data.map(e =>
        e.id == product.id ? { ...product, id: e.id } : e,
      );
    },
    toggleActive(product: Product) {
      this.data = this.data.map(e =>
        e.id == product.id ? { ...e, active: !e.active } : e,
      );
    },
  },
  persist: true,
});
