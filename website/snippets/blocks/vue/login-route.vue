<script setup lang="ts">
import LoginSimple from './login-simple.vue';

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  const response = await fetch('/api/sign-in', {
    method: 'POST',
    body: new FormData(event.currentTarget),
  });
  if (!response.ok) return;
  window.location.assign('/dashboard');
};
</script>

<template>
  <LoginSimple @submit="handleSubmit" />
</template>