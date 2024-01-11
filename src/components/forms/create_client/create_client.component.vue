<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { Save } from 'lucide-vue-next';

import Button from '@/components/core/button/button.component.vue';
import Input from '@/components/core/input/input.component.vue';

import { getErrorMessage } from '@/utils/form';

import { schema } from './utils/schema';

const emit = defineEmits(['toggle-dialog']);

const values = ref<Record<string, string>>({
  name: '',
  document: '',
  phone: '',
  email: '',
});

const errors = ref();

const validate = (value: string, name: string) => {
  values.value[name] = value;

  const res = schema(values.value, name);

  errors.value = res.getErrors();
};

onUnmounted(() => emit('toggle-dialog', false));
</script>

<template>
  <form @submit.prevent="() => {}" class="create_client">
    <h1>New client</h1>

    <div>
      <Input
        :value="values.name"
        :message="getErrorMessage(errors, 'name')"
        label="Name"
        @update:value="validate"
        name="name"
      />

      <fieldset>
        <Input
          :value="values.document"
          :message="getErrorMessage(errors, 'document')"
          label="CPF"
          block
          maska="###.###.###-##"
          @update:value="validate"
          name="document"
        />
        <Input
          :value="values.phone"
          :message="getErrorMessage(errors, 'phone')"
          label="Phone"
          block
          maska="(##) # #####-####"
          @update:value="validate"
          name="phone"
        />
      </fieldset>

      <Input
        :value="values.email"
        :message="getErrorMessage(errors, 'email')"
        label="Email"
        @update:value="validate"
        name="email"
      />
    </div>

    <footer>
      <Button
        block
        type="submit"
        @click="emit('toggle-dialog', false)"
        color="secondary"
        >Cancelar</Button
      >
      <Button block type="submit" color="primary">
        <Save :size="22" :strokeWidth="1" />
        Save
      </Button>
    </footer>
  </form>
</template>

<style scoped lang="scss">
.create_client {
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;

  fieldset {
    border: none;
    display: flex;
    align-items: baseline;
    width: 100%;
    gap: 8px;
  }

  footer {
    width: 100%;

    display: flex;
    justify-content: end;
    align-items: center;

    gap: 8px;

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
    gap: 8px;
  }
}
</style>
