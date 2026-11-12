<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Spinner } from '@moduix/vue/spinner';
import { ref } from 'vue';

const delay = 1800;
const labels = {
  idle: 'Save Changes',
  pending: 'Saving',
};
const pending = ref(false);

const save = () => {
  pending.value = true;
  setTimeout(() => (pending.value = false), delay);
};
</script>

<template>
  <Button :loading="pending" @click="save">
    <template v-if="pending">
      <Spinner decorative size="sm" />
      {{ labels.pending }}
    </template>
    <template v-else>{{ labels.idle }}</template>
  </Button>
</template>