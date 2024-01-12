<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Save } from 'lucide-vue-next';

import Button from '@/components/core/button/button.component.vue';
import Input from '@/components/core/input/input.component.vue';
import Switch from '@/components/core/switch/switch.component.vue';
import type { CreateProductProps } from './create_product.model';

import { getErrorMessage } from '@/utils/form';

import { schema } from './utils/schema';

const emit = defineEmits(['toggle-dialog', 'submit']);
const props = defineProps<CreateProductProps>();

const values = ref(
  props.data
    ? props.data
    : {
        name: '',
        active: false,
      },
);

const isValid = ref();
const errors = ref();

const validate = (value: string, name: string) => {
  (values.value as unknown as Record<string, string>)[name] = value;

  const res = schema(values.value, name);
  isValid.value = schema(values.value).isValid();

  errors.value = res.getErrors();
};

const onSubmit = () => {
  if (isValid) emit('submit', values.value);
};

onUnmounted(() => emit('toggle-dialog', false));
</script>

<template>
  <form @submit.prevent="() => {}" class="create_product">
    <h1>{{ props.data ? 'Edit product' : 'New product' }}</h1>

    <div>
      <Input
        :value="values.name"
        :message="getErrorMessage(errors, 'name')"
        complete="name"
        label="Name"
        @update:value="validate"
        name="name"
      />

      <Switch
        label="Active"
        :active="values.active"
        name="active"
        @update:active="validate"
      />
    </div>

    <footer>
      <Button
        block
        type="submit"
        @click="emit('toggle-dialog', false)"
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
.create_product {
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;

  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    width: 100%;
    gap: 8px;

    @include query('sm') {
      flex-direction: row;
    }
  }

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
