import { defineStore } from 'pinia';

import type { Product } from '@/store/product/product.types';

import type { Client, ClientState } from './client.types';

export const useClientStore = defineStore('client', {
  state: (): ClientState => ({
    data: [],
  }),
  getters: {
    clients(state) {
      return state.data;
    },
  },
  actions: {
    set(clients: Client[]) {
      this.data = [...clients];
    },
    add(client: Client) {
      this.data = [...this.data, client];
    },
    edit(client: Client) {
      this.data = this.data.map(e =>
        e.id == client.id ? { ...client, id: e.id } : e,
      );
    },
    toggleActive(client: Client) {
      this.data = this.data.map(e =>
        e.id == client.id ? { ...e, active: !e.active } : e,
      );
    },
    addProduct(client: Client, product: Product) {
      this.data = this.data.map(e => {
        if (e.id == client.id) {
          const alreadyInStock = (client.products || []).find(
            e => e == product.id,
          );

          if (!!alreadyInStock) return e;
          console.log(product)
          return { ...e, products: [...(e.products || []), product.id] };
        }

        return e;
      });
    },
  },
  persist: true,
});
