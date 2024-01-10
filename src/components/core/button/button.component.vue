<script setup lang="ts">
import type { ButtonProps } from './button.model';

const props = defineProps<ButtonProps>();

const styles = {
  block: props.block,
  disabled: props.disabled,
};
</script>

<template>
  <button :class="styles">
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  background: $color-primary-solid-100;
  border: 2px solid transparent;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  letter-spacing: 0.03rem;
  color: contrast-color(
    $color-primary-solid-100,
    $color-black-100,
    $color-white-100
  );
  cursor: pointer;
  transition:
    transform 0.14s,
    border 0.3s;
  height: 40px;

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
    transform: scale(1.05);
  }
}
</style>
