<script setup lang="ts">
import type { SelectProps } from './select.model';

const props = defineProps<SelectProps>();
const emit = defineEmits(['on:change']);
</script>

<template>
  <div class="select">
    <slot name="trigger"></slot>

    <div
      @click="() => emit('on:change', false)"
      :class="{ 'select-content': true, open: props.open }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  width: 100%;
  display: flex;
  flex-direction: column;

  position: relative;

  .select-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid $color-border-200;
    padding: 12px;
    border-radius: 8px;
    gap: 4px;
    z-index: 20;
    max-height: 120px;
    overflow-y: auto;
    position: absolute;
    top: 50px;
    background: $color-foreground-200;

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.14s;

    &.open {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>
