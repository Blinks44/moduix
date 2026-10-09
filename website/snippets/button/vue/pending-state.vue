<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
    {{ pending ? labels.pending : labels.idle }}
  </Button>
</template>