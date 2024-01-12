<script setup lang="ts">
import type { SwitchProps } from './switch.model';

const props = defineProps<SwitchProps>();
const emit = defineEmits(['update:active']);
</script>

<template>
  <div class="app-switch">
    <label v-if="props.label" :for="props.name">{{ props.label }}</label>

    <div
      role="switch"
      @click="() => emit('update:active', !props.active, props.name)"
      :aria-checked="props.active"
      :class="{ active: props.active, switch: true }"
    >
      <input type="checkbox" :id="props.name" />
      <div />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-switch {
  label {
    font-size: 0.7rem;
    letter-spacing: 0.03rem;
    color: $color-black-200;
    display: block;
    margin-bottom: 8px;
  }
}

.switch {
  width: 50px;
  height: 30px;
  position: relative;
  background: $color-primary-solid-200;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.1s;

  div {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    left: 5px;

    border-radius: 100%;
    transition: all 0.15s;
    background: $color-white-200;
  }

  input {
    display: none;
  }

  &.active {
    background: $color-primary-solid-100;

    div {
      left: 25px;
    }
  }
}
</style>
