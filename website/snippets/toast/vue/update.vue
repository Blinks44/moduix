<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import { ref } from 'vue';
import styles from '@/components/examples/toast/toast-update.module.css';

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
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <Button @click="sendMessage">Send message</Button>
    <Button @click="markAsSent">Mark as sent</Button>
  </div>
</template>