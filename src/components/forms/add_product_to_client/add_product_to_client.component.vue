<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { Save } from 'lucide-vue-next';

import DropdownItem from '@/components/core/dropdown-item/dropdown-item.component.vue';
import Button from '@/components/core/button/button.component.vue';
import Input from '@/components/core/input/input.component.vue';
import Select from '@/components/core/select/select.component.vue';

import { useClientStore } from '@/store/client/client.store';
import { useProductStore } from '@/store/product/product.store';

import { getErrorMessage } from '@/utils/form';

import type { AddProductToClientProps } from './add_product_to_client.model';

const emit = defineEmits(['on:close', 'on:submit']);
import { schema } from './utils/schema';
import type { Product } from '@/store/product/product.types';

const props = defineProps<AddProductToClientProps>();
const productStore = useProductStore();
const clientStore = useClientStore();

const values = ref({
  client: props.client.name,
  search: '',
});

const isOpenSearch = ref(false);
const isValid = ref();
const errors = ref();

const currentProduct = ref<Product | null>();

const products = computed(() => {
  if (currentProduct.value && currentProduct.value.name === values.value.search)
    return;

  const clientProducts = props.client.products || [];
  const productsNoIncluded = productStore.products.filter(
    e => !clientProducts.includes(e.id),
  );

  const results = productsNoIncluded.filter(e => {
    return e.name.toLowerCase().includes(values.value.search.toLowerCase());
  });

  if (results.length > 0) {
    isOpenSearch.value = true;
  }

  currentProduct.value = undefined;

  return results;
});

const validate = (value: string, name: string) => {
  (values.value as unknown as Record<string, string>)[name] = value;

  const res = schema(values.value, name);
  isValid.value = schema(values.value).isValid();

  errors.value = res.getErrors();
};

const onSubmit = () => {
  if (isValid) emit('on:submit', props.client, currentProduct.value);
};

const onToggleIsOpenSearch = (e: boolean) => {
  isOpenSearch.value = e;
};

const onSelectProduct = (product: Product) => {
  currentProduct.value = product;

  values.value.search = product.name;
};

onUnmounted(() => emit('on:close', false));
</script>

<template>
  <form @submit.prevent="() => {}" class="add_product_to_client">
    <h1>Add product</h1>

    <div>
      <Input
        v-if="!!values.client"
        :value="values.client"
        @update:value="validate"
        complete="name"
        disabled
        label="Client"
        name="client"
      />

      <Select :open="isOpenSearch" @on:change="onToggleIsOpenSearch">
        <template #trigger>
          <Input
            :value="values.search"
            complete="search"
            @update:value="validate"
            placeholder="Search by product name"
            name="search"
          />
        </template>

        <template #content>
          <DropdownItem
            size="medium"
            v-for="product in products"
            :key="product.id"
            @click="() => onSelectProduct(product)"
          >
            {{ product.name }}
          </DropdownItem>
        </template>
      </Select>
    </div>

    <footer>
      <Button
        block
        type="submit"
        @click="emit('on:close', false)"
        color="secondary"
      >
        Cancelar
      </Button>
      <Button
        block
        :disabled="!currentProduct"
        @click="onSubmit"
        type="submit"
        color="primary"
      >
        <Save :size="22" :strokeWidth="1" />
        Save
      </Button>
    </footer>
  </form>
</template>

<style scoped lang="scss">
.add_product_to_client {
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;

  footer {
    width: 100%;

    display: flex;
    justify-content: end;
    align-items: center;

    gap: 10px;

    button {
      max-width: 120px;
    }
  }

  h1 {
    font-size: 1.087rem;
    font-weight: 600;
    letter-spacing: 0.01rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
