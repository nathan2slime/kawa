<script setup lang="ts">
import { User, LayoutDashboard } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

import MenuItem from '@/components/core/menu-item/menu-item.component.vue';

const route = useRoute();

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
  <div class="app-menu">
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
</template>

<style scoped lang="scss">
.app-menu {
  width: 100%;
  height: 100%;
  max-width: 180px;
  border-right: 1px solid $color-border-200;

  padding: 14px 12px;
  display: flex;
  flex-direction: column;

  gap: 6px;
}
</style>
