<script setup lang="ts">
import type { CardClientProps } from './card_client.model';

const props = defineProps<CardClientProps>();
</script>

<template>
  <div class="card-client">
    <h4>{{ props.data.name}}</h4>
  </div>
</template>

<style scoped lang="scss">
.card-client {
  width: 100%;
  border: 1px solid $color-border-200;
  border-radius: 8px;


}
</style>
