<script setup lang="ts">
import { computed, ref } from 'vue';
import { PlusIcon } from 'lucide-vue-next';
import { createId } from '@paralleldrive/cuid2';

import CreateProduct from '@/components/forms/create_product/create_product.component.vue';
import Header from '@/components/layout/header/header.component.vue';
import Button from '@/components/core/button/button.component.vue';
import Dialog from '@/components/core/dialog/dialog.component.vue';
import CardProduct from '@/components/cards/product/card_product.component.vue';

import { useToastStore } from '@/store/toast/toast.store';
import { useProductStore } from '@/store/product/product.store';
import type { Product, NewProduct } from '@/store/product/product.types';

const productStore = useProductStore();
const toast = useToastStore();

const productEditData = ref<Product | undefined>();
const products = computed(() => productStore.products);

const isOpenDialog = ref(false);

const onToggleIsOpenDialog = (e: boolean) => {
  if (!e) productEditData.value = undefined;

  isOpenDialog.value = e;
};

const onRequestEditProduct = (product: Product) => {
  productEditData.value = { ...product };
  isOpenDialog.value = true;
};

const onCreateNewClient = (product: NewProduct) => {
  const data: Product = {
    ...product,
    id: createId(),
    created_at: new Date().toString(),
  };

  productStore.add(data);

  onToggleIsOpenDialog(false);
  toast.show('New product created', 'success');
};

const onUpdateClient = (product: Product) => {
  const data: Product = {
    ...productEditData.value,
    ...product,
  };

  productStore.edit(data);
  onToggleIsOpenDialog(false);
};

const onToggleActiveProduct = (product: Product) => {
  productStore.toggleActive(product);
};
</script>

<template>
  <div class="index-page">
    <Header>
      <h1>Products</h1>

      <Button
        block
        class="add-product"
        @click="() => onToggleIsOpenDialog(true)"
      >
        <PlusIcon :size="20" :strokeWidth="1" />
        New
      </Button>
    </Header>

    <div class="products">
      <CardProduct
        v-for="client in products"
        :key="client.id"
        :data="client"
        @on:edit="() => onRequestEditProduct(client)"
        @update:active="() => onToggleActiveProduct(client)"
      />
    </div>

    <Dialog :open="isOpenDialog" @toggle-open="onToggleIsOpenDialog">
      <CreateProduct
        :data="productEditData"
        @on:submit="
          e => {
            productEditData ? onUpdateClient(e) : onCreateNewClient(e);
          }
        "
        @on:create="onToggleIsOpenDialog"
        v-if="isOpenDialog"
      />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding-top: 60px;

  @include query(md) {
    padding-top: 0px;
  }

  header {
    h1 {
      font-size: 0.95rem;
      color: $color-black-200;
    }
  }

  .add-product {
    width: 100%;
    max-width: 95px;
  }

  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 12px;
    padding: 20px;

    @include query('lg') {
      justify-content: flex-start;
    }
  }
}
</style>
