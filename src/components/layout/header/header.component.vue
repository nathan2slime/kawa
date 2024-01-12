<script setup lang="ts"></script>

<template>
  <header class="app-header">
    <slot />
  </header>
</template>

<style scoped lang="scss">
.app-header {
  width: 100%;
  height: 60px;
  padding: 10px 12px;

  background: $color-white-100;
  border-bottom: 1px solid $color-border-200;
  backdrop-filter: blur(2px);
}
</style>
