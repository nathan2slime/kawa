<script setup lang="ts">
import { RouterView } from 'vue-router';

import Menu from '@/components/core/menu/menu.component.vue';
</script>

<template>
  <div class="root-layout">
    <Menu />

    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.root-layout {
  display: flex;

  width: 100vw;
  height: 100vh;

  overflow-y: auto;
  overflow-x: hidden;
}
</style>
