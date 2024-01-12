<script setup lang="ts">
import { ref } from 'vue';
import { format } from 'date-fns';
import { EditIcon, MoreVertical, EyeIcon, EyeOffIcon } from 'lucide-vue-next';

import Dropdown from '@/components/core/dropdown/dropdown.component.vue';
import DropdownItem from '@/components/core/dropdown-item/dropdown-item.component.vue';

import type { CardClientProps } from './card_client.model';

const { data } = defineProps<CardClientProps>();
const emit = defineEmits(['on-edit', 'update:active']);

const isOpenOption = ref(false);

const onToggleOpen = (e: boolean) => {
  isOpenOption.value = e;
};
</script>

<template>
  <div :class="{ 'card-client': true, active: data.active }">
    <h4>{{ data.name }}</h4>

    <p>{{ data.email }}</p>

    <span>{{ format(data.created_at, 'dd/MM/yyyy') }}</span>
    <Dropdown @update:open="onToggleOpen" :name="data.id" :open="isOpenOption">
      <DropdownItem
        @click="
          () => {
            onToggleOpen(false);
            emit('on-edit');
          }
        "
      >
        <EditIcon :width="18" :strokeWidth="1" />
        Edit
      </DropdownItem>

      <DropdownItem
        @click="
          () => {
            onToggleOpen(false);
            emit('update:active');
          }
        "
      >
        <component
          :is="data.active ? EyeOffIcon : EyeIcon"
          :width="18"
          :strokeWidth="1"
        />
        {{ data.active ? 'Inactive' : 'Active' }}
      </DropdownItem>
    </Dropdown>

    <div class="trigger-dropdown">
      <MoreVertical :app-dropdown="data.id" :width="23" :strokeWidth="1" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-client {
  width: 100%;
  max-width: 100%;
  border: 1px solid $color-border-200;
  border-radius: 8px;
  position: relative;
  padding: 12px;
  background: $color-inactive-100;

  @include query('sm') {
    max-width: 230px;
  }

  h4 {
    font-size: 0.95rem;
    color: $color-black-200;
  }

  p {
    font-size: 0.8rem;
    margin-top: 5px;
    color: $color-black-alpha-100;
  }

  span {
    padding: 2px 4px;
    border-radius: 5px;
    font-size: 0.7rem;
    display: block;
    margin-top: 4px;
    width: fit-content;
    color: $color-white-200;
    background: $color-primary-solid-100;
  }

  > .trigger-dropdown {
    position: absolute;

    top: 6px;
    right: 6px;

    svg {
      cursor: pointer;
      padding: 3px;
      color: $color-black-200;
    }

    &:hover svg {
      color: $color-primary-solid-100;
    }
  }

  &.active {
    opacity: 1;
    background: $color-foreground-200;
  }
}
</style>
