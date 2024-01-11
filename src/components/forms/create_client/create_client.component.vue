<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/core/button/button.component.vue';
import Input from '@/components/core/input/input.component.vue';

import { getErrorMessage } from '@/utils/form';

import { schema } from './utils/schema';

const values = ref<Record<string, string>>({
  username: '',
});

const errors = ref();

const validate = (value: string, name: string) => {
  values.value[name] = value;

  const res = schema(values.value, name);

  errors.value = res.getErrors();
};
</script>

<template>
  <form @submit.prevent="() => {}" class="create_client">
    <Input
      :value="values.username"
      :message="getErrorMessage(errors, 'username')"
      @update:value="validate"
      name="username"
    />

    <button type="submit">Enviar</button>
  </form>
</template>

<style scoped lang="scss">
.create_client {
  width: 100%;
  padding: 20px;
}
</style>
