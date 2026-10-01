<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-action.module.css';

const toaster = createToaster({ placement: 'bottom-end', gap: 24 });

const createEvent = () => {
  toaster.create({
    title: 'Event has been created',
    description: 'We have sent you an email with the event details.',
    type: 'info',
    action: {
      label: 'Undo',
      onClick: () => toaster.info({ description: 'Event restored to draft.' }),
    },
  });
};
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <Button @click="createEvent">Create event</Button>
  </div>
</template>