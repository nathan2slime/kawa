<script setup lang="ts">
import { vMaska } from 'maska';

import type { InputProps } from './input.model';
import { computed } from 'vue';

const props = defineProps<InputProps>();
const emit = defineEmits(['update:value']);

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
  <div :class="{error: !!props.message}">
    <input v-maska :name="props.name" :data-maska="props.maska" v-model="model" />

    <span v-if="!!props.message">{{props.message}}</span>
  </div>
</template>

<style scoped lang="scss">
div {
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

  }

  &.error {
    span {
      color: red;
    }
  }
}
</style>
