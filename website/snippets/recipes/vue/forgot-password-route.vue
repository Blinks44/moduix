<script setup lang="ts">
import ForgotPassword from './forgot-password.vue';

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  await fetch('/api/forgot-password', {
    method: 'POST',
    body: new FormData(event.currentTarget),
  });
};
</script>

<template>
  <ForgotPassword @submit="handleSubmit" />
</template>