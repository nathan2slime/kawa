<script setup lang="ts">
import { ref } from 'vue';

import type { DrawerProps } from './drawer.model';

const props = defineProps<DrawerProps>();
const emit = defineEmits(['on:close']);

const wrapper = ref();

const onClose = (e: MouseEvent) => {
  wrapper.value == e.target && emit('on:close');
};
</script>

<template>
  <div
    ref="wrapper"
    @click="onClose"
    :class="{ drawer: true, open: props.open }"
  >
    <div class="drawer-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  width: 100vw;
  height: 100vh;

  z-index: 35;

  position: fixed;
  top: 0;
  right: 0;

  background: $color-black-alpha-100;

  display: flex;
  justify-content: start;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;

  .drawer-content {
    width: 100%;
    max-width: 180px;
    height: 100%;
    transform: translateX(-400px);

    background: $color-foreground-200;
  }

  &.open {
    pointer-events: all;
    opacity: 1;

    .drawer-content {
      transform: translateX(0);
    }
  }
}
</style>
