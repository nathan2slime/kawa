import { createRouter, createWebHistory } from 'vue-router';

import Index from '@/pages/index/index.page.vue';
import Products from '@/pages/products/products.page.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
    },
  ],
});

export default router;
