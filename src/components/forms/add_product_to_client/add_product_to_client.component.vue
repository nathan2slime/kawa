<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Save } from 'lucide-vue-next';

import Button from '@/components/core/button/button.component.vue';
import Input from '@/components/core/input/input.component.vue';
import type { AddProductToClientProps } from './add_product_to_client.model';

import { getErrorMessage } from '@/utils/form';

import { schema } from './utils/schema';

const emit = defineEmits(['on:close', 'on:submit']);
const props = defineProps<AddProductToClientProps>();

const values = ref({
  client: props.client?.name,
  search: '',
});

const isValid = ref();
const errors = ref();

const validate = (value: string, name: string) => {
  (values.value as unknown as Record<string, string>)[name] = value;

  const res = schema(values.value, name);
  isValid.value = schema(values.value).isValid();

  errors.value = res.getErrors();
};

const onSubmit = () => {
  if (isValid) emit('on:submit', values.value);
};

onUnmounted(() => emit('on:close', false));
</script>

<template>
  <form @submit.prevent="() => {}" class="add_product_to_client">
    <h1>Give new product</h1>

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
      <Input
        :value="values.search"
        :message="getErrorMessage(errors, 'search')"
        complete="search"
        @update:value="validate"
        placeholder="Search by product name"
        name="search"
      />
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
        :disabled="!isValid"
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
