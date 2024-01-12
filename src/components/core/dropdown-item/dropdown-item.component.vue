<script setup lang="ts">
import type { DropdownItemProps } from './dropdown-item.model';

const props = defineProps<DropdownItemProps>();
</script>

<template>
  <div :class="{ 'dropdown-item': true, [props.size || 'small']: true }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dropdown-item {
  min-width: 127px;
  padding: 4px 8px;
  height: 30px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.7rem;
  gap: 6px;
  background: $color-foreground-200;
  transition: background 0.15s;

  &:hover {
    background: $color-primary-solid-100;
  }

  &.medium {
    height: 40px;
  }
}
</style>
