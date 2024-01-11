<script setup lang="ts">
import { ref } from 'vue';

import type { DialogProps } from './dialog.model';

const props = defineProps<DialogProps>();

const elShadow = ref();
const emit = defineEmits(['toggle-open']);

const onToggleOpen = (e: MouseEvent) => {
  if (elShadow.value == e.target) emit('toggle-open', false);
};
</script>

<template>
  <div
    :class="{ open: props.open, 'dialog-wrapper': true }"
    @click="onToggleOpen"
    ref="elShadow"
  >
    <div class="dialog-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  right: 0px;

  background: $color-black-alpha-100;
  opacity: 0;
  transition: opacity 0.14s;
  pointer-events: none;
  z-index: 30;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  .dialog-content {
    width: 100%;
    max-width: 500px;
    border-radius: 15px;
    background: $color-foreground-200;
  }

  &.open {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
