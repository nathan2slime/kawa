<script setup lang="ts">
import { computed, ref } from 'vue';
import { PlusIcon } from 'lucide-vue-next';
import { createId } from '@paralleldrive/cuid2';

import CreateClient from '@/components/forms/create_client/create_client.component.vue';
import Header from '@/components/layout/header/header.component.vue';
import Button from '@/components/core/button/button.component.vue';
import Dialog from '@/components/core/dialog/dialog.component.vue';
import CardClient from '@/components/cards/client/card_client.component.vue';

import type { Client, NewClient } from '@/store/client/client.types';
import { useClientStore } from '@/store/client/client.store';
import { useToastStore } from '@/store/toast/toast.store';

const clientStore = useClientStore();
const toast = useToastStore();

const customerEditData = ref<Client | undefined>();
const clients = computed(() => clientStore.clients);

const isOpenDialog = ref(false);

const onToggleIsOpenDialog = (e: boolean) => {
  if (!e) customerEditData.value = undefined;

  isOpenDialog.value = e;
};

const onRequestEditClient = (client: Client) => {
  customerEditData.value = { ...client };
  isOpenDialog.value = true;
};

const onCreateNewClient = (client: NewClient) => {
  const data: Client = {
    ...client,
    id: createId(),
    email: client.email.toLowerCase(),
    created_at: new Date().toString(),
    phone: client.phone.replace(/\D+/g, ''),
    document: client.document.replace(/\D+/g, ''),
  };

  const isDocumentAlreadyUsed = clients.value.find(
    e => e.document == data.document,
  );
  const isEmailAlreadyUsed = clients.value.find(e => e.email == data.email);

  if (isDocumentAlreadyUsed) return toast.show('CPF already used', 'danger');
  if (isEmailAlreadyUsed) return toast.show('Email already used', 'danger');

  clientStore.add(data);

  onToggleIsOpenDialog(false);
  toast.show('New user created', 'success');
};

const onUpdateClient = (client: Client) => {
  const data: Client = {
    ...customerEditData.value,
    ...client,
    email: client.email.toLowerCase(),
    created_at: new Date().toString(),
    phone: client.phone.replace(/\D+/g, ''),
    document: client.document.replace(/\D+/g, ''),
  };

  clientStore.edit(data);
  onToggleIsOpenDialog(false);
};

const onToggleActiveClient = (client: Client) => {
  clientStore.toggleActive(client);
};
</script>

<template>
  <div class="index-page">
    <Header>
      <h1>Clients</h1>

      <Button
        block
        class="add-client"
        @click="() => onToggleIsOpenDialog(true)"
      >
        <PlusIcon :size="20" :strokeWidth="1" />
        New
      </Button>
    </Header>

    <div class="clients">
      <CardClient
        v-for="client in clients"
        :key="client.id"
        :data="client"
        @on-edit="() => onRequestEditClient(client)"
        @update:active="() => onToggleActiveClient(client)"
      />
    </div>

    <Dialog :open="isOpenDialog" @toggle-open="onToggleIsOpenDialog">
      <CreateClient
        :data="customerEditData"
        @submit="
          e => {
            customerEditData ? onUpdateClient(e) : onCreateNewClient(e);
          }
        "
        @toggle-dialog="onToggleIsOpenDialog"
        v-if="isOpenDialog"
      />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding-top: 60px;

  @include query(md) {
    padding-top: 0px;
  }

  header {
    h1 {
      font-size: 0.95rem;
      color: $color-black-200;
    }
  }

  .add-client {
    width: 100%;
    max-width: 95px;
  }

  .clients {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 12px;
    padding: 20px;

    @include query('lg') {
      justify-content: flex-start;
    }
  }
}
</style>
