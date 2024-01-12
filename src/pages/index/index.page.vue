<script setup lang="ts">
import { computed, ref } from 'vue';
import { PlusIcon } from 'lucide-vue-next';
import { createId } from '@paralleldrive/cuid2';

import AddProductToClient from '@/components/forms/add_product_to_client/add_product_to_client.component.vue';
import CreateClient from '@/components/forms/create_client/create_client.component.vue';
import Header from '@/components/layout/header/header.component.vue';
import Button from '@/components/core/button/button.component.vue';
import Dialog from '@/components/core/dialog/dialog.component.vue';
import CardClient from '@/components/cards/client/card_client.component.vue';

import type { Client, NewClient } from '@/store/client/client.types';
import { useClientStore } from '@/store/client/client.store';
import { useToastStore } from '@/store/toast/toast.store';
import type { Product } from '@/store/product/product.types';

const clientStore = useClientStore();
const toast = useToastStore();

const customerEditData = ref<Client | undefined>();
const customerToAddProduct = ref<Client | undefined>();
const clients = computed(() => clientStore.clients);

const isOpenDialogCreateClient = ref(false);
const isOpenDialogAddProductToClient = ref(false);

const onToggleIsOpenDialogCreateClient = (e: boolean) => {
  if (!e) customerEditData.value = undefined;

  isOpenDialogCreateClient.value = e;
};

const onRequestEditClient = (client: Client) => {
  customerEditData.value = { ...client };
  isOpenDialogCreateClient.value = true;
};

const onRequestAddProductToClient = (client: Client) => {
  onToggleIsOpenDialogAddProductToClient(true);
  customerToAddProduct.value = client;
};

const onCreateNewClient = (client: NewClient) => {
  const data: Client = {
    ...client,
    id: createId(),
    email: client.email.toLowerCase(),
    created_at: new Date().toString(),
    products: [],
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

  onToggleIsOpenDialogCreateClient(false);
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
  onToggleIsOpenDialogCreateClient(false);
};

const onAddProductToClient = (client: Client, product: Product) => {
  clientStore.addProduct(client, product);
  onToggleIsOpenDialogAddProductToClient(false);
};

const onToggleActiveClient = (client: Client) => {
  clientStore.toggleActive(client);
};

const onToggleIsOpenDialogAddProductToClient = (e: boolean) => {
  isOpenDialogAddProductToClient.value = e;
};
</script>

<template>
  <div class="index-page">
    <Header>
      <h1>Clients</h1>

      <Button
        block
        class="add-client"
        @click="() => onToggleIsOpenDialogCreateClient(true)"
      >
        <PlusIcon :size="20" :strokeWidth="1" />
        New
      </Button>
    </Header>

    <p class="not-found" v-if="clients.length == 0">No registered customers</p>

    <div class="clients">
      <CardClient
        v-for="client in clients"
        :key="client.id"
        :data="client"
        @on:add="() => onRequestAddProductToClient(client)"
        @on:edit="() => onRequestEditClient(client)"
        @update:active="() => onToggleActiveClient(client)"
      />
    </div>

    <Dialog
      :open="isOpenDialogCreateClient"
      @toggle-open="onToggleIsOpenDialogCreateClient"
    >
      <CreateClient
        :data="customerEditData"
        @on:submit="
          e => {
            customerEditData ? onUpdateClient(e) : onCreateNewClient(e);
          }
        "
        @on:close="onToggleIsOpenDialogCreateClient"
        v-if="isOpenDialogCreateClient"
      />
    </Dialog>

    <Dialog
      :open="isOpenDialogAddProductToClient"
      @toggle-open="onToggleIsOpenDialogAddProductToClient"
    >
      <AddProductToClient
        v-if="customerToAddProduct && isOpenDialogAddProductToClient"
        :client="customerToAddProduct"
        @on:submit="onAddProductToClient"
        @on:close="onToggleIsOpenDialogAddProductToClient"
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

  .not-found {
    font-size: 0.8rem;
    color: $color-black-alpha-100;
    margin: auto;
    padding: 20px;
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
