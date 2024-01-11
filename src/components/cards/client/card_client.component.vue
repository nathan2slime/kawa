<script setup lang="ts">
import { ref } from 'vue';
import { format } from 'date-fns';
import { EditIcon, MoreVertical, EyeIcon, EyeOffIcon } from 'lucide-vue-next';

import Dropdown from '@/components/core/dropdown/dropdown.component.vue';
import DropdownItem from '@/components/core/dropdown-item/dropdown-item.component.vue';

import type { CardClientProps } from './card_client.model';

const props = defineProps<CardClientProps>();

const isOpenOption = ref(false);

const onToggleOpen = (e: boolean) => {
  isOpenOption.value = e;
};

const options = [
  {
    icon: EditIcon,
    title: 'Edit',
  },
  {
    icon: props.data.active ? EyeOffIcon : EyeIcon,
    title: props.data.active ? 'Inactive' : 'Active',
  },
];
</script>

<template>
  <div class="card-client">
    <h4>{{ props.data.name }}</h4>

    <p>{{ props.data.email }}</p>

    <span>{{ format(props.data.created_at, 'dd/MM/yyyy') }}</span>

    <Dropdown
      @update:open="onToggleOpen"
      :name="props.data.id"
      :open="isOpenOption"
    >
      <DropdownItem v-for="option in options">
        <component :is="option.icon" :width="18" :strokeWidth="1" />
        {{ option.title }}
      </DropdownItem>
    </Dropdown>

    <div class="trigger-dropdown">
      <MoreVertical
        :app-dropdown="props.data.id"
        :width="23"
        :strokeWidth="1"
      />
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

  @include query('sm') {
    max-width: 250px;
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
}
</style>
