<script setup lang="ts">
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-vue-next';

import { useToastStore } from '@/store/toast/toast.store';

const toast = useToastStore();

const icon = {
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle2,
};
</script>

<template>
  <div :class="{ toast: true, open: toast.open, [toast.status]: true }">
    <component :is="icon[toast.status]" :width="22" :strokeWidth="1" />

    {{ toast.title }}
  </div>
</template>

<style scoped lang="scss">
.toast {
  position: fixed;
  right: 50%;
  transform: translateX(50%);
  z-index: 30;

  width: 100%;
  border: 1px solid transparent;
  max-width: fit-content;
  padding: 8px;
  padding-right: 20px;
  padding-left: 12px;

  height: 40px;
  pointer-events: none;
  opacity: 0;
  top: 0;
  border-radius: 10px;
  font-size: 0.76rem;
  font-weight: 500;
  transition:
    opacity 0.2s,
    top 0.3s;

  background: $color-white-200;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  &.open {
    opacity: 1;
    pointer-events: all;
    top: 30px;
  }

  &.success {
    border-color: $color-success-100;
    color: $color-success-100;
  }

  &.warning {
    border-color: $color-warning-100;
    color: $color-warning-100;
  }

  &.danger {
    border-color: $color-danger-100;
    color: $color-danger-100;
  }
}
</style>
