<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import { ref } from 'vue';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
const toastId = ref<string>();

const sendMessage = () => {
  toastId.value = toaster.create({
    title: 'Sending message...',
    description: 'Please wait while we deliver your message.',
    type: 'info',
  });
};

const markAsSent = () => {
  const id = toastId.value;
  if (!id) return;

  toaster.update(id, {
    title: 'Message sent',
    description: 'Your message has been delivered successfully.',
    type: 'success',
  });
};
</script>

<template>
  <Stack align="center" gap="3">
    <ToastToaster :toaster="toaster" />
    <Button @click="sendMessage">Send message</Button>
    <Button @click="markAsSent">Mark as sent</Button>
  </Stack>
</template>