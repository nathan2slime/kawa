<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import type { DropdownProps } from './dropdown.model';

const emit = defineEmits(['update:open']);
const props = defineProps<DropdownProps>();

const wrapper = ref();

const onHanldeClick = (e: MouseEvent) => {
  const trigger = e.target as HTMLElement;
  const isMatchDropdown = trigger.getAttribute('app-dropdown') == props.name;

  if (isMatchDropdown) {
    const elements = e.composedPath() as HTMLElement[];

    const isInsideContainer = elements.find(
      (element: HTMLElement) => element == wrapper.value,
    );

    const positions = trigger.getBoundingClientRect();

    if (!!isInsideContainer) return emit('update:open', false);

    getValidPosition(positions, wrapper.value);
    emit('update:open', true);
  }
};

const getValidPosition = (rect: DOMRect, target: HTMLElement) => {
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;

  const isValidLeft = clientWidth - rect.right < target.scrollWidth;
  const isValidTop = clientHeight - rect.top < target.scrollHeight;

  if (isValidTop) {
    target.style.bottom = clientHeight - rect.top + 'px';
  } else {
    target.style.top = rect.top + 'px';
  }

  if (isValidLeft) {
    target.style.right = clientWidth - rect.left + 'px';
  } else {
    target.style.left = rect.left + 'px';
  }
};

onMounted(() => {
  window.addEventListener('click', onHanldeClick);
});

onUnmounted(() => {
  window.removeEventListener('click', onHanldeClick);
});
</script>

<template>
  <div ref="wrapper" :class="{ open: props.open, dropdown: true }"></div>
</template>

<style scoped lang="scss">
.dropdown {
  width: fit-content;
  height: fit-content;
  background: $color-white-100;

  position: fixed;
  opacity: 0;
  transform: scale(0.9);
  transition: transform 0.1s, opacity 0.2s;

  &.open {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
