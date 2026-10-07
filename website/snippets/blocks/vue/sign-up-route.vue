<script setup lang="ts">
import SignUp from './sign-up.vue';

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  const form = event.currentTarget;
  const data = new FormData(form);
  if (data.get('password') !== data.get('confirm-password')) {
    const confirmation = form.elements.namedItem('confirm-password');
    if (confirmation instanceof HTMLInputElement) {
      confirmation.setCustomValidity('Passwords do not match.');
      confirmation.reportValidity();
      confirmation.setCustomValidity('');
    }
    return;
  }
  await fetch('/api/sign-up', { method: 'POST', body: data });
};
</script>

<template>
  <SignUp @submit="handleSubmit" />
</template>