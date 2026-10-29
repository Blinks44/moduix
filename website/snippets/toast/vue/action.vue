<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import { ToastToaster, createToaster } from '@moduix/vue/toast';

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
  <Stack align="center" gap="3">
    <ToastToaster :toaster="toaster" />
    <Button @click="createEvent">Create event</Button>
  </Stack>
</template>