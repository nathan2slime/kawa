<script setup lang="ts">
import { ref } from 'vue';
import { MenuIcon } from 'lucide-vue-next';

import Drawer from '@/components/core/drawer/drawer.component.vue';
import Menu from '@/components/core/menu/menu.component.vue';

const isOpenDrawer = ref(false);

const onToggleIsOpenDrawer = (e: boolean) => {
  isOpenDrawer.value = e;
};
</script>

<template>
  <nav class="app-navbar">
    <img src="@/assets/favicon.svg" class="favicon" />

    <MenuIcon
      class="toggle-menu"
      @click="() => onToggleIsOpenDrawer(true)"
      :width="22"
      :strokeWidth="1"
    />
  </nav>

  <Drawer :open="isOpenDrawer" @on:close="onToggleIsOpenDrawer">
    <Menu @on:change="() => onToggleIsOpenDrawer(false)" />
  </Drawer>
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

  @include query(md) {
    display: none;
  }
}
</style>
