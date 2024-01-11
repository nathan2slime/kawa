import { defineStore } from 'pinia';

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
  },
  persist: true,
});
