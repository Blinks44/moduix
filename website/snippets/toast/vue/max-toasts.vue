<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-max-toasts.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16, max: 3 });
const descriptions = [
  'John liked your post',
  'Sarah commented on your photo',
  'New follower: @designpro',
  'Your post was shared 10 times',
  'Meeting reminder in 15 minutes',
];

const addFiveNotifications = () => {
  descriptions.forEach((description) => toaster.info({ title: 'Notification', description }));
};
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <Button
      @click="
        toaster.info({
          title: 'New notification',
          description: 'You have a new message in your inbox.',
        })
      "
    >
      Add notification
    </Button>
    <Button @click="addFiveNotifications">Add 5 notifications</Button>
  </div>
</template>