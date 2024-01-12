<script setup lang="ts">
import { User, LayoutDashboard } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

import MenuItem from '@/components/core/menu-item/menu-item.component.vue';

const route = useRoute();
const emit = defineEmits(['on:change']);

const items = ref([
  {
    title: 'Clients',
    child: User,
    path: '/',
    active: false,
  },
  {
    title: 'Products',
    child: LayoutDashboard,
    path: '/products',
    active: false,
  },
]);

const onChangeActiveRoute = (path: string) => {
  emit('on:change');

  items.value = items.value.map(e => ({
    ...e,
    active: e.path == path,
  }));
};

onMounted(() => {
  onChangeActiveRoute(route.path);
});
</script>

<template>
  <aside class="app-menu">
    <img src="@/assets/favicon.svg" class="favicon" />

    <div class="menu-items">
      <router-link
        @click="() => onChangeActiveRoute(i.path)"
        :to="i.path"
        v-for="i in items"
        :key="i.path"
      >
        <MenuItem v-bind:active="i.active" :title="i.title">
          <component :is="i.child" :size="23" :strokeWidth="1" />
        </MenuItem>
      </router-link>
    </div>

    <div />
  </aside>
</template>

<style scoped lang="scss">
.app-menu {
  width: 100%;
  height: 100%;
  max-width: 180px;
  border-right: 1px solid $color-border-200;

  padding: 14px 12px;

  justify-content: space-between;

  &,
  .menu-items {
    display: flex;
    flex-direction: column;
  }

  .favicon {
    width: 50px;
  }

  .menu-items {
    gap: 6px;
  }
}
</style>
