<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';

import Navbar from '@/components/layout/navbar/navbar.component.vue';
import Button from '@/components/core/button/button.component.vue';
</script>

<template>
  <div class="index-page">
    <Navbar>
      <Button block class="add-client">
        <PlusIcon :size="20" :strokeWidth="1" />
        New
      </Button>
    </Navbar>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  width: 100%;

  header {
    display: flex;
    justify-content: flex-end;
  }

  .add-client {
    width: 100%;
    max-width: 80px;
    font-weight: 500;
  }
}
</style>
