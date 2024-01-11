<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from 'lucide-vue-next';

import CreateClient from '@/components/forms/create_client/create_client.component.vue';

import Navbar from '@/components/layout/navbar/navbar.component.vue';
import Button from '@/components/core/button/button.component.vue';
import Dialog from '@/components/core/dialog/dialog.component.vue';

const isOpenDialog = ref(false);

const onToggleIsOpenDialog = (e: boolean) => (isOpenDialog.value = e);
</script>

<template>
  <div class="index-page">
    <Navbar>
      <Button
        block
        class="add-client"
        @click="() => onToggleIsOpenDialog(true)"
      >
        <PlusIcon :size="20" :strokeWidth="1" />
        New
      </Button>
    </Navbar>

    <Dialog :open="isOpenDialog" @toggle-open="onToggleIsOpenDialog">
      <CreateClient />
    </Dialog>
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
    max-width: 95px;
  }
}
</style>
