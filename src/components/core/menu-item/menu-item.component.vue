<script setup lang="ts">
import type { MenuItemProps } from './menu-item.model';

const props = defineProps<MenuItemProps>();
</script>
<template>
  <div :class="{ active: props.active, menuitem: true }">
    <slot />
    {{ props.title }}
  </div>
</template>

<style scoped lang="scss">
.menuitem {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 5px 8px;

  display: flex;
  justify-content: start;
  align-items: center;
  transition: background 0.14s;
  text-decoration: none;

  gap: 8px;

  &,
  svg {
    color: $color-black-100;
  }

  &:hover {
    color: contrast-color(
      $color-primary-solid-100,
      $color-white-100,
      $color-black-100
    );
    background: $color-foreground-100;
  }

  &.active {
    background: $color-primary-solid-100;

    &:hover {
      background: $color-primary-alpha-100;
    }
  }
}
</style>
