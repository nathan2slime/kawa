<script setup lang="ts">
import { MenuIcon } from 'lucide-vue-next';
</script>

<template>
  <nav class="app-navbar">
    <img src="@/assets/favicon.svg" class="favicon" />

    <MenuIcon class="toggle-menu" :width="22" :strokeWidth="1" />
  </nav>
</template>

<style scoped lang="scss">
.app-navbar {
  width: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: $color-primary-alpha-100;

  height: 60px;
  z-index: 30;
  padding: 8px 20px;

  .favicon {
    width: 36px;
  }

  .toggle-menu {
    cursor: pointer;
  }

  @include  query(md) {
    display: none;
  }
}
</style>
