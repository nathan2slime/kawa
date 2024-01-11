<script setup lang="ts"></script>

<template>
  <div class="dropdown-item">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dropdown-item {
  min-width: 97px;
  padding: 4px 8px;

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
}
</style>
