<script setup lang="ts">
import { vMaska } from 'maska';
import { computed } from 'vue';

import type { InputProps } from './input.model';

const props = defineProps<InputProps>();
const emit = defineEmits(['update:value', 'blur', 'focus']);

const model = computed({
  get() {
    return props.value;
  },
  set: (e: string) => {
    emit('update:value', e, props.name);
  },
});
</script>

<template>
  <div
    :class="{
      error: !!props.message,
      disabled: props.disabled,
      block: props.block,
    }"
  >
    <label v-if="props.label" :for="props.name">{{ label }}</label>
    <input
      v-maska
      :id="props.name"
      :name="props.name"
      :data-maska="props.maska"
      :disabled="props.disabled"
      :autocomplete="props.complete"
      :placeholder="props.placeholder"
      v-model="model"
      @focus="e => emit('focus', e)"
      @blur="e => emit('blur', e)"
    />

    <span v-if="!!props.message">{{ props.message }}</span>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    border: 1px solid $color-border-200;
    background: $color-foreground-200;
    height: 40px;
    border-radius: 10px;
    padding: 8px 13px;
    outline: none;
    transition: all 0.14s;

    &:focus {
      border-color: $color-primary-solid-100;
    }
  }

  span {
    margin-top: 5px;
    font-size: 0.65rem;
    letter-spacing: 0.03rem;
  }

  label {
    font-size: 0.7rem;
    letter-spacing: 0.03rem;
    color: $color-black-200;
    margin-bottom: 8px;
  }

  &.error {
    span {
      color: $color-danger-100;
    }

    input:focus {
      border-color: $color-danger-100;
    }
  }

  &.disabled input {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.block {
    width: 100%;
  }
}
</style>
