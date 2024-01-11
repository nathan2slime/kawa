<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from 'lucide-vue-next';
import { createId } from '@paralleldrive/cuid2';

import CreateClient from '@/components/forms/create_client/create_client.component.vue';

import Navbar from '@/components/layout/navbar/navbar.component.vue';
import Dropdown from '@/components/core/dropdown/dropdown.component.vue';
import Button from '@/components/core/button/button.component.vue';
import Dialog from '@/components/core/dialog/dialog.component.vue';
import CardClient from '@/components/cards/client/card_client.component.vue';

import type { Client, NewClient } from '@/store/client/client.types';
import { useClientStore } from '@/store/client/client.store';
import { useToastStore } from '@/store/toast/toast.store';

const clientStore = useClientStore();
const toast = useToastStore();
const clients = clientStore.clients;

const isOpenDialog = ref(false);

const onToggleIsOpenDialog = (e: boolean) => (isOpenDialog.value = e);

const onCreateNewClient = (client: NewClient) => {
  const data: Client = {
    ...client,
    id: createId(),
    email: client.email.toLowerCase(),
    created_at: new Date().toString(),
    phone: client.phone.replace(/\D+/g, ''),
    document: client.document.replace(/\D+/g, ''),
  };

  const isDocumentAlreadyUsed = clients.find(e => e.document == data.document);
  const isEmailAlreadyUsed = clients.find(e => e.email == data.email);

  if (isDocumentAlreadyUsed) return toast.show('CPF already used', 'danger');
  if (isEmailAlreadyUsed) return toast.show('Email already used', 'danger');

  clientStore.add(data);

  onToggleIsOpenDialog(false);
  toast.show('New user created', 'success');
};
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

    <Dropdown open name="dropdown" />

    <div>
      <CardClient v-for="client in clients" :key="client.id" :data="client" />
    </div>
    <button app-dropdown="dropdown">KKK</button>
    <Dialog :open="isOpenDialog" @toggle-open="onToggleIsOpenDialog">
      <CreateClient
        @submit="onCreateNewClient"
        @toggle-dialog="onToggleIsOpenDialog"
        v-if="isOpenDialog"
      />
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
