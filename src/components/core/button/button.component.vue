<script setup lang="ts">
import type { ButtonProps } from './button.model';

const props = defineProps<ButtonProps>();
</script>

<template>
  <button
    :class="{
      block: props.block,
      disabled: props.disabled,
      [props.color || 'primary']: true,
    }"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  border: 2px solid transparent;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  letter-spacing: 0.03rem;

  cursor: pointer;
  transition:
    transform 0.14s,
    border 0.3s;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &.primary {
    background: $color-primary-solid-100;
    color: contrast-color(
      $color-primary-solid-100,
      $color-white-100,
      $color-black-100
    );
  }

  &.secondary {
    background: $color-primary-solid-200;
    color: contrast-color(
      $color-primary-solid-200,
      $color-black-100,
      $color-white-100
    );
  }

  &.block {
    width: 100%;
  }

  &.disabled {
    background: $color-disabled-100;
    pointer-events: none;
    cursor: default;
  }

  &:focus {
    border-color: $color-black-100;
    transform: scale(1.03);
  }
}
</style>
