<script setup lang="ts">
import { RouterView } from 'vue-router';

import Menu from '@/components/core/menu/menu.component.vue';
import Toast from '@/components/core/toast/toast.component.vue';

</script>

<template>
  <div class="root-layout">
    <Menu />

    <Toast />

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
