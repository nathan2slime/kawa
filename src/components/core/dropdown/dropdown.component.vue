<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import type { DropdownProps } from './dropdown.model';

const emit = defineEmits(['update:open']);
const props = defineProps<DropdownProps>();

const wrapper = ref();

const onHanldeClick = (e: MouseEvent) => {
  const trigger = e.target as HTMLElement;
  const isMatchDropdown = trigger.getAttribute('app-dropdown') == props.name;

  const elements = e.composedPath() as HTMLElement[];

  const isInsideContainer = elements.find(
    (element: HTMLElement) => element == wrapper.value,
  );

  console.log(isInsideContainer);
  const positions = trigger.getBoundingClientRect();
  if (!isInsideContainer && props.open) return emit('update:open', false);
  if (isMatchDropdown) {
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
  <div ref="wrapper" :class="{ open: props.open, dropdown: true }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  width: fit-content;
  height: fit-content;
  background: $color-foreground-200;

  position: fixed;
  opacity: 0;
  transform: scale(0.9);
  z-index: 20;
  transition:
    transform 0.1s,
    opacity 0.2s;
  pointer-events: none;
  box-shadow: rgba(99, 99, 99, 0.08) 0px 2px 8px 0px;
  border-radius: 8px;

  flex-direction: column;
  padding: 8px;
  gap: 7px;

  &.open {
    transform: scale(1);
    opacity: 1;
    pointer-events: all;
  }
}
</style>
