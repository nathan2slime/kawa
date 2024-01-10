<script setup lang="ts">

</script>

<template>
  <header class="app-navbar">
    <slot />
  </header>
</template>

<style scoped lang="scss">
.app-navbar {
  width: 100%;
  height: 60px;
  padding: 10px 12px;

  border-bottom: 1px solid $color-border-200;
}
</style>
