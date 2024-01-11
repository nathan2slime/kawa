import { defineStore } from 'pinia';

import type { ToastState, ToastStatus } from '@/store/toast/toast.types';

export const useToastStore = defineStore('toast', {
  state: (): ToastState => ({
    open: false,
    title: '',
    status: 'success',
  }),
  getters: {},
  actions: {
    show(title: string,status: ToastStatus) {
      this.status = status;
      this.open = true;
    this.title = title;

      setTimeout(() => {
        this.open = false;
      }, 2000);
    },
  },
});
